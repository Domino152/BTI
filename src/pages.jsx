import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  AlertCircle, ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2,
  ChevronLeft, ChevronRight, Clock3, CreditCard, Download, ExternalLink,
  FileCheck2, FileText, Globe2, GraduationCap, HelpCircle, LocateFixed,
  LockKeyhole, MapPin, Megaphone, Menu, Newspaper, Phone, PlayCircle,
  Search, ShieldCheck, Sparkles, UserRound, WalletCards, X
} from 'lucide-react'
import { Carousel, EmptyState, ExamCard, ExternalAnchor, Footer, Header, Status, WorkspaceShell } from './components'
import { ecosystem, exams, examinationShowcase, getExam, getSteps, heroSlides, latestNews, partnerLogos } from './data'
import { useApp } from './state/AppState'

const deepExams = exams.filter(e => e.steps)

export function Home() {
  return <div className="public-page">
    <a className="nta-skip" href="#nta-main">Skip to main content</a>
    <Header/>
    <main id="nta-main">
      <section className="nta-hero">
        <div className="nta-hero-left">
          <div className="nta-practice-grid">
            <a href="https://nta.ac.in/Quiz" target="_blank" rel="noreferrer" className="nta-action-card" aria-label="Open official mock test">
              <div className="eyebrow-row"><span className="eyebrow">OFFICIAL MOCK TEST</span><span className="icon-circle"><PlayCircle size={18}/></span></div>
              <h3>Mock Test</h3>
              <p>Practice tests for real exam experience</p>
              <span className="cta">Start Mock Test <ArrowRight size={14}/></span>
            </a>
            <a href="https://www.nta.ac.in/abhyas" target="_blank" rel="noreferrer" className="nta-action-card accent-green" aria-label="Open National Test Abhyas">
              <div className="eyebrow-row"><span className="eyebrow">NATIONAL TEST ABHYAS</span><span className="icon-circle"><BookOpen size={18}/></span></div>
              <h3>Abhyas</h3>
              <p>Practice and improve your performance</p>
              <span className="cta">Go to Abhyas <ArrowRight size={14}/></span>
            </a>
          </div>
          <LatestNews/>
        </div>
        <div className="nta-hero-right">
          <HeroCarousel slides={heroSlides}/>
        </div>
      </section>

      <section className="nta-section nta-container">
        <div className="nta-section-head">
          <h2>National <span>Testing</span> Agency</h2>
          <p>National Testing Agency (NTA) is a registered society under the Societies Registration Act, 1860.<br/>The NTA will conduct all exams in following domains:</p>
        </div>
        <ExamCarousel items={examinationShowcase}/>
      </section>

      <section className="nta-partners-section">
        <div className="nta-container">
          <PartnersCarousel items={partnerLogos}/>
        </div>
      </section>
    </main>
    <NtaFooter/>
  </div>
}

/* =========================================================
   NTA HOMEPAGE — Redesigned local components
   These do NOT replace the shared Header/Footer used by
   other pages; they are scoped to the redesigned Home only.
   ========================================================= */

function useLiveClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])
  return now
}

function formatDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })
}
function formatTime(d) {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
}

function NtaHeader() {
  const [open, setOpen] = useState(false)
  const { state } = useApp()
  const links = [
    ['/', 'Home'],
    ['/about-us', 'About Us'],
    ['/exams-by-category', 'Exams'],
    ['/rti', 'RTI'],
    ['/tender', 'Tender'],
    ['/downloads', 'Downloads'],
    ['/contact-us', 'Contact Us']
  ]
  return <header className="nta-header">
    <div className="nta-header-inner">
      <Link className="nta-brand" to="/" aria-label="National Testing Agency home">
        <span className="nta-emblem" aria-hidden="true"></span>
        <span className="nta-brand-text">
          <small className="hi">राष्ट्रीय परीक्षा एजेंसी</small>
          <strong className="en">National Testing Agency</strong>
        </span>
      </Link>

      <nav className={open ? 'nta-nav open' : 'nta-nav'} aria-label="Main navigation">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
      </nav>

      <div className="nta-azadi" aria-label="75th Azadi Ka Amrit Mahotsav">
        <span className="nta-azadi-tricolor" aria-hidden="true"><span/><span/><span/></span>
        <span className="nta-azadi-text"><strong>75</strong><small>Azadi Ka</small>Amrit Mahotsav</span>
      </div>

      <div className="nta-header-right">
        <LiveDateTime/>
        <Link className="primary-btn" to="/login" style={{minHeight:42,padding:'0 18px'}}>
          <UserRound size={15}/> {state.authenticated ? 'My Account' : 'Sign In / Login'} <ArrowRight size={15}/>
        </Link>
        <button className="nta-menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>
    </div>
  </header>
}

function LiveDateTime() {
  const now = useLiveClock()
  return <div className="nta-date-chip desktop-only" aria-hidden="true">
    <small>{formatDate(now)}</small>
    <strong>{formatTime(now)} IST</strong>
  </div>
}

function TirangaComposite() {
  return <div className="tiranga-composite" aria-hidden="true">
    <div className="poster astronaut">
      <span className="poster-tag">#MomentsWithTiranga</span>
      <div className="portrait"><UserRound size={74}/></div>
      <p>Rakesh Sharma proudly displayed the Indian National Flag on his spacesuit</p>
    </div>
    <div className="poster mountain">
      <span className="mini-azadi">75</span>
      <h3>Know <b>your</b> Tiranga!</h3>
      <div className="mountain-card">
        <strong>Tenzing Norgay</strong>
        <span>became the first person to hoist the Indian National Flag on Mt. Everest on <b>29 May 1953.</b></span>
      </div>
      <div className="flag-town"></div>
    </div>
    <div className="poster history">
      <span className="mini-azadi">75</span>
      <p>On <b>15 Aug 1947</b> at <b>10:30 am</b>, the National Flag of India was raised on the flag mast for the <b>first time</b> at the Parliament.</p>
      <strong>KNOW YOUR<br/>TIRANGA</strong>
    </div>
  </div>
}

function HeroCarousel({ slides }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const rail = useRef(null)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive(a => (a + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [paused, slides.length])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight') setActive(a => (a + 1) % slides.length)
      if (e.key === 'ArrowLeft') setActive(a => (a - 1 + slides.length) % slides.length)
    }
    const el = rail.current
    if (!el) return
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [slides.length])

  return <div
    className="nta-hero-carousel"
    role="region"
    aria-roledescription="carousel"
    aria-label="NTA promotional highlights"
    ref={rail}
    tabIndex={0}
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)}
    onBlur={() => setPaused(false)}
  >
    {slides.map((s, i) => (
      <article key={s.id} className={`nta-hero-slide ${i === active ? 'active' : ''}`} aria-hidden={i !== active} aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
        <div className={`slide-bg bg-${s.bg}`}></div>
        {s.id === 'tiranga' ? <TirangaComposite/> : <div className="slide-content">
          <div className="badge-row">
            <span className="badge-pill">{s.eyebrow}</span>
            <span className="badge-pill">{s.badge}</span>
          </div>
          <h2>{s.title}</h2>
          <p>{s.subtitle}</p>
        </div>}
      </article>
    ))}
    <div className="nta-hero-dots" role="tablist" aria-label="Slide selectors">
      {slides.map((_, i) => (
        <button key={i} className={i === active ? 'active' : ''} aria-label={`Go to slide ${i + 1}`} aria-current={i === active} onClick={() => setActive(i)}/>
      ))}
    </div>
    <div className="nta-hero-controls">
      <button aria-label="Previous slide" onClick={() => setActive(a => (a - 1 + slides.length) % slides.length)}><ChevronLeft size={18}/></button>
      <button aria-label="Next slide" onClick={() => setActive(a => (a + 1) % slides.length)}><ChevronRight size={18}/></button>
    </div>
  </div>
}

function LatestNews() {
  const today = new Date('2026-08-28')
  const isNew = iso => {
    const d = new Date(iso)
    return (today - d) / 86400000 <= 7
  }
  const typeClass = t => {
    const m = (t || '').toLowerCase()
    if (m.includes('admit')) return 'admit'
    if (m.includes('result')) return 'result'
    if (m.includes('notice')) return 'notice'
    return ''
  }
  return <section className="nta-news-panel" aria-labelledby="latest-news-title">
    <div className="nta-news-head">
      <div className="left">
        <span className="ic" aria-hidden="true"><Newspaper size={16}/></span>
        <h3 id="latest-news-title">Latest News</h3>
      </div>
      <Link className="view-all" to="/notices">View All <ArrowRight size={12}/></Link>
    </div>
    <div className="nta-news-list">
      {latestNews.map(n => (
        <article key={n.id} className="nta-news-item">
          <span className="marker" aria-hidden="true"></span>
          <div className="body">
            <div className="meta">
              <time className="date" dateTime={n.date}>{new Date(n.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
              <span className={`type ${typeClass(n.type)}`}>{n.type}</span>
            </div>
            <h4>{n.title}</h4>
          </div>
          {isNew(n.date) && <span className="new-badge" aria-label="New">New</span>}
        </article>
      ))}
    </div>
    <div className="nta-news-foot">
      <Link to="/notices">View All News <ArrowRight size={12}/></Link>
    </div>
  </section>
}

function ExamCarousel({ items }) {
  const rail = useRef(null)
  const [activePage, setActivePage] = useState(0)
  const [pagesCount, setPagesCount] = useState(1)

  const scrollBy = dir => rail.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })

  useEffect(() => {
    const el = rail.current
    if (!el) return
    const update = () => {
      const perView = el.clientWidth / 260
      setPagesCount(Math.max(1, Math.ceil(items.length / Math.max(1, Math.floor(perView)))))
      setActivePage(Math.round(el.scrollLeft / el.clientWidth))
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [items.length])

  return <div className="nta-exam-carousel" aria-label="NTA examinations carousel">
    <div className="nta-exam-rail" ref={rail} role="list">
      {items.map(ex => (
        <a key={ex.id} href={ex.url} target="_blank" rel="noreferrer" className="nta-exam-card" role="listitem" aria-label={`${ex.name} — ${ex.category}`}>
          <span className="card-ribbon">{ex.name}</span>
          <span className="exam-logo" style={{ '--exam-color': ex.color }}>{ex.monogram}</span>
          <span className="category">{ex.category}</span>
          <h3>{ex.name}</h3>
          <p>{ex.description}</p>
        </a>
      ))}
    </div>
    <div className="controls">
      <button aria-label="Scroll examinations left" onClick={() => scrollBy(-1)}><ChevronLeft size={18}/></button>
      <button aria-label="Scroll examinations right" onClick={() => scrollBy(1)}><ChevronRight size={18}/></button>
    </div>
  </div>
}

function PartnersCarousel({ items }) {
  const rail = useRef(null)
  const [activePage, setActivePage] = useState(0)
  const [pagesCount, setPagesCount] = useState(1)

  const scrollBy = dir => rail.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })

  useEffect(() => {
    const el = rail.current
    if (!el) return
    const update = () => {
      const perView = el.clientWidth / 200
      const perPage = Math.max(1, Math.floor(perView))
      setPagesCount(Math.max(1, Math.ceil(items.length / perPage)))
      setActivePage(Math.min(pagesCount - 1, Math.round(el.scrollLeft / el.clientWidth)))
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [items.length, pagesCount])

  return <div className="nta-partners-carousel" aria-label="Government partners carousel">
    <div className="nta-partners-rail" ref={rail}>
      {items.map(p => (
        <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="nta-partner-card" aria-label={`${p.name} — official website`}>
          <span className="nta-partner-logo" style={{ '--partner-color': p.color }}>{p.monogram}</span>
          <strong>{p.name}</strong>
        </a>
      ))}
    </div>
    <div className="controls">
      <button aria-label="Scroll partners left" onClick={() => scrollBy(-1)}><ChevronLeft size={16}/></button>
      <button aria-label="Scroll partners right" onClick={() => scrollBy(1)}><ChevronRight size={16}/></button>
    </div>
    <div className="nta-partners-dots" role="tablist" aria-label="Partner page indicators">
      {Array.from({ length: pagesCount }).map((_, i) => (
        <button key={i} className={i === activePage ? 'active' : ''} aria-label={`Page ${i + 1}`} aria-current={i === activePage} onClick={() => {
          const el = rail.current
          if (!el) return
          el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
        }}/>
      ))}
    </div>
  </div>
}

function NtaFooter() {
  return <footer className="nta-footer" aria-labelledby="nta-footer-title">
    <h2 id="nta-footer-title" className="sr-only">NTA website footer</h2>
    <div className="nta-footer-top">
      <div className="nta-footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="https://nta.ac.in/Quiz" target="_blank" rel="noreferrer">Mock Test</a></li>
          <li><a href="https://www.nta.ac.in/abhyas" target="_blank" rel="noreferrer">Abhyas</a></li>
          <li><Link to="/exams-by-category">Exam Calendar</Link></li>
          <li><Link to="/notices">Results</Link></li>
          <li><Link to="/notices">Admit Card</Link></li>
          <li><Link to="/notices">Answer Key</Link></li>
          <li><Link to="/resources">Previous Year Papers</Link></li>
          <li><Link to="/help">Help Center</Link></li>
        </ul>
      </div>

      <div className="nta-footer-col">
        <h4>Contact Us</h4>
        <div className="nta-footer-contact">
          <div className="item">
            <span className="ic"><MapPin size={14}/></span>
            <div>
              <strong>Address</strong>
              First Floor, NSIC-MDBP Building,<br/>
              Okhla Industrial Estate,<br/>
              New Delhi, Delhi 110020
            </div>
          </div>
          <div className="item">
            <span className="ic"><Phone size={14}/></span>
            <div>
              <strong>Phone</strong>
              <a href="tel:01169227700">011-69227700</a>
            </div>
          </div>
          <div className="item">
            <span className="ic"><Globe2 size={14}/></span>
            <div>
              <strong>Email</strong>
              <a href="mailto:genadmin@nta.ac.in">genadmin@nta.ac.in</a>
            </div>
          </div>
        </div>
      </div>

      <div className="nta-footer-col">
        <h4>Location</h4>
        <div className="nta-footer-map" aria-label="NTA office location">
          <div className="map-art">
            <span className="pin"><MapPin size={28}/></span>
            <span className="map-label">National Testing Agency<br/>राष्ट्रीय परीक्षा एजेंसी</span>
          </div>
          <a href="https://maps.google.com/?q=NSIC-MDBP+Building+Okhla+New+Delhi" target="_blank" rel="noreferrer">View larger map <ArrowRight size={12}/></a>
        </div>
      </div>
    </div>

    <div className="nta-footer-bottom">
      <div className="nta-footer-bottom-inner">
        <nav aria-label="Footer navigation">
          <a href="https://www.nta.ac.in/" target="_blank" rel="noreferrer">Official NTA</a>
          <Link to="/exams-by-category">All Exams</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/about-prototype">About</Link>
          <Link to="/help">Help</Link>
        </nav>
        <div>© 2026 National Testing Agency · All rights reserved.</div>
      </div>
      <p className="nta-footer-disclaimer">Prototype disclaimer: This is an independent redesign concept for demonstration purposes. Not affiliated with or endorsed by NTA or the Government of India. All candidate data shown is simulated.</p>
    </div>
  </footer>
}

export function Login() {
  const { state, login, reset } = useApp(); const navigate = useNavigate(); const location = useLocation()
  const submit = e => { e.preventDefault(); login(); const target = state.profile.selectedExamIds.length ? '/dashboard' : '/onboarding/exams'; navigate(location.state?.from?.pathname || target, { replace: true }) }
  return <div className="auth-page"><Header/><main className="auth-main"><section className="login-panel"><div className="login-intro"><span className="eyebrow">Candidate services</span><h1>NTA examination services portal</h1><p>Access examination workspaces, application milestones, notices, and official resources from a unified candidate dashboard.</p><ul><li><Check/> Track selected examinations in separate workspaces</li><li><Check/> Review application stages and official resources</li><li><Check/> Keep candidate service information structured and accessible</li></ul></div><form className="login-card" onSubmit={submit}><span className="lock-icon"><LockKeyhole/></span><h2>Candidate Login</h2><p>Continue with the demonstration candidate account.</p><label>Email<input type="email" value="aarav@example.test" readOnly/></label><label>Password<input type="password" value="synthetic-demo" readOnly/></label><button className="primary-btn full" type="submit">Sign in to candidate services <ArrowRight size={17}/></button><p className="form-note"><ShieldCheck size={15}/> Demonstration data remains local to this browser.</p><button type="button" className="text-btn" onClick={() => { reset(); }}>Reset demonstration account</button></form></section></main><Footer/></div>
}

export function Onboarding() {
  const { state, setSelected, addExam } = useApp(); const nav = useNavigate(); const location = useLocation(); const adding = new URLSearchParams(location.search).get('mode') === 'add'
  const [query, setQuery] = useState(''); const [level, setLevel] = useState('All'); const [status, setStatus] = useState('All');
  const [picked, setPicked] = useState(adding ? [] : state.profile.selectedExamIds)
  const filtered = exams.filter(e => (!query || `${e.name} ${e.shortName} ${e.domain}`.toLowerCase().includes(query.toLowerCase())) && (level === 'All' || e.level === level) && (status === 'All' || e.registrationStatus === status) && (!adding || !state.profile.selectedExamIds.includes(e.id)))
  const toggle = id => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const finish = () => { if (!picked.length) return; if (adding) picked.forEach(addExam); else setSelected(picked); nav(`/workspace/${getExam(picked[0]).slug}`) }
  return <div className="app-page"><Header/><main className="onboarding"><div className="page-intro"><Link className="back-link" to={adding ? '/dashboard' : '/'}><ArrowLeft size={16}/> {adding ? 'Back to workspace' : 'Back to home'}</Link><span className="step-label">{adding ? 'EXPAND YOUR WORKSPACE' : 'STEP 1 OF 1'}</span><h1>{adding ? 'Add another examination' : 'Which examinations are you preparing for?'}</h1><p>Your selections create personalized workspaces. You can add or archive them later without losing saved application data.</p></div><div className="filter-bar"><label className="search-field"><Search/><span className="sr-only">Search examinations</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by exam, subject or purpose…"/></label><label><span className="sr-only">Level</span><select value={level} onChange={e=>setLevel(e.target.value)}><option>All</option><option>Undergraduate</option><option>Postgraduate</option></select></label><label><span className="sr-only">Registration status</span><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option value="open">Open</option><option value="upcoming">Upcoming</option><option value="sample">Sample</option><option value="closed">Closed</option></select></label></div><div className="results-meta"><span>{filtered.length} examinations</span><span>Select one or more</span></div><div className="exam-grid">{filtered.map(exam => <ExamCard key={exam.id} exam={exam} selected={picked.includes(exam.id)} onToggle={() => toggle(exam.id)}/>)}</div>{!filtered.length && <EmptyState title="No matching examinations" body="Try a broader search or clear one of your filters."/>}</main><div className="selection-dock"><div><strong>{picked.length} {picked.length === 1 ? 'exam' : 'exams'} selected</strong><span>{picked.length ? picked.map(id => getExam(id)?.shortName).join(', ') : 'Choose at least one to continue'}</span></div><button className="primary-btn" disabled={!picked.length} onClick={finish}>Continue with selected exams <ArrowRight size={17}/></button></div></div>
}

export function Dashboard() {
  const { state } = useApp(); const selected = exams.filter(e => state.profile.selectedExamIds.includes(e.id))
  if (!selected.length) return <Navigate to="/onboarding/exams" replace/>
  const target = getExam(state.profile.activeExamId) || selected[0]
  return <Navigate to={`/workspace/${target.slug}`} replace/>
}

function WorkspaceNav({ exam, section }) {
  const items = [['desk', 'Exam Desk', GraduationCap], ['journey', 'My Journey', FileCheck2], ['explore', 'Explore More', Search]]
  return <nav className="workspace-nav" aria-label={`${exam.shortName} sections`}>{items.map(([id,label,Icon]) => <Link key={id} className={(section || 'desk') === id ? 'active' : ''} to={`/workspace/${exam.slug}/${id}`}><Icon size={18}/>{label}</Link>)}</nav>
}

export function Workspace() {
  const { examSlug, section = 'desk' } = useParams(); const { state, setActive } = useApp(); const exam = getExam(examSlug)
  if (!state.profile.selectedExamIds.length) return <Navigate to="/onboarding/exams" replace/>
  if (!exam || !state.profile.selectedExamIds.includes(exam.id)) return <Navigate to="/dashboard" replace/>
  if (state.profile.activeExamId !== exam.id) setTimeout(() => setActive(exam.id), 0)
  return <WorkspaceShell exam={exam}><main className="workspace-main"><div className="workspace-heading"><div><span className="eyebrow">{exam.level} · {exam.domain}</span><h2>{exam.shortName}</h2><p>{exam.purpose}</p></div><div><Status value={exam.registrationStatus}/><ExternalAnchor className="official-link" href={exam.officialUrl}>Official exam portal</ExternalAnchor></div></div><WorkspaceNav exam={exam} section={section}/>{section === 'journey' ? <Journey exam={exam}/> : section === 'explore' ? <Explore current={exam}/> : <Desk exam={exam}/>}</main><Footer/></WorkspaceShell>
}

function Desk({ exam }) {
  return <div className="workspace-content"><section className="milestone-banner"><div><span className="mini-label"><CalendarDays size={15}/> NEXT MILESTONE</span><h3>{exam.nextLabel || 'Official schedule to be announced'}</h3><p>{exam.nextDate ? `Sample date · ${new Date(exam.nextDate).toLocaleDateString('en-IN', {day:'numeric', month:'long', year:'numeric'})}` : 'Check the official portal for current information.'}</p></div><div className="countdown"><strong>{exam.nextDate ? Math.max(0, Math.ceil((new Date(exam.nextDate)-new Date())/86400000)) : '—'}</strong><span>days to go</span></div></section><div className="content-grid"><div className="main-column"><section className="panel"><div className="panel-head"><div><span className="eyebrow">Updates for your exam</span><h3>Announcements</h3></div><Link to="/notices">View all <ChevronRight size={16}/></Link></div><div className="notice-list">{(exam.notices || []).map(n => <article key={n.title}><span className={n.urgent ? 'notice-icon urgent' : 'notice-icon'}><Megaphone/></span><div><div><span className="notice-type">{n.type}</span><time>{n.date}</time></div><h4>{n.title}</h4><small>Simulated notice for prototype demonstration</small></div></article>)}</div></section><section className="panel"><div className="panel-head"><div><span className="eyebrow">Prepare</span><h3>Practice & papers</h3></div></div><div className="resource-grid">{(exam.resources || []).map((r,i)=><a key={r} href="/sample-paper.txt" download={`${exam.slug}-sample-resource.txt`}><span><FileText/><small>{i === 0 ? 'PRACTICE' : 'RESOURCE'}</small></span><strong>{r}</strong><em>Simulated download <Download size={15}/></em></a>)}</div></section></div><aside className="side-column"><section className="panel"><div className="panel-head"><div><span className="eyebrow">Sample locations</span><h3>Nearby centres</h3></div><LocateFixed/></div><p className="muted">Example centres only. Final allocation appears on the official admit card.</p><ol className="center-list">{(exam.centers || []).map((c,i)=><li key={c}><span>{i+1}</span><div><strong>{c}</strong><small>{(3.2+i*2.7).toFixed(1)} km sample distance</small></div></li>)}</ol></section><section className="help-card"><HelpCircle/><div><strong>Need exam-specific help?</strong><p>Find official contact channels and safe guidance.</p><Link to="/help">Open help directory <ArrowRight size={15}/></Link></div></section></aside></div></div>
}

function Journey({ exam }) {
  const { state } = useApp(); const app = state.applications[exam.id] || { state: 'NOT_STARTED', currentStep: null, answers: {} }
  const steps = getSteps(exam); const done = app.state === 'SUBMITTED'; const pending = app.state === 'PAYMENT_PENDING'; const currentIndex = app.currentStep ? Math.max(0, steps.indexOf(app.currentStep)) : 0
  return <div className="workspace-content"><section className={`journey-callout ${pending ? 'warning' : ''}`}><div className="journey-icon">{pending ? <WalletCards/> : done ? <CheckCircle2/> : <FileCheck2/>}</div><div><span className="mini-label">YOUR APPLICATION</span><h3>{pending ? 'Payment needs your attention' : done ? 'Application submitted' : app.state === 'IN_PROGRESS' ? 'Continue where you left off' : 'Ready when you are'}</h3><p>{pending ? 'Your answers are safely saved. Retry the simulated payment to complete this application.' : done ? `Reference ${app.paymentReference}` : 'Review the pre-filled profile and complete this exam’s application steps.'}</p></div><Link className="primary-btn" to={`/apply/${exam.slug}/${pending ? 'payment' : currentIndex}`}>{pending ? 'Resume payment' : done ? 'View application' : app.state === 'IN_PROGRESS' ? 'Continue application' : 'Start application'} <ArrowRight size={17}/></Link></section><div className="content-grid"><section className="panel main-column"><div className="panel-head"><div><span className="eyebrow">Application path</span><h3>Your progress</h3></div><span className="progress-copy">{done ? steps.length : currentIndex} of {steps.length} complete</span></div><ol className="journey-steps">{steps.map((step,i)=>{const complete=done||i<currentIndex; const active=!done&&i===currentIndex; return <li className={complete?'complete':active?'active':''} key={step}><span>{complete?<Check/>:i+1}</span><div><strong>{step}</strong><small>{complete?'Completed':active?'Current step':'Upcoming'}</small></div></li>})}</ol></section><aside className="side-column"><section className="panel"><span className="eyebrow">Shared profile</span><h3>Reusable details</h3><div className="profile-summary"><span>AM</span><div><strong>{state.profile.name}</strong><small>{state.profile.email}</small><small>{state.profile.phone}</small></div></div><p className="muted">These account-level details are pre-filled, but you review them before every simulated submission.</p></section><section className="panel compact"><span className="eyebrow">Data boundary</span><p className="muted">Answers saved here belong only to {exam.shortName}. Switching exam tabs will not mix application data.</p></section></aside></div></div>
}

function Explore({ current }) {
  const { state, addExam } = useApp(); const [added, setAdded] = useState(null)
  const other = exams.filter(e => !state.profile.selectedExamIds.includes(e.id))
  return <div className="workspace-content"><div className="section-head simple"><div><span className="eyebrow">Discover more</span><h3>Other examinations you can track</h3><p>Adding one creates a new workspace without changing your {current.shortName} progress.</p></div><Link className="secondary-btn" to="/manage-exams">Manage exams</Link></div>{added && <div className="success-banner"><CheckCircle2/> {getExam(added).shortName} was added to your workspace.</div>}<div className="exam-grid compact-grid">{other.map(e=><ExamCard key={e.id} exam={e} selected={false} onToggle={()=>{addExam(e.id);setAdded(e.id)}} actionLabel="Add exam"/>)}</div>{!other.length&&<EmptyState title="Everything is in your workspace" body="You have added every examination in this demo catalogue."/>}</div>
}

export function ApplicationStep() {
  const { examSlug, step } = useParams(); const exam = getExam(examSlug); const { state, updateApplication } = useApp(); const nav = useNavigate()
  if (!exam || !state.profile.selectedExamIds.includes(exam.id)) return <Navigate to="/dashboard" replace/>
  const steps = getSteps(exam); const app = state.applications[exam.id] || { state:'NOT_STARTED', answers:{} }; const payment = step === 'payment'; const index = payment ? steps.length - 1 : Math.min(Number(step)||0, steps.length-1); const [fullName,setFullName]=useState(app.answers?.fullName || state.profile.name); const [confirmed,setConfirmed]=useState(false); const [payError,setPayError]=useState(false)
  const save = e => {e.preventDefault(); const last=index===steps.length-1; if(last){updateApplication(exam.id,{state:'PAYMENT_PENDING',currentStep:steps[index],answers:{...app.answers,fullName}});nav(`/apply/${exam.slug}/payment`)} else {updateApplication(exam.id,{state:'IN_PROGRESS',currentStep:steps[index+1],answers:{...app.answers,fullName}});nav(`/apply/${exam.slug}/${index+1}`)}}
  const pay = success => { if(!success){setPayError(true);updateApplication(exam.id,{state:'PAYMENT_PENDING'});return} updateApplication(exam.id,{state:'SUBMITTED',currentStep:null,paymentReference:`SIM-${exam.shortName.replace(/\W/g,'')}-260823`});nav(`/workspace/${exam.slug}/journey`) }
  return <div className="app-page"><Header/><main className="application-page"><Link className="back-link" to={`/workspace/${exam.slug}/journey`}><ArrowLeft size={16}/> Back to My Journey</Link><div className="application-layout"><aside><span className="eyebrow">SIMULATED APPLICATION</span><h1>{exam.shortName}</h1><ol>{steps.map((s,i)=><li className={i<index?'complete':i===index?'active':''} key={s}><span>{i<index?<Check/>:i+1}</span>{s}</li>)}</ol><div className="safe-note"><ShieldCheck/><p>No data is sent to NTA. This form exists only to demonstrate the journey.</p></div></aside>{payment ? <section className="form-panel"><span className="form-icon"><CreditCard/></span><span className="eyebrow">PAYMENT RECOVERY DEMO</span><h2>Complete simulated payment</h2><p>Your application answers are saved. Choose an outcome to test payment recovery.</p><div className="payment-summary"><span>Application fee <small>Sample amount</small></span><strong>₹1,000</strong></div>{payError&&<div className="error-banner"><AlertCircle/> Payment could not be completed. No amount was charged. Your application remains saved.</div>}<button className="primary-btn full" onClick={()=>pay(true)}>Simulate successful payment <ArrowRight size={17}/></button><button className="secondary-btn full" onClick={()=>pay(false)}>Simulate failed payment</button></section> : <form className="form-panel" onSubmit={save}><span className="eyebrow">STEP {index+1} OF {steps.length}</span><h2>{steps[index]}</h2><p>Review this synthetic information for the prototype.</p><label>Candidate name<input value={fullName} onChange={e=>setFullName(e.target.value)} required/></label><label>Email address<input value={state.profile.email} readOnly/></label>{index>0&&<label>Sample response<select defaultValue="confirmed"><option value="confirmed">Reviewed and confirmed</option><option>Needs correction</option></select></label>}<label className="check-row"><input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)}/><span>I confirm that I reviewed this simulated information.</span></label><button className="primary-btn full" disabled={!confirmed||!fullName.trim()}>{index===steps.length-1?'Continue to payment':'Save and continue'} <ArrowRight size={17}/></button><button type="button" className="text-btn" onClick={()=>{updateApplication(exam.id,{state:'IN_PROGRESS',currentStep:steps[index],answers:{...app.answers,fullName}});nav(`/workspace/${exam.slug}/journey`)}}>Save and exit</button></form>}</div></main></div>
}

export function ManageExams() {
  const { state, archiveExam, restoreExam } = useApp(); const [confirm,setConfirm]=useState(null); const selected=exams.filter(e=>state.profile.selectedExamIds.includes(e.id)); const archived=exams.filter(e=>state.archivedExamIds.includes(e.id))
  return <div className="app-page"><Header/><main className="narrow-page"><Link className="back-link" to="/dashboard"><ArrowLeft size={16}/> Back to workspace</Link><div className="page-intro left"><span className="eyebrow">Workspace settings</span><h1>Manage examinations</h1><p>Archive a workspace to hide its tab. Saved application data remains available if you restore it later.</p></div><section className="panel"><div className="panel-head"><h2>Active workspaces</h2><Link className="primary-btn small" to="/onboarding/exams?mode=add">Add exam</Link></div>{selected.map(e=><div className="manage-row" key={e.id}><span className="exam-symbol" style={{background:`${e.color}18`,color:e.color}}>{e.shortName.slice(0,2)}</span><div><strong>{e.shortName}</strong><small>{e.purpose}</small></div><button className="danger-btn" onClick={()=>setConfirm(e)}>Archive</button></div>)}</section>{archived.length>0&&<section className="panel"><h2>Archived</h2>{archived.map(e=><div className="manage-row" key={e.id}><span className="exam-symbol">{e.shortName.slice(0,2)}</span><div><strong>{e.shortName}</strong><small>Application data retained</small></div><button className="secondary-btn small" onClick={()=>restoreExam(e.id)}>Restore</button></div>)}</section>}{confirm&&<div className="modal-backdrop" role="presentation"><div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><span className="warning-icon"><AlertCircle/></span><h2 id="confirm-title">Archive {confirm.shortName}?</h2><p>Its tab will be hidden, but all simulated application answers and progress will be kept.</p><div><button className="secondary-btn" onClick={()=>setConfirm(null)}>Keep workspace</button><button className="danger-solid" onClick={()=>{archiveExam(confirm.id);setConfirm(null)}}>Archive exam</button></div></div></div>}</main><Footer/></div>
}

function PublicLayout({children}) { return <div className="public-page"><Header/><main className="public-main">{children}</main><Footer/></div> }

export function ExamCatalogue() { const [q,setQ]=useState(''); const filtered=exams.filter(e=>`${e.name} ${e.domain} ${e.purpose}`.toLowerCase().includes(q.toLowerCase())); return <PublicLayout><div className="public-title"><span className="eyebrow">Examinations</span><h1>NTA examination catalogue</h1><p>Search national-level examinations conducted by NTA and proceed to the respective official portals for authoritative information.</p></div><label className="search-field standalone"><Search/><span className="sr-only">Search exams</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search examination name, domain, or purpose"/></label><div className="exam-grid">{filtered.map(e=><ExamCard key={e.id} exam={e} selected={false} onToggle={()=>{}}/>)}</div></PublicLayout> }

export function Notices() { const [examId,setExamId]=useState('all'); const notices=deepExams.filter(e=>examId==='all'||e.id===examId).flatMap(e=>(e.notices||[]).map(n=>({...n,exam:e}))); return <PublicLayout><div className="public-title"><span className="eyebrow">Public notices</span><h1>Examination notices and announcements</h1><p>Review examination-wise announcements and verify final instructions on the corresponding official NTA portal.</p></div><div className="filter-bar one"><select value={examId} onChange={e=>setExamId(e.target.value)} aria-label="Filter by exam"><option value="all">All examinations</option>{deepExams.map(e=><option value={e.id} key={e.id}>{e.shortName}</option>)}</select></div><section className="panel public-list">{notices.map(n=><article key={`${n.exam.id}-${n.title}`}><span className="notice-icon"><Megaphone/></span><div><span className="notice-type">{n.exam.shortName} · {n.type}</span><h3>{n.title}</h3><small>{n.date} · Candidate notice</small></div><ExternalAnchor href={n.exam.officialUrl}>Verify officially</ExternalAnchor></article>)}</section></PublicLayout> }

export function Help() { return <PublicLayout><div className="public-title"><span className="eyebrow">Help desk</span><h1>Candidate support resources</h1><p>Use official channels for application, eligibility, payment, admit card, and result-related questions.</p></div><div className="help-grid"><section className="panel"><HelpCircle/><h2>Official NTA support</h2><p>Find current exam-specific contact details on NTA’s directory.</p><ExternalAnchor className="primary-btn" href="https://www.nta.ac.in/ContactUs">Open official directory</ExternalAnchor></section><section className="panel"><PlayCircle/><h2>Mock test help</h2><p>Access computer-based test practice resources.</p><ExternalAnchor className="secondary-btn" href="https://nta.ac.in/Quiz">Open mock tests</ExternalAnchor></section><section className="panel"><BookOpen/><h2>Abhyas guidance</h2><p>Access practice tests and performance review resources.</p><ExternalAnchor className="secondary-btn" href="https://www.nta.ac.in/Abhyas/help">Open Abhyas help</ExternalAnchor></section></div></PublicLayout> }

export function About() { return <PublicLayout><div className="public-title"><span className="eyebrow">About this redesign</span><h1>NTA website interface concept</h1><p>This interface concept demonstrates a clearer information architecture for examination discovery, candidate services, notices, and official resources.</p></div><div className="about-grid"><section className="panel"><h2>Demonstration data</h2><p>Candidate identity, application numbers, dates, fees, centres, notices, answers, and payment references are fictional.</p></section><section className="panel"><h2>Official sources</h2><p>Clearly labelled external links lead to public NTA or examination websites. Those websites remain the authoritative source.</p></section><section className="panel"><h2>Service boundary</h2><p>This interface does not log in to, scrape, imitate, or transmit information to private government services.</p></section></div></PublicLayout> }
