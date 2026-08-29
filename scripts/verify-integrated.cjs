const { chromium } = require('C:/Users/Sherwin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')

const base = 'http://127.0.0.1:5174/V2NTA'

;(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))

  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  const homeSlideCount = await page.locator('.nta-hero-slide').count()
  await page.getByRole('button', { name: 'Go to slide 1' }).click()
  await page.waitForTimeout(1100)
  const firstSlide = await page.locator('.nta-hero-slide.active img').getAttribute('alt')
  const firstBackdrop = await page.locator('.nta-hero-slide.active .nta-hero-image-backdrop').evaluate(element => ({ image: getComputedStyle(element).backgroundImage.includes('nta-slide-02'), opacity: getComputedStyle(element).opacity }))
  await page.screenshot({ path: 'home-narrow-visual.png', fullPage: false })
  await page.getByRole('button', { name: 'Next slide' }).click()
  await page.waitForTimeout(1100)
  const secondSlide = await page.locator('.nta-hero-slide.active img').getAttribute('alt')
  const homeOrder = await page.evaluate(() => document.querySelector('.nta-home-hero').getBoundingClientRect().bottom <= document.querySelector('.nta-home-services').getBoundingClientRect().top)
  const homeOverflow = await page.evaluate(() => ({ inner: innerWidth, scroll: document.documentElement.scrollWidth }))
  await page.screenshot({ path: 'home-reference-visual.png', fullPage: true })

  const publicPageUi = {}
  for (const path of ['about-us', 'exams-by-category', 'rti', 'tender', 'downloads', 'contact-us']) {
    await page.goto(`${base}/${path}`, { waitUntil: 'networkidle' })
    publicPageUi[path] = await page.evaluate(() => ({ header: document.querySelectorAll('header').length, footer: document.querySelectorAll('footer').length, heading: document.querySelector('h1')?.textContent?.trim(), overflow: document.documentElement.scrollWidth > innerWidth }))
  }

  await page.goto(`${base}/about-us/vision`, { waitUntil: 'networkidle' })
  const aboutVision = await page.getByRole('heading', { name: 'Vision & Mission' }).isVisible()
  const aboutActiveNav = await page.locator('.institution-sidebar a.active').innerText()
  await page.screenshot({ path: 'about-vision-visual.png', fullPage: true })
  await page.goto(`${base}/tender`, { waitUntil: 'networkidle' })
  await page.getByRole('tab', { name: /Archived/ }).click()
  const archivedTenderVisible = await page.getByText('Question Paper Setting and Evaluation').isVisible()
  await page.getByRole('button', { name: /View details/ }).click()
  const tenderDetailsVisible = await page.getByText('Prototype procurement summary').isVisible()
  await page.screenshot({ path: 'tender-interaction-visual.png', fullPage: true })
  await page.goto(`${base}/contact-us`, { waitUntil: 'networkidle' })
  await page.getByPlaceholder('Enter your full name').fill('Prototype Visitor')
  await page.getByPlaceholder('your.email@example.com').fill('visitor@example.test')
  await page.getByPlaceholder('Describe your query in detail...').fill('Testing the prototype contact confirmation.')
  await page.getByRole('button', { name: /Submit message/ }).click()
  const contactSuccess = await page.getByText('Message captured in this prototype').isVisible()

  await page.goto(`${base}/mock-test`, { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByLabel('Examination').selectOption('jee-main')
  await page.getByLabel('Paper').selectOption('paper-1')
  await page.getByRole('button', { name: /Start mock test/i }).click()
  await page.getByRole('dialog').waitFor()
  const preserved = await page.getByText(/selection has been preserved/i).isVisible()
  await page.getByRole('button', { name: /Login and continue/i }).click()
  await page.waitForURL('**/mock-test/instructions')
  const proceedDisabled = await page.getByRole('button', { name: /Proceed to mock test/i }).isDisabled()
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: /Proceed to mock test/i }).click()
  await page.waitForURL('**/mock-test/exam')
  await page.locator('.answer-options label').nth(1).click()
  await page.getByRole('button', { name: /Save & Mark for Review/i }).click()
  const markedCount = await page.locator('.palette-summary .answered-marked').innerText()
  await page.getByRole('button', { name: 'Submit', exact: true }).click()
  await page.getByRole('dialog').waitFor()
  await page.getByRole('button', { name: 'Submit now' }).click()
  await page.waitForURL('**/mock-test/result')
  const resultHeading = await page.getByRole('heading', { name: 'Your practice result' }).innerText()
  await page.getByRole('button', { name: /Review answers/i }).click()
  const reviewItems = await page.locator('.answer-review article').count()
  const resultOverflow = await page.evaluate(() => ({ inner: innerWidth, scroll: document.documentElement.scrollWidth }))
  await page.screenshot({ path: 'mock-result-visual.png', fullPage: true })

  await page.goto(`${base}/abhyas`, { waitUntil: 'domcontentloaded' })
  const abhyasHeading = await page.locator('.abhyas-hero h1').innerText()
  const videos = await page.locator('.video-embed iframe').count()
  const featureCards = await page.locator('.abhyas-feature-grid article').count()
  const abhyasOverflow = await page.evaluate(() => ({ inner: innerWidth, scroll: document.documentElement.scrollWidth }))
  await page.screenshot({ path: 'abhyas-visual.png', fullPage: true })

  await page.goto(`${base}/login`, { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Sign in to candidate services/i }).click()
  await page.getByRole('button', { name: 'Select CUET UG' }).click()
  await page.getByRole('button', { name: /Continue with selected exams/i }).click()
  await page.goto(`${base}/apply/cuet-ug/0`, { waitUntil: 'networkidle' })
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: /Save and continue/i }).click()
  await page.getByLabel('University / institution').selectOption({ index: 1 })
  await page.getByLabel('Subjects / domain').selectOption({ index: 1 })
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: /Save and continue/i }).click()
  await page.getByLabel('City preference 1').selectOption('Delhi')
  await page.getByLabel('City preference 2').selectOption('Jaipur')
  await page.getByLabel('City preference 3').selectOption('Lucknow')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: /Save and continue/i }).click()
  const uploads = page.getByRole('button', { name: /Upload/i })
  await uploads.nth(0).click(); await uploads.nth(0).click(); await uploads.nth(0).click()
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: /Save and continue/i }).click()
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: /Continue to payment/i }).click()
  await page.getByRole('button', { name: /Test failed payment/i }).click()
  const failedVisible = await page.getByText(/Payment failed/i).isVisible()
  await page.getByRole('button', { name: /Test cancelled payment/i }).click()
  const cancelledVisible = await page.getByText(/Payment was cancelled/i).isVisible()
  await page.getByRole('button', { name: /Retry successful payment/i }).click()
  await page.waitForURL('**/apply/cuet-ug/submitted')
  const confirmation = await page.getByRole('heading', { name: /Your application is submitted/i }).innerText()
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('nta-citizen-first-v1')).applications['cuet-ug'])
  const applicationOverflow = await page.evaluate(() => ({ inner: innerWidth, scroll: document.documentElement.scrollWidth }))
  const overflowOffenders = await page.evaluate(() => [...document.querySelectorAll('body *')].map(element => ({ tag: element.tagName, cls: element.className, right: Math.round(element.getBoundingClientRect().right), width: Math.round(element.getBoundingClientRect().width) })).filter(item => item.right > innerWidth + 1).sort((a, b) => b.right - a.right).slice(0, 8))
  await page.screenshot({ path: 'application-confirmation-visual.png', fullPage: true })

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  mobile.on('pageerror', error => errors.push(error.message))
  await mobile.goto(`${base}/mock-test`, { waitUntil: 'networkidle' })
  const mobileOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)

  const assertions = {
    fourSuppliedSlides: homeSlideCount === 4,
    noHomeOverflow: homeOverflow.inner === homeOverflow.scroll,
    publicPagesRender: Object.values(publicPageUi).every(item => item.header === 1 && item.footer === 1 && !item.overflow),
    aboutVision: aboutVision && aboutActiveNav.includes('Vision'),
    tenderInteractions: archivedTenderVisible && tenderDetailsVisible,
    contactSuccess,
    mockFlow: preserved && proceedDisabled && resultHeading.includes('Mock test complete') && errors.length === 0,
    applicationFlow: failedVisible && cancelledVisible && stored.state === 'SUBMITTED' && stored.paymentStatus === 'SUCCEEDED',
    responsive: !mobileOverflow
  }
  console.log(JSON.stringify({ assertions, homeSlideCount, firstSlide, firstBackdrop, secondSlide, homeOrder, homeOverflow, publicPageUi, aboutVision, aboutActiveNav, archivedTenderVisible, tenderDetailsVisible, contactSuccess, preserved, proceedDisabled, markedCount, resultHeading, reviewItems, resultOverflow, abhyasHeading, videos, featureCards, abhyasOverflow, failedVisible, cancelledVisible, confirmation, applicationOverflow, overflowOffenders, applicationState: stored.state, paymentStatus: stored.paymentStatus, mobileOverflow, errors }, null, 2))
  if (Object.values(assertions).some(value => !value)) throw new Error(`Integrated assertions failed: ${JSON.stringify(assertions)}`)
  await browser.close()
})().catch(error => { console.error(error); process.exit(1) })
