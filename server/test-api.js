import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { parseNtaHomepage } from './nta-sync.js'

const port = 8799
const origin = `http://127.0.0.1:${port}`
const testStorage = mkdtempSync(path.join(tmpdir(), 'nta-document-test-'))
const child = spawn(process.execPath, ['server/index.js'], {
  cwd: process.cwd(),
  env: { ...process.env, PORT: String(port), NODE_ENV: 'test', ALLOW_MEMORY_DB: 'true', DOCUMENT_STORAGE_PATH: testStorage, DISABLE_NTA_SCHEDULER: 'true' },
  stdio: ['ignore', 'pipe', 'pipe']
})

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { const response = await fetch(`${origin}/api/health`); if (response.ok) return response.json() } catch {}
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error('API did not start')
}

try {
  const health = await waitForServer()
  assert.equal(health.database, 'memory')
  assert.equal(health.documentStorage, 'filesystem')

  const username = `candidate_${Date.now()}`
  let response = await fetch(`${origin}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password: 'A-secure-test-password-2026' }) })
  assert.equal(response.status, 201)
  const registration = await response.json()
  assert.ok(registration.token)

  response = await fetch(`${origin}/api/auth/me`, { headers: { Authorization: `Bearer ${registration.token}` } })
  assert.equal(response.status, 200)
  assert.equal((await response.json()).user.username, username)

  const form = new FormData()
  form.append('purpose', 'certificate')
  form.append('examId', 'cuet-ug')
  form.append('file', new Blob(['%PDF-1.4 test'], { type: 'application/pdf' }), 'certificate.pdf')
  response = await fetch(`${origin}/api/documents`, { method: 'POST', headers: { Authorization: `Bearer ${registration.token}` }, body: form })
  assert.equal(response.status, 201)
  const uploaded = (await response.json()).document
  assert.equal(uploaded.storage, 'filesystem')
  assert.ok(uploaded.storageKey)

  response = await fetch(`${origin}/api/documents`, { headers: { Authorization: `Bearer ${registration.token}` } })
  assert.equal((await response.json()).documents.length, 1)

  response = await fetch(`${origin}/api/applications/cuet-ug`, { method: 'PUT', headers: { Authorization: `Bearer ${registration.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ application: { state: 'IN_PROGRESS', currentStep: 'documents', answers: { city1: 'Delhi' } } }) })
  assert.equal(response.status, 200)
  response = await fetch(`${origin}/api/applications`, { headers: { Authorization: `Bearer ${registration.token}` } })
  const applications = (await response.json()).applications
  assert.equal(applications.length, 1)
  assert.equal(applications[0].answers.city1, 'Delhi')

  response = await fetch(`${origin}/api/documents/${uploaded.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${registration.token}` } })
  assert.equal(response.status, 204)

  const parsed = parseNtaHomepage('<section><h3>Release of Admit Card for JEE (Main) 2026</h3><a href="/Download/Notice/test.pdf">Read More</a></section>')
  assert.equal(parsed.notices.length, 1)
  assert.equal(parsed.notices[0].exam, 'JEE Main')
  assert.ok(parsed.exams.length >= 6)
  console.log('API authentication, Mongo application persistence, filesystem document handling, and NTA parser tests passed.')
} finally {
  child.kill('SIGTERM')
  rmSync(testStorage, { recursive: true, force: true })
}
