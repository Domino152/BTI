import path from 'node:path'

const isProduction = process.env.NODE_ENV === 'production'

export const config = {
  port: Number(process.env.PORT || 8787),
  isProduction,
  mongoUri: process.env.MONGODB_URI || '',
  mongoDbName: process.env.MONGODB_DB_NAME || 'nta_portal',
  allowMemoryDb: process.env.ALLOW_MEMORY_DB === 'true' || !isProduction,
  frontendOrigins: (process.env.FRONTEND_ORIGINS || 'http://127.0.0.1:5174,http://localhost:5174').split(',').map(value => value.trim()).filter(Boolean),
  sessionDays: Number(process.env.SESSION_DAYS || 7),
  documentStoragePath: process.env.DOCUMENT_STORAGE_PATH || path.resolve(process.cwd(), 'storage', 'documents'),
  ntaSyncIntervalMinutes: Math.max(30, Number(process.env.NTA_SYNC_INTERVAL_MINUTES || 360)),
  ntaSyncSecret: process.env.NTA_SYNC_SECRET || '',
  disableNtaScheduler: process.env.DISABLE_NTA_SCHEDULER === 'true',
  ntaHomepage: process.env.NTA_HOMEPAGE || 'https://www.nta.ac.in/',
  ntaContactPage: process.env.NTA_CONTACT_PAGE || 'https://www.nta.ac.in/ContactUs'
}

export function validateProductionConfig() {
  if (!config.isProduction) return
  const missing = []
  if (!config.mongoUri) missing.push('MONGODB_URI')
  if (!process.env.DOCUMENT_STORAGE_PATH) missing.push('DOCUMENT_STORAGE_PATH')
  if (!config.frontendOrigins.length) missing.push('FRONTEND_ORIGINS')
  if (missing.length) throw new Error(`Missing production configuration: ${missing.join(', ')}`)
}
