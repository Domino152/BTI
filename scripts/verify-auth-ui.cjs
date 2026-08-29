const { chromium } = require('C:/Users/Sherwin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')

const base = 'http://127.0.0.1:5174/V2NTA'

;(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' })
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))

  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  const slides = await page.locator('.nta-hero-slide').count()
  const removedSlideRequests = page.locator('img[src*="nta-slide-01"]')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  const homeLayout = await page.evaluate(() => {
    const lead = document.querySelector('.nta-home-lead').getBoundingClientRect()
    const side = document.querySelector('.nta-home-side-services').getBoundingClientRect()
    const hero = document.querySelector('.nta-home-hero').getBoundingClientRect()
    const dateChip = document.querySelector('.nta-date-chip')
    const newsDate = document.querySelector('.nta-news-item .date')
    return {
      sideBeforeHero: side.right <= hero.left,
      heroIsCompact: hero.width < lead.width && hero.height < 460,
      dateSquareRemoved: getComputedStyle(dateChip, '::before').content === 'none',
      newsSquaresRemoved: !newsDate || getComputedStyle(newsDate, '::before').content === 'none'
    }
  })

  await page.goto(`${base}/login`, { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'New here? Create an account' }).click()
  const username = `candidate_${Date.now()}`
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill('Secure-password-2026')
  await page.getByRole('button', { name: /Create account/ }).click()
  await page.waitForURL('**/onboarding/exams')
  await page.getByRole('button', { name: 'Select CUET UG' }).click()
  await page.getByRole('button', { name: /Continue with selected exams/i }).click()
  await page.waitForTimeout(500)

  await page.goto(`${base}/apply/cuet-ug/3`, { waitUntil: 'networkidle' })
  if (await page.locator('input[type="file"]').count() === 0) throw new Error(`Document step did not render at ${page.url()}: ${(await page.locator('body').innerText()).slice(0, 500)}`)
  await page.locator('input[type="file"]').first().setInputFiles({ name: 'candidate-photo.jpg', mimeType: 'image/jpeg', buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9]) })
  await page.getByText(/candidate-photo\.jpg.*stored securely/i).waitFor()
  const token = await page.evaluate(() => localStorage.getItem('nta-session-token-v1'))
  const documents = await fetch('http://127.0.0.1:8787/api/documents', { headers: { Authorization: `Bearer ${token}` } }).then(response => response.json())

  const result = { slides, removedSlideCount: await removedSlideRequests.count(), overflow, homeLayout, username, uploadedDocuments: documents.documents.length, errors }
  console.log(JSON.stringify(result, null, 2))
  if (slides !== 4 || result.removedSlideCount !== 0 || overflow || !Object.values(homeLayout).every(Boolean) || documents.documents.length !== 1 || errors.length) throw new Error('Browser verification failed')
  await browser.close()
})().catch(error => { console.error(error); process.exit(1) })
