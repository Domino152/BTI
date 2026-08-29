import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Accessibility, ArrowRight, AtSign, Check, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Globe2, Link2, MapPin, Menu, Phone, PlayCircle, Plus, Share2, UserRound, X } from 'lucide-react'
import { exams } from './data'
import { useApp } from './state/AppState'

export function Brand() {
  return <Link className="nta-brand brand" to="/" aria-label="National Testing Agency home">
    <span className="nta-emblem brand-mark" aria-hidden="true"></span>
    <span className="nta-brand-text">
      <small className="hi">राष्ट्रीय परीक्षा एजेंसी</small>
      <strong className="en">National Testing Agency</strong>
    </span>
  </Link>
}

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

function LiveDateTime() {
  const now = useLiveClock()
  return <div className="nta-date-chip desktop-only" aria-hidden="true">
    <small>{formatDate(now)}</small>
    <strong>{formatTime(now)} IST</strong>
  </div>
}

export function Header({ workspace = false }) {
  const [open, setOpen] = useState(false)
  const { state, logout } = useApp()
  const navigate = useNavigate()
  const links = [
    ['/', 'Home'],
    ['/about-us', 'About Us'],
    ['/exams-by-category', 'Exams'],
    ['/rti', 'RTI'],
    ['/tender', 'Tender'],
    ['/downloads', 'Downloads'],
    ['/contact-us', 'Contact Us']
  ]
  const leave = () => { logout(); navigate('/') }
  return <header className="site-header nta-header"><div className="nav-shell nta-header-inner"><Brand />
    <nav className={open ? 'main-nav nta-nav open' : 'main-nav nta-nav'} aria-label="Main navigation">
      {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <div className="mobile-only nav-extras"><button className="quiet-btn"><Globe2 size={18}/> English</button><button className="quiet-btn"><Accessibility size={18}/> Accessibility</button></div>
    </nav>
    <div className="nta-azadi" aria-label="75th Azadi Ka Amrit Mahotsav">
      <span className="nta-azadi-tricolor" aria-hidden="true"><span/><span/><span/></span>
      <span className="nta-azadi-text"><strong>75</strong><small>Azadi Ka</small>Amrit Mahotsav</span>
    </div>
    <div className="nav-actions nta-header-right">
      <LiveDateTime/>
      {!workspace && <button className="nta-language desktop-only" type="button" aria-label="Language selector"><Globe2 size={15}/> English <ChevronDown size={14}/></button>}
      {state.authenticated
        ? <button className="nta-profile-pill desktop-login" onClick={leave} title="Sign out"><span>AM</span>{state.profile.name} <ChevronDown size={14}/></button>
        : <Link className="primary-btn desktop-login" to="/login"><UserRound size={15}/> Sign In / Login <ArrowRight size={15}/></Link>}
      <button className="icon-btn menu-btn nta-menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </div></header>
}

export function Footer() {
  return <footer className="nta-footer" aria-labelledby="shared-footer-title">
    <h2 className="sr-only" id="shared-footer-title">National Testing Agency footer</h2>
    <div className="nta-footer-top">
      <div className="nta-footer-col nta-footer-brand">
        <Brand/>
        <p>An autonomous testing body under the Department of Higher Education, Ministry of Education, Government of India.</p>
        <div className="nta-footer-social" aria-label="Social links">
          <a href="https://www.facebook.com/NTA.Official" target="_blank" rel="noreferrer" aria-label="Facebook"><Share2 size={16}/></a>
          <a href="https://twitter.com/NTA_Exams" target="_blank" rel="noreferrer" aria-label="X"><AtSign size={16}/></a>
          <a href="https://www.youtube.com/@NationalTestingAgency" target="_blank" rel="noreferrer" aria-label="YouTube"><PlayCircle size={16}/></a>
          <a href="https://www.nta.ac.in/" target="_blank" rel="noreferrer" aria-label="Official website"><Link2 size={16}/></a>
        </div>
      </div>
      <div className="nta-footer-col">
        <h4>Candidate Services</h4>
        <ul><li><Link to="/mock-test">Mock Test</Link></li><li><Link to="/abhyas">Abhyas</Link></li><li><Link to="/exams-by-category">All Examinations</Link></li><li><Link to="/notices">Results & notices</Link></li><li><Link to="/downloads">Downloads</Link></li><li><Link to="/help">Help Center</Link></li></ul>
      </div>
      <div className="nta-footer-col">
        <h4>Contact Us</h4>
        <div className="nta-footer-contact">
          <div className="item"><span className="ic"><MapPin size={14}/></span><div><strong>Head Office</strong>First Floor, NSIC-MDBP Building,<br/>Okhla Industrial Estate,<br/>New Delhi 110020</div></div>
          <div className="item"><span className="ic"><Phone size={14}/></span><div><strong>Phone</strong><a href="tel:01169227700">011-69227700</a></div></div>
          <div className="item"><span className="ic"><AtSign size={14}/></span><div><strong>Email</strong><a href="mailto:genadmin@nta.ac.in">genadmin@nta.ac.in</a></div></div>
        </div>
      </div>
      <div className="nta-footer-col">
        <h4>Location</h4>
        <div className="nta-footer-map"><div className="map-art"><span className="pin"><MapPin size={28}/></span></div><a href="https://maps.google.com/?q=NSIC-MDBP+Building+Okhla+New+Delhi" target="_blank" rel="noreferrer">View larger map <ArrowRight size={12}/></a></div>
        <div className="nta-footer-ministry"><span className="badge"/><div className="text"><strong>Ministry of Education</strong><small>Government of India</small></div></div>
      </div>
    </div>
    <div className="nta-footer-bottom"><div className="nta-footer-bottom-inner"><nav aria-label="Footer navigation"><a href="https://www.nta.ac.in/" target="_blank" rel="noreferrer">Official NTA</a><Link to="/exams-by-category">All Exams</Link><Link to="/resources">Resources</Link><Link to="/about-us">About</Link><Link to="/rti">RTI</Link></nav><div>© 2026 National Testing Agency. All rights reserved.</div></div><p className="nta-footer-disclaimer">Independent interface prototype for demonstration. Official actions continue on linked Government of India and NTA portals.</p></div>
  </footer>
}

export function Status({ value }) { return <span className={`status ${value}`}>{value === 'sample' ? 'Sample data' : value}</span> }

export function WorkspaceShell({ children, exam }) {
  const { state, setActive } = useApp()
  const selected = exams.filter(e => state.profile.selectedExamIds.includes(e.id))
  return <><Header workspace/><div className="workspace-top"><div className="workspace-title"><span className="eyebrow">Student workspace</span><h1>Good afternoon, {state.profile.name.split(' ')[0]}</h1></div><div className="exam-tabs" role="tablist" aria-label="Selected examinations">
    {selected.map(e => <Link role="tab" aria-selected={exam?.id === e.id} className={exam?.id === e.id ? 'exam-tab active' : 'exam-tab'} key={e.id} to={`/workspace/${e.slug}`} onClick={() => setActive(e.id)}>{e.shortName}</Link>)}
    <Link className="add-tab" to="/onboarding/exams?mode=add"><Plus size={17}/> Add exam</Link>
  </div></div>{children}</>
}

export function ExternalAnchor({ href, children, className = '' }) { return <a className={className} href={href} target="_blank" rel="noreferrer">{children} <ExternalLink size={15} aria-hidden="true"/></a> }

export function Carousel({ items }) {
  const rail = useRef(null)
  const move = dir => rail.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  return <section className="ecosystem" aria-labelledby="ecosystem-title"><div className="section-head"><div><span className="eyebrow">Trusted destinations</span><h2 id="ecosystem-title">Official ecosystem, one step away</h2></div><div className="carousel-controls"><button className="icon-btn" onClick={() => move(-1)} aria-label="Previous official links"><ChevronLeft/></button><button className="icon-btn" onClick={() => move(1)} aria-label="Next official links"><ChevronRight/></button></div></div><div className="carousel-rail" ref={rail} tabIndex="0">{items.map(([name, desc, url, monogram]) => <a href={url} target="_blank" rel="noreferrer" className="ecosystem-card" key={name} aria-label={`${name}: ${desc}, official link`}><span className="eco-logo">{monogram}</span><span><strong>{name}</strong><small>{desc}</small></span><ExternalLink size={17}/></a>)}</div></section>
}

export function ExamCard({ exam, selected, onToggle, actionLabel }) {
  return <article className={selected ? 'exam-card selected' : 'exam-card'}><button className="card-select" onClick={onToggle} aria-pressed={selected} aria-label={`${selected ? 'Remove' : 'Select'} ${exam.shortName}`}><span className="exam-symbol" style={{ background: `${exam.color}18`, color: exam.color }}>{exam.shortName.slice(0, 2)}</span>{selected && <span className="selected-check"><Check size={15}/></span>}<div><div className="card-topline"><Status value={exam.registrationStatus}/><span>{exam.level}</span></div><h3>{exam.shortName}</h3><p>{exam.purpose}</p></div></button><div className="exam-card-foot"><span>{exam.domain}</span><ExternalAnchor href={exam.officialUrl}>Official portal</ExternalAnchor>{actionLabel && <span>{actionLabel}</span>}</div></article>
}

export function EmptyState({ title, body, action, to }) { return <div className="empty-state"><span className="empty-icon">✦</span><h2>{title}</h2><p>{body}</p>{action && <Link className="primary-btn" to={to}>{action}<ArrowRight size={17}/></Link>}</div> }
