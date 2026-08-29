import { randomUUID } from 'node:crypto'
import { MongoClient } from 'mongodb'
import { config } from './config.js'

let client
let db
const memory = {
  users: new Map(), sessions: new Map(), documents: new Map(), applications: new Map(), notices: new Map(), exams: new Map(), syncRuns: []
}

const clean = value => value ? { ...value, _id: undefined } : null

export async function initStore() {
  if (!config.mongoUri) {
    if (!config.allowMemoryDb) throw new Error('MONGODB_URI is required')
    return { driver: 'memory' }
  }
  client = new MongoClient(config.mongoUri, { maxPoolSize: 10, serverSelectionTimeoutMS: 10_000 })
  await client.connect()
  db = client.db(config.mongoDbName)
  await Promise.all([
    db.collection('users').createIndex({ usernameLower: 1 }, { unique: true }),
    db.collection('sessions').createIndex({ tokenHash: 1 }, { unique: true }),
    db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    db.collection('documents').createIndex({ id: 1 }, { unique: true }),
    db.collection('documents').createIndex({ ownerId: 1, createdAt: -1 }),
    db.collection('applications').createIndex({ ownerId: 1, examId: 1 }, { unique: true }),
    db.collection('notices').createIndex({ sourceUrl: 1 }, { unique: true }),
    db.collection('exams').createIndex({ slug: 1 }, { unique: true }),
    db.collection('syncRuns').createIndex({ startedAt: -1 })
  ])
  return { driver: 'mongodb' }
}

export const storeDriver = () => db ? 'mongodb' : 'memory'

export async function findUser(usernameLower) {
  if (db) return clean(await db.collection('users').findOne({ usernameLower }))
  return [...memory.users.values()].find(user => user.usernameLower === usernameLower) || null
}

export async function createUser(user) {
  const record = { id: randomUUID(), createdAt: new Date(), ...user }
  if (db) await db.collection('users').insertOne(record)
  else {
    if (await findUser(record.usernameLower)) throw Object.assign(new Error('Username already exists'), { code: 11000 })
    memory.users.set(record.id, record)
  }
  return clean(record)
}

export async function createSession(session) {
  const record = { id: randomUUID(), createdAt: new Date(), ...session }
  if (db) await db.collection('sessions').insertOne(record)
  else memory.sessions.set(record.tokenHash, record)
  return clean(record)
}

export async function findSession(tokenHash) {
  const session = db ? await db.collection('sessions').findOne({ tokenHash, expiresAt: { $gt: new Date() } }) : memory.sessions.get(tokenHash)
  if (!session || new Date(session.expiresAt) <= new Date()) return null
  return clean(session)
}

export async function deleteSession(tokenHash) {
  if (db) await db.collection('sessions').deleteOne({ tokenHash })
  else memory.sessions.delete(tokenHash)
}

export async function findUserById(id) {
  if (db) return clean(await db.collection('users').findOne({ id }))
  return memory.users.get(id) || null
}

export async function createDocument(document) {
  const record = { id: randomUUID(), createdAt: new Date(), ...document }
  if (db) await db.collection('documents').insertOne(record)
  else memory.documents.set(record.id, record)
  return clean(record)
}

export async function listDocuments(ownerId) {
  if (db) return (await db.collection('documents').find({ ownerId }).sort({ createdAt: -1 }).toArray()).map(clean)
  return [...memory.documents.values()].filter(item => item.ownerId === ownerId).sort((a, b) => b.createdAt - a.createdAt)
}

export async function findDocument(id, ownerId) {
  if (db) return clean(await db.collection('documents').findOne({ id, ownerId }))
  const item = memory.documents.get(id)
  return item?.ownerId === ownerId ? item : null
}

export async function removeDocument(id, ownerId) {
  if (db) return db.collection('documents').deleteOne({ id, ownerId })
  const item = await findDocument(id, ownerId)
  if (item) memory.documents.delete(id)
}

export async function listApplications(ownerId) {
  if (db) return (await db.collection('applications').find({ ownerId }).sort({ updatedAt: -1 }).toArray()).map(clean)
  return [...memory.applications.values()].filter(item => item.ownerId === ownerId).sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function upsertApplication(ownerId, examId, application) {
  const record = { ...application, ownerId, examId, id: application.id || `app-${examId}`, updatedAt: new Date() }
  delete record._id
  if (db) {
    await db.collection('applications').updateOne({ ownerId, examId }, { $set: record, $setOnInsert: { createdAt: new Date() } }, { upsert: true })
  } else {
    const key = `${ownerId}:${examId}`
    memory.applications.set(key, { ...memory.applications.get(key), createdAt: memory.applications.get(key)?.createdAt || new Date(), ...record })
  }
  return clean(record)
}

export async function upsertNotices(notices) {
  if (db) {
    if (!notices.length) return
    await db.collection('notices').bulkWrite(notices.map(item => ({ updateOne: { filter: { sourceUrl: item.sourceUrl }, update: { $set: item, $setOnInsert: { firstSeenAt: new Date() } }, upsert: true } })))
  } else notices.forEach(item => memory.notices.set(item.sourceUrl, { ...memory.notices.get(item.sourceUrl), ...item, firstSeenAt: memory.notices.get(item.sourceUrl)?.firstSeenAt || new Date() }))
}

export async function upsertExams(exams) {
  if (db) {
    if (!exams.length) return
    await db.collection('exams').bulkWrite(exams.map(item => ({ updateOne: { filter: { slug: item.slug }, update: { $set: item, $setOnInsert: { firstSeenAt: new Date() } }, upsert: true } })))
  } else exams.forEach(item => memory.exams.set(item.slug, { ...memory.exams.get(item.slug), ...item, firstSeenAt: memory.exams.get(item.slug)?.firstSeenAt || new Date() }))
}

export async function listNotices({ exam, limit = 40 } = {}) {
  if (db) return (await db.collection('notices').find(exam ? { exam } : {}).sort({ fetchedAt: -1 }).limit(limit).toArray()).map(clean)
  return [...memory.notices.values()].filter(item => !exam || item.exam === exam).sort((a, b) => b.fetchedAt - a.fetchedAt).slice(0, limit)
}

export async function listExams() {
  if (db) return (await db.collection('exams').find({}).sort({ name: 1 }).toArray()).map(clean)
  return [...memory.exams.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export async function recordSyncRun(run) {
  const record = { id: randomUUID(), ...run }
  if (db) await db.collection('syncRuns').insertOne(record)
  else { memory.syncRuns.unshift(record); memory.syncRuns.splice(20) }
  return record
}

export async function latestSyncRun() {
  if (db) return clean(await db.collection('syncRuns').find({}).sort({ startedAt: -1 }).limit(1).next())
  return memory.syncRuns[0] || null
}

export async function closeStore() { await client?.close() }
