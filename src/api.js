import { exams, latestNews } from './data'

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const STATIC_DEMO = import.meta.env.VITE_STATIC_DEMO === 'true' || !API_BASE
const TOKEN_KEY = 'nta-session-token-v1'
const STATIC_USERS_KEY = 'nta-static-users-v1'
const STATIC_DOCUMENTS_KEY = 'nta-static-documents-v1'
const STATIC_APPLICATIONS_KEY = 'nta-static-applications-v1'

const demoUser = { id: 'demo-student', username: 'demo-student', password: 'Demo@12345', name: 'Aarav Mehta' }

export const sessionToken = () => localStorage.getItem(TOKEN_KEY) || ''
export const saveSessionToken = token => token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY)

const readJson = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback }
}

const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value))

function staticUsers() {
  const users = readJson(STATIC_USERS_KEY, [])
  if (!users.some(user => user.username === demoUser.username)) {
    users.push(demoUser)
    writeJson(STATIC_USERS_KEY, users)
  }
  return users
}

function currentStaticUser() {
  const token = sessionToken()
  if (!token?.startsWith('static:')) return null
  const username = token.slice('static:'.length)
  return staticUsers().find(user => user.username === username) || null
}

function publicStaticUser(user) {
  return { id: user.id, username: user.username, name: user.name || user.username }
}

function staticApplicationKey(userId, examId) {
  return `${userId}:${examId}`
}

async function staticUpload(file, { purpose, examId }) {
  const user = currentStaticUser()
  if (!user) throw Object.assign(new Error('Login required'), { status: 401 })
  const documents = readJson(STATIC_DOCUMENTS_KEY, [])
  const document = {
    id: `static-doc-${crypto.randomUUID?.() || Date.now()}`,
    ownerId: user.id,
    purpose,
    examId,
    originalName: file.name,
    mimeType: file.type || 'application/octet-stream',
    bytes: file.size,
    storage: 'browser-local-demo',
    createdAt: new Date().toISOString()
  }
  documents.unshift(document)
  writeJson(STATIC_DOCUMENTS_KEY, documents)
  return { document }
}

async function staticRequest(path, options = {}) {
  const method = options.method || 'GET'
  const body = options.body && !(options.body instanceof FormData) ? JSON.parse(options.body) : null
  const user = currentStaticUser()

  if (path === '/api/auth/register' && method === 'POST') {
    const username = String(body?.username || '').trim().toLowerCase()
    const password = String(body?.password || '')
    if (username.length < 3 || password.length < 8) throw Object.assign(new Error('Enter a valid username and password'), { status: 400 })
    const users = staticUsers()
    if (users.some(item => item.username === username)) throw Object.assign(new Error('Username is already registered'), { status: 409 })
    const created = { id: `static-user-${Date.now()}`, username, password, name: username }
    users.push(created)
    writeJson(STATIC_USERS_KEY, users)
    return { token: `static:${username}`, user: publicStaticUser(created) }
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const username = String(body?.username || '').trim().toLowerCase()
    const password = String(body?.password || '')
    const found = staticUsers().find(item => item.username === username && item.password === password)
    if (!found) throw Object.assign(new Error('Invalid username or password'), { status: 401 })
    return { token: `static:${username}`, user: publicStaticUser(found) }
  }

  if (path === '/api/auth/me') {
    if (!user) throw Object.assign(new Error('Login required'), { status: 401 })
    return { user: publicStaticUser(user), expiresAt: null }
  }

  if (path === '/api/auth/logout' && method === 'POST') return null

  if (path === '/api/public/exams') {
    return { exams: exams.map(exam => ({ ...exam, verifiedOfficialSource: false })), sync: { mode: 'static-demo' } }
  }

  if (path.startsWith('/api/public/notices')) {
    return { notices: latestNews.map(item => ({ ...item, fetchedAt: item.date, exam: item.type, sourceUrl: item.sourceUrl || '#' })), sync: { mode: 'static-demo' } }
  }

  if (!user) throw Object.assign(new Error('Login required'), { status: 401 })

  if (path === '/api/documents') {
    if (method === 'GET') return { documents: readJson(STATIC_DOCUMENTS_KEY, []).filter(document => document.ownerId === user.id) }
    if (method === 'POST') return staticUpload(options.body.get('file'), { purpose: options.body.get('purpose'), examId: options.body.get('examId') })
  }

  if (path.startsWith('/api/documents/') && method === 'DELETE') {
    const id = path.split('/')[3]
    writeJson(STATIC_DOCUMENTS_KEY, readJson(STATIC_DOCUMENTS_KEY, []).filter(document => !(document.id === id && document.ownerId === user.id)))
    return null
  }

  if (path === '/api/applications') {
    const applications = Object.values(readJson(STATIC_APPLICATIONS_KEY, {})).filter(application => application.ownerId === user.id)
    return { applications }
  }

  if (path.startsWith('/api/applications/') && method === 'PUT') {
    const examId = decodeURIComponent(path.split('/').pop())
    const applications = readJson(STATIC_APPLICATIONS_KEY, {})
    const application = { ...body.application, id: `static-app-${examId}`, ownerId: user.id, candidateId: user.id, examId, updatedAt: new Date().toISOString() }
    applications[staticApplicationKey(user.id, examId)] = application
    writeJson(STATIC_APPLICATIONS_KEY, applications)
    return { application }
  }

  throw Object.assign(new Error('Static demo route not found'), { status: 404 })
}

async function request(path, options = {}) {
  if (STATIC_DEMO) return staticRequest(path, options)
  const headers = new Headers(options.headers || {})
  const token = sessionToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json')
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: 'include' })
  const payload = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) throw Object.assign(new Error(payload?.error || `Request failed (${response.status})`), { status: response.status })
  return payload
}

export const api = {
  register: (username, password) => request('/api/auth/register', { method: 'POST', body: JSON.stringify({ username, password }) }),
  login: (username, password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  me: () => request('/api/auth/me'),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  exams: () => request('/api/public/exams'),
  notices: (exam = '') => request(`/api/public/notices${exam ? `?exam=${encodeURIComponent(exam)}` : ''}`),
  documents: () => request('/api/documents'),
  applications: () => request('/api/applications'),
  saveApplication: (examId, application) => request(`/api/applications/${encodeURIComponent(examId)}`, { method: 'PUT', body: JSON.stringify({ application }) }),
  uploadDocument: (file, { purpose, examId }) => {
    const body = new FormData(); body.append('purpose', purpose); body.append('examId', examId); body.append('file', file)
    return request('/api/documents', { method: 'POST', body })
  },
  deleteDocument: id => request(`/api/documents/${id}`, { method: 'DELETE' }),
  documentDownloadUrl: id => STATIC_DEMO ? '#' : `${API_BASE}/api/documents/${id}/download`
}
