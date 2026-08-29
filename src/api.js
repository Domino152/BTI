const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const TOKEN_KEY = 'nta-session-token-v1'

export const sessionToken = () => localStorage.getItem(TOKEN_KEY) || ''
export const saveSessionToken = token => token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY)

async function request(path, options = {}) {
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
  documentDownloadUrl: id => `${API_BASE}/api/documents/${id}/download`
}
