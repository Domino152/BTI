import { access, mkdir, unlink, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { config } from './config.js'

const root = path.resolve(config.documentStoragePath)
const extensions = new Map([
  ['application/pdf', '.pdf'],
  ['image/jpeg', '.jpg'],
  ['image/png', '.png']
])

function resolveStorageKey(storageKey) {
  if (!storageKey || path.isAbsolute(storageKey)) throw Object.assign(new Error('Invalid stored document key'), { status: 400 })
  const resolved = path.resolve(root, storageKey)
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) throw Object.assign(new Error('Invalid stored document key'), { status: 400 })
  return resolved
}

export async function initDocumentStorage() {
  await mkdir(root, { recursive: true })
  return root
}

export async function storeDocumentFile(file, ownerId) {
  const ownerFolder = String(ownerId).replace(/[^a-zA-Z0-9-]/g, '')
  const extension = extensions.get(file.mimetype)
  if (!ownerFolder || !extension) throw Object.assign(new Error('Unsupported document type'), { status: 415 })
  const storageKey = `${ownerFolder}/${randomUUID()}${extension}`
  const target = resolveStorageKey(storageKey)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, file.buffer, { flag: 'wx', mode: 0o600 })
  return { storageKey }
}

export async function storedDocumentPath(storageKey) {
  const target = resolveStorageKey(storageKey)
  await access(target)
  return target
}

export async function deleteDocumentFile(storageKey) {
  const target = resolveStorageKey(storageKey)
  try { await unlink(target) } catch (error) { if (error.code !== 'ENOENT') throw error }
}
