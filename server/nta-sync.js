import * as cheerio from 'cheerio'
import { config } from './config.js'
import { recordSyncRun, upsertExams, upsertNotices } from './store.js'

const canonicalExams = [
  ['jee-main', 'JEE (Main)', 'Engineering', 'https://jeemain.nta.nic.in/'],
  ['neet-ug', 'NEET (UG)', 'Medical', 'https://neet.nta.nic.in/'],
  ['cuet-ug', 'CUET (UG)', 'University entrance', 'https://cuet.nta.nic.in/'],
  ['ugc-net', 'UGC-NET', 'Teaching & fellowship', 'https://ugcnet.nta.nic.in/'],
  ['csir-net', 'Joint CSIR-UGC NET', 'Research & teaching', 'https://csirnet.nta.nic.in/'],
  ['swayam', 'SWAYAM', 'MOOCs', 'https://exams.nta.nic.in/swayam/']
].map(([slug, name, domain, officialUrl]) => ({ slug, name, domain, officialUrl, sourceUrl: config.ntaHomepage }))

const examMatchers = [
  ['JEE Main', /JEE\s*\(?Main/i], ['NEET UG', /NEET\s*\(?UG/i], ['CUET UG', /CUET\s*\(?UG/i],
  ['CUET PG', /CUET\s*\(?PG/i], ['UGC-NET', /UGC.?NET/i], ['CSIR-NET', /CSIR.?UGC.?NET|CSIR.?NET/i],
  ['SWAYAM', /SWAYAM/i], ['CMAT', /CMAT/i], ['AIAPGET', /AIAPGET/i], ['ICAR', /ICAR|AIEEA/i],
  ['NCHM JEE', /NCHM.?JEE/i], ['NIFTEE', /NIFTEE|NIFT/i], ['JIPMAT', /JIPMAT/i], ['NCET', /NCET/i]
]

const classifyExam = title => examMatchers.find(([, matcher]) => matcher.test(title))?.[0] || 'General NTA'
const absoluteUrl = href => new URL(href, config.ntaHomepage).toString()
const cleanText = value => value.replace(/\s+/g, ' ').replace(/\bRead More\b/gi, '').trim()
const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function surroundingText($, element) {
  let current = $(element)
  for (let depth = 0; depth < 6; depth += 1) {
    const candidate = cleanText(current.text())
    if (candidate.length >= 18 && candidate.length <= 500) return candidate
    current = current.parent()
  }
  return cleanText($(element).attr('title') || $(element).text())
}

export function parseNtaHomepage(html, fetchedAt = new Date()) {
  const $ = cheerio.load(html)
  const notices = new Map()
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href') || ''
    if (!/\/Download\/Notice\//i.test(href)) return
    const sourceUrl = absoluteUrl(href)
    const title = surroundingText($, element).slice(0, 450)
    if (title.length < 18) return
    notices.set(sourceUrl, { title, exam: classifyExam(title), sourceUrl, source: 'National Testing Agency', fetchedAt, verifiedOfficialSource: true })
  })
  const discovered = new Map(canonicalExams.map(item => [item.slug, { ...item, fetchedAt, verifiedOfficialSource: true }]))
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href') || ''
    if (!/^https?:\/\//i.test(href) || !/(exams\.nta\.nic\.in|\.nta\.nic\.in)/i.test(href)) return
    const name = surroundingText($, element).slice(0, 140) || new URL(href).hostname
    const slug = slugify(classifyExam(name) === 'General NTA' ? name : classifyExam(name))
    if (slug.length > 2) discovered.set(slug, { slug, name: classifyExam(name) === 'General NTA' ? name : classifyExam(name), domain: 'NTA examination', officialUrl: href, sourceUrl: config.ntaHomepage, fetchedAt, verifiedOfficialSource: true })
  })
  return { notices: [...notices.values()], exams: [...discovered.values()] }
}

async function fetchOfficial(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'NTA-Citizen-Portal-Sync/1.0 (+official-source-monitor)', Accept: 'text/html,application/xhtml+xml' }, signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`Official NTA source returned ${response.status}`)
  return response.text()
}

export async function syncNtaData() {
  const startedAt = new Date()
  try {
    const homepageHtml = await fetchOfficial(config.ntaHomepage)
    const contactHtml = await fetchOfficial(config.ntaContactPage).catch(() => '')
    const parsed = parseNtaHomepage(`${homepageHtml}\n${contactHtml}`, startedAt)
    if (!parsed.exams.length) throw new Error('NTA parser returned no examinations; existing data preserved')
    await upsertExams(parsed.exams)
    if (parsed.notices.length) await upsertNotices(parsed.notices)
    return recordSyncRun({ startedAt, completedAt: new Date(), status: 'success', sourceUrl: config.ntaHomepage, sourcePages: [config.ntaHomepage, config.ntaContactPage], examsFound: parsed.exams.length, noticesFound: parsed.notices.length })
  } catch (error) {
    await recordSyncRun({ startedAt, completedAt: new Date(), status: 'failed', sourceUrl: config.ntaHomepage, error: error.message })
    throw error
  }
}

export function startNtaScheduler() {
  const intervalMs = config.ntaSyncIntervalMinutes * 60_000
  const timer = setInterval(() => syncNtaData().catch(error => console.error('[nta-sync]', error.message)), intervalMs)
  timer.unref()
  setTimeout(() => syncNtaData().catch(error => console.error('[nta-sync]', error.message)), 2_000).unref()
  return timer
}
