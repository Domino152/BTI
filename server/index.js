import express from 'express'
import multer from 'multer'
import { config, validateProductionConfig } from './config.js'
import { closeStore, createDocument, createUser, findDocument, findUser, initStore, latestSyncRun, listApplications, listDocuments, listExams, listNotices, removeDocument, storeDriver, upsertApplication } from './store.js'
import { checkLoginRateLimit, clearLoginRateLimit, hashPassword, issueSession, normalizeUsername, requireAuth, revokeRequestSession, validateCredentials, verifyPassword } from './security.js'
import { deleteDocumentFile, initDocumentStorage, storeDocumentFile, storedDocumentPath } from './file-storage.js'
import { startNtaScheduler, syncNtaData } from './nta-sync.js'

validateProductionConfig()
await initStore()
await initDocumentStorage()

const app = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 1 } })
const allowedMimeTypes = new Set(['application/pdf', 'image/jpeg', 'image/png'])
app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use((req, res, next) => {
  const origin = req.get('origin')
  if (origin && config.frontendOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Sync-Secret')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  }
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})
app.use(express.json({ limit: '128kb' }))

const publicUser = user => ({ id: user.id, username: user.username, name: user.displayName || user.username })

app.get('/api/health', async (_req, res) => res.json({ ok: true, database: storeDriver(), documentStorage: 'filesystem', ntaSync: await latestSyncRun() }))
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const username = String(req.body?.username || '').trim(); const password = String(req.body?.password || '')
    const validation = validateCredentials(username, password)
    if (validation) return res.status(400).json({ error: validation })
    const usernameLower = normalizeUsername(username)
    if (await findUser(usernameLower)) return res.status(409).json({ error: 'Username is already registered' })
    const user = await createUser({ username, usernameLower, displayName: username, password: await hashPassword(password) })
    const session = await issueSession(user.id)
    res.status(201).json({ user: publicUser(user), token: session.token, expiresAt: session.expiresAt })
  } catch (error) { if (error.code === 11000) return res.status(409).json({ error: 'Username is already registered' }); next(error) }
})
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const username = String(req.body?.username || '').trim(); const password = String(req.body?.password || '')
    const key = `${req.ip}:${normalizeUsername(username)}`
    if (!checkLoginRateLimit(key)) return res.status(429).json({ error: 'Too many login attempts. Try again later.' })
    const user = await findUser(normalizeUsername(username))
    if (!user || !(await verifyPassword(password, user.password))) return res.status(401).json({ error: 'Invalid username or password' })
    clearLoginRateLimit(key)
    const session = await issueSession(user.id)
    res.json({ user: publicUser(user), token: session.token, expiresAt: session.expiresAt })
  } catch (error) { next(error) }
})
app.get('/api/auth/me', requireAuth, (req, res) => res.json({ user: publicUser(req.auth.user), expiresAt: req.auth.session.expiresAt }))
app.post('/api/auth/logout', async (req, res, next) => { try { await revokeRequestSession(req); res.status(204).end() } catch (error) { next(error) } })

app.get('/api/documents', requireAuth, async (req, res) => res.json({ documents: await listDocuments(req.auth.user.id) }))
app.post('/api/documents', requireAuth, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Choose a file to upload' })
    if (!allowedMimeTypes.has(req.file.mimetype)) return res.status(415).json({ error: 'Only PDF, JPG, and PNG documents are accepted' })
    const stored = await storeDocumentFile(req.file, req.auth.user.id)
    try {
      const document = await createDocument({ ownerId: req.auth.user.id, purpose: String(req.body?.purpose || 'candidate-document').slice(0, 80), examId: String(req.body?.examId || '').slice(0, 80), originalName: req.file.originalname, mimeType: req.file.mimetype, bytes: req.file.size, storage: 'filesystem', ...stored })
      res.status(201).json({ document })
    } catch (error) { await deleteDocumentFile(stored.storageKey); throw error }
  } catch (error) { next(error) }
})
app.get('/api/documents/:id/download', requireAuth, async (req, res, next) => { try { const document = await findDocument(req.params.id, req.auth.user.id); if (!document) return res.status(404).json({ error: 'Document not found' }); res.download(await storedDocumentPath(document.storageKey), document.originalName) } catch (error) { if (error.code === 'ENOENT') return res.status(404).json({ error: 'Stored file not found' }); next(error) } })
app.delete('/api/documents/:id', requireAuth, async (req, res, next) => { try { const document = await findDocument(req.params.id, req.auth.user.id); if (!document) return res.status(404).json({ error: 'Document not found' }); await deleteDocumentFile(document.storageKey); await removeDocument(document.id, req.auth.user.id); res.status(204).end() } catch (error) { next(error) } })

app.get('/api/applications', requireAuth, async (req, res) => res.json({ applications: await listApplications(req.auth.user.id) }))
app.put('/api/applications/:examId', requireAuth, async (req, res, next) => {
  try {
    const examId = String(req.params.examId || '').trim().slice(0, 80)
    if (!/^[a-z0-9-]+$/.test(examId)) return res.status(400).json({ error: 'Invalid examination identifier' })
    const input = req.body?.application
    if (!input || typeof input !== 'object' || Array.isArray(input)) return res.status(400).json({ error: 'Application data is required' })
    const allowed = ['id', 'state', 'currentStep', 'answers', 'documentMetadata', 'paymentReference', 'paymentStatus', 'submittedAt']
    const application = Object.fromEntries(allowed.filter(key => input[key] !== undefined).map(key => [key, input[key]]))
    res.json({ application: await upsertApplication(req.auth.user.id, examId, application) })
  } catch (error) { next(error) }
})

app.get('/api/public/exams', async (_req, res) => res.json({ exams: await listExams(), sync: await latestSyncRun() }))
app.get('/api/public/notices', async (req, res) => res.json({ notices: await listNotices({ exam: req.query.exam ? String(req.query.exam) : '', limit: Math.min(100, Math.max(1, Number(req.query.limit || 40))) }), sync: await latestSyncRun() }))
app.post('/api/sync/nta', async (req, res, next) => { try { if (!config.ntaSyncSecret || req.get('x-sync-secret') !== config.ntaSyncSecret) return res.status(403).json({ error: 'Sync authorization required' }); res.json({ sync: await syncNtaData() }) } catch (error) { next(error) } })

app.use((error, _req, res, _next) => {
  console.error(error)
  if (error instanceof multer.MulterError) return res.status(400).json({ error: error.code === 'LIMIT_FILE_SIZE' ? 'File exceeds the 10 MB limit' : error.message })
  res.status(error.status || 500).json({ error: config.isProduction && !error.status ? 'Internal server error' : error.message })
})

const server = app.listen(config.port, '0.0.0.0', () => console.log(`NTA API listening on ${config.port} (${storeDriver()})`))
if (!config.disableNtaScheduler) startNtaScheduler()
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { server.close(); await closeStore(); process.exit(0) })
