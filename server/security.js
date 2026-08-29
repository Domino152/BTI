import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { config } from './config.js'
import { createSession, deleteSession, findSession, findUserById } from './store.js'

const scrypt = promisify(scryptCallback)
const attempts = new Map()

export function normalizeUsername(value = '') { return value.trim().toLowerCase() }
export function validateCredentials(username, password) {
  if (!/^[a-zA-Z0-9._-]{3,40}$/.test(username || '')) return 'Username must be 3–40 characters and use letters, numbers, dots, underscores, or hyphens.'
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) return 'Password must be between 8 and 128 characters.'
  return ''
}
export async function hashPassword(password) {
  const salt = randomBytes(16)
  const derived = await scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 })
  return { algorithm: 'scrypt', salt: salt.toString('base64'), hash: Buffer.from(derived).toString('base64') }
}
export async function verifyPassword(password, stored) {
  if (!stored?.salt || !stored?.hash) return false
  const derived = Buffer.from(await scrypt(password, Buffer.from(stored.salt, 'base64'), 64, { N: 16384, r: 8, p: 1 }))
  const expected = Buffer.from(stored.hash, 'base64')
  return derived.length === expected.length && timingSafeEqual(derived, expected)
}
export const hashToken = token => createHash('sha256').update(token).digest('hex')

export function checkLoginRateLimit(key) {
  const now = Date.now(); const windowMs = 15 * 60_000; const limit = 12
  const entry = attempts.get(key) || { count: 0, resetAt: now + windowMs }
  if (entry.resetAt <= now) { entry.count = 0; entry.resetAt = now + windowMs }
  entry.count += 1; attempts.set(key, entry)
  return entry.count <= limit
}
export function clearLoginRateLimit(key) { attempts.delete(key) }

export async function issueSession(userId) {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + config.sessionDays * 86400_000)
  await createSession({ userId, tokenHash: hashToken(token), expiresAt })
  return { token, expiresAt }
}

function bearer(req) {
  const header = req.get('authorization') || ''
  if (header.startsWith('Bearer ')) return header.slice(7).trim()
  const cookie = (req.get('cookie') || '').split(';').map(value => value.trim()).find(value => value.startsWith('nta_session='))
  return cookie ? decodeURIComponent(cookie.slice('nta_session='.length)) : ''
}

export async function requireAuth(req, res, next) {
  try {
    const token = bearer(req)
    if (!token) return res.status(401).json({ error: 'Authentication required' })
    const session = await findSession(hashToken(token))
    const user = session ? await findUserById(session.userId) : null
    if (!session || !user) return res.status(401).json({ error: 'Session expired' })
    req.auth = { token, session, user }
    next()
  } catch (error) { next(error) }
}

export async function revokeRequestSession(req) {
  const token = bearer(req)
  if (token) await deleteSession(hashToken(token))
}
