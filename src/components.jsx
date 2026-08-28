import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Accessibility, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock, ExternalLink, Globe2, Menu, Plus, UserRound, X } from 'lucide-react'
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
    <small><CalendarDays size={16}/> {formatDate(now)}</small>
    <strong><Clock size={15}/> {formatTime(now)} IST</strong>
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
      {state.authenticated
        ? <button className="secondary-btn desktop-login" onClick={leave}>Sign out <ArrowRight size={15}/></button>
        : <Link className="primary-btn desktop-login" to="/login"><UserRound size={15}/> Sign In / Login <ArrowRight size={15}/></Link>}
      <button className="icon-btn menu-btn nta-menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </div></header>
}

export function Footer() {
  return <footer className="footer"><div className="footer-inner"><div><Brand/><p>National Testing Agency interface redesign concept for a clearer, official examination services experience.</p></div><div className="footer-links"><a href="https://nta.ac.in/" target="_blank" rel="noreferrer">Official NTA <ExternalLink size={14}/></a><Link to="/exams-by-category">All Exams</Link><Link to="/resources">Resources</Link><Link to="/about-us">About</Link><Link to="/help">Help</Link></div></div><div className="footer-bottom">© 2026 National Testing Agency. Interface prototype for demonstration.</div></footer>
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
