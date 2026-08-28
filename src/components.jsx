import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Accessibility, ArrowRight, Check, ChevronLeft, ChevronRight, ExternalLink, Globe2, Menu, Plus, X } from 'lucide-react'
import { exams } from './data'
import { useApp } from './state/AppState'

export function Brand() {
  return <Link className="brand" to="/" aria-label="Citizen First home"><span className="brand-mark" aria-hidden="true">CF</span><span><strong>Citizen First</strong><small>NTA journey prototype</small></span></Link>
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
  return <header className="site-header"><div className="nav-shell"><Brand />
    <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
      {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <div className="mobile-only nav-extras"><button className="quiet-btn"><Globe2 size={18}/> English</button><button className="quiet-btn"><Accessibility size={18}/> Accessibility</button></div>
    </nav>
    <div className="nav-actions"><button className="icon-btn desktop-only" aria-label="Accessibility settings"><Accessibility size={19}/></button><button className="quiet-btn desktop-only"><Globe2 size={18}/> EN</button>
      {state.authenticated ? <button className="secondary-btn desktop-login" onClick={leave}>Sign out</button> : <Link className="primary-btn desktop-login" to="/login">Student login</Link>}
      <button className="icon-btn menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </div></header>
}

export function Footer() {
  return <footer className="footer"><div className="footer-inner"><div><Brand/><p>Independent hackathon prototype. Not affiliated with or endorsed by NTA or the Government of India.</p></div><div className="footer-links"><a href="https://nta.ac.in/" target="_blank" rel="noreferrer">Official NTA <ExternalLink size={14}/></a><Link to="/exams-by-category">All Exams</Link><Link to="/resources">Resources</Link><Link to="/about-prototype">About</Link><Link to="/help">Help</Link></div></div><div className="footer-bottom">© 2026 Citizen First prototype · All candidate data shown is simulated.</div></footer>
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
