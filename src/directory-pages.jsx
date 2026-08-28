import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle, ArrowRight, BookOpen, Briefcase, Building, Calendar, CheckCircle2,
  Cog, CreditCard, ExternalLink, FileCheck2, FileSearch, FileText, Globe,
  GraduationCap, Heart, HelpCircle, Home, Info, LogIn, Palette, Phone,
  PlayCircle, Scale, Search, ShieldCheck, Smartphone, Star, Users
} from 'lucide-react'
import { Footer, Header, ExternalAnchor, Status } from './components'
import { ntaExams, ntaResources, examCategories, getExamsByDomain } from './nta-directory-data'

const iconMap = {
  Home, Info, Phone, PlayCircle, BookOpen, HelpCircle, FileCheck2, ShieldCheck,
  LogIn, AlertCircle, CreditCard, FileText, Smartphone, Globe, Building, FileSearch,
  Briefcase, Users, Cog, Heart, GraduationCap, Scale, Palette, Star, Calendar
}

function PublicLayout({ children }) {
  return (
    <div className="public-page">
      <Header />
      <main className="public-main">{children}</main>
      <Footer />
    </div>
  )
}

export function ResourceDirectory() {
  const [activeCategory, setActiveCategory] = useState('all')

  const allResources = [
    ...ntaResources.main,
    ...ntaResources.practice,
    ...ntaResources.results,
    ...ntaResources.support,
    ...ntaResources.digital,
    ...ntaResources.transparency,
  ]

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'Main Portal', name: 'Main Portal' },
    { id: 'Practice Tools', name: 'Practice Tools' },
    { id: 'Results & Verification', name: 'Results & Verification' },
    { id: 'Support Services', name: 'Support Services' },
    { id: 'Digital Infrastructure', name: 'Digital Infrastructure' },
    { id: 'Transparency & Policy', name: 'Transparency & Policy' },
  ]

  const filtered = activeCategory === 'all'
    ? allResources
    : allResources.filter(r => r.category === activeCategory)

  return (
    <PublicLayout>
      <div className="public-title">
        <span className="eyebrow">Official resources</span>
        <h1>Complete NTA URL Directory</h1>
        <p>Comprehensive collection of official NTA portals, practice tools, and government services. All links lead to authentic sources.</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={activeCategory === cat.id ? 'primary-btn small' : 'secondary-btn small'}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '16px',
        maxWidth: '1184px',
        margin: '0 auto'
      }}>
        {filtered.map((resource, idx) => {
          const Icon = iconMap[resource.icon] || FileText
          return (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '20px',
                textDecoration: 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#edf3ff',
                  color: 'var(--blue)',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <Icon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--blue)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                    {resource.category}
                  </div>
                  <h3 style={{ fontSize: '16px', margin: '4px 0 0', fontFamily: 'Manrope, sans-serif' }}>
                    {resource.title}
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                {resource.description}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--blue)',
                fontSize: '12px',
                fontWeight: 700,
                marginTop: 'auto'
              }}>
                Open official resource <ExternalLink size={14} />
              </div>
            </a>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p>No resources found in this category.</p>
        </div>
      )}
    </PublicLayout>
  )
}

export function ExamsByCategory() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = ntaExams.filter(exam => {
    const matchesSearch = searchQuery === '' ||
      `${exam.name} ${exam.shortName} ${exam.domain} ${exam.purpose}`.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'all' ||
      getExamsByDomain(exam.domain) === selectedCategory

    return matchesSearch && matchesCategory
  })

  const groupedExams = examCategories.map(category => ({
    ...category,
    exams: filtered.filter(exam => getExamsByDomain(exam.domain) === category.id)
  })).filter(cat => cat.exams.length > 0)

  return (
    <PublicLayout>
      <div className="public-title">
        <span className="eyebrow">Complete examination catalog</span>
        <h1>All NTA Examinations by Category</h1>
        <p>Browse {ntaExams.length} examinations organized by domain. Each exam links to its official portal for authoritative information.</p>
      </div>

      <label className="search-field standalone">
        <Search />
        <span className="sr-only">Search examinations</span>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by exam name, domain, or purpose…"
        />
      </label>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          className={selectedCategory === 'all' ? 'primary-btn small' : 'secondary-btn small'}
        >
          All Categories ({ntaExams.length})
        </button>
        {examCategories.map(cat => {
          const count = ntaExams.filter(e => getExamsByDomain(e.domain) === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={selectedCategory === cat.id ? 'primary-btn small' : 'secondary-btn small'}
            >
              {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {selectedCategory === 'all' ? (
        groupedExams.map(category => (
          <section key={category.id} style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '24px', margin: '0 0 6px' }}>{category.name}</h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                {category.exams.length} examination{category.exams.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="exam-grid">
              {category.exams.map(exam => (
                <ExamDirectoryCard key={exam.id} exam={exam} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="exam-grid">
          {filtered.map(exam => (
            <ExamDirectoryCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h3>No examinations found</h3>
          <p style={{ color: 'var(--muted)' }}>Try adjusting your search or category filter.</p>
        </div>
      )}
    </PublicLayout>
  )
}

function ExamDirectoryCard({ exam }) {
  return (
    <article className="panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '19px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '14px', marginBottom: '12px' }}>
          <div
            className="exam-symbol"
            style={{
              background: `${exam.color}18`,
              color: exam.color,
              width: '42px',
              height: '42px'
            }}
          >
            {exam.shortName.slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Status value={exam.registrationStatus} />
              <span style={{ fontSize: '10px', color: '#738096' }}>{exam.level}</span>
            </div>
            <h3 style={{ fontSize: '18px', margin: '0 0 6px', fontFamily: 'Manrope, sans-serif' }}>
              {exam.shortName}
            </h3>
            <p style={{ fontSize: '10px', color: 'var(--muted)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600 }}>
              {exam.domain}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
              {exam.purpose}
            </p>
          </div>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid var(--line)',
        padding: '12px 19px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <a
          href={exam.officialUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--blue)',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          Official portal <ExternalLink size={14} />
        </a>
        <Link
          to={`/exam-detail/${exam.slug}`}
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--navy)',
            textDecoration: 'none'
          }}
        >
          View details →
        </Link>
      </div>
    </article>
  )
}

export function ExamDetail() {
  const { examSlug } = useParams()
  const exam = ntaExams.find(e => e.slug === examSlug)

  if (!exam) {
    return (
      <PublicLayout>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h1>Examination not found</h1>
          <Link to="/exams-by-category" className="primary-btn" style={{ marginTop: '20px' }}>
            Browse all exams
          </Link>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link className="back-link" to="/exams-by-category" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px', color: '#5b6980', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
          ← Back to all exams
        </Link>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Status value={exam.registrationStatus} />
            <span style={{ fontSize: '11px', color: '#738096', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
              {exam.level} · {exam.domain}
            </span>
          </div>
          <h1 style={{ fontSize: '42px', margin: '0 0 16px', lineHeight: 1.1 }}>{exam.name}</h1>
          <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
            {exam.purpose}
          </p>
        </div>

        <div className="panel" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                Official Examination Portal
              </span>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '6px 0 0' }}>
                For registration, schedules, admit cards, and results
              </p>
            </div>
            <a
              href={exam.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              Visit official portal <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {exam.nextDate && exam.nextLabel && (
          <section className="milestone-banner" style={{ marginBottom: '20px' }}>
            <div>
              <span className="mini-label">
                <Calendar size={15} /> UPCOMING MILESTONE
              </span>
              <h3>{exam.nextLabel}</h3>
              <p>{new Date(exam.nextDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="countdown">
              <strong>{Math.max(0, Math.ceil((new Date(exam.nextDate) - new Date()) / 86400000))}</strong>
              <span>days to go</span>
            </div>
          </section>
        )}

        {exam.steps && (
          <section className="panel" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '18px' }}>Application Steps</h3>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {exam.steps.map((step, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderTop: idx > 0 ? '1px solid #edf0f4' : 'none'
                }}>
                  <span style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: '#edf3ff',
                    color: 'var(--blue)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '12px',
                    fontWeight: 800
                  }}>
                    {idx + 1}
                  </span>
                  <strong style={{ fontSize: '14px' }}>{step}</strong>
                </li>
              ))}
            </ol>
          </section>
        )}

        {exam.notices && exam.notices.length > 0 && (
          <section className="panel" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '18px' }}>Recent Announcements</h3>
            {exam.notices.map((notice, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '14px',
                padding: '14px 0',
                borderTop: idx > 0 ? '1px solid #edf0f4' : 'none'
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9px',
                  background: notice.urgent ? '#fff0df' : '#edf3ff',
                  color: notice.urgent ? '#a76109' : 'var(--blue)',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <AlertCircle size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                      {notice.type}
                    </span>
                    <span style={{ fontSize: '10px', color: '#8a95a6' }}>{notice.date}</span>
                  </div>
                  <strong style={{ fontSize: '14px', display: 'block' }}>{notice.title}</strong>
                </div>
              </div>
            ))}
          </section>
        )}

        {exam.resources && exam.resources.length > 0 && (
          <section className="panel" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '18px' }}>Practice Resources</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {exam.resources.map((resource, idx) => (
                <div key={idx} style={{
                  padding: '14px',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileText size={18} style={{ color: 'var(--blue)' }} />
                    <strong style={{ fontSize: '14px' }}>{resource}</strong>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Sample resource</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {exam.centers && exam.centers.length > 0 && (
          <section className="panel">
            <h3 style={{ fontSize: '20px', marginBottom: '18px' }}>Sample Test Centers</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
              Example centers only. Final allocation appears on your official admit card.
            </p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {exam.centers.map((center, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderTop: idx > 0 ? '1px solid #edf0f4' : 'none'
                }}>
                  <span style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#edf3ff',
                    color: 'var(--blue)',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'grid',
                    placeItems: 'center'
                  }}>
                    {idx + 1}
                  </span>
                  <div>
                    <strong style={{ fontSize: '12px', display: 'block' }}>{center}</strong>
                    <small style={{ fontSize: '10px', color: '#8692a4' }}>
                      {(3.2 + idx * 2.7).toFixed(1)} km sample distance
                    </small>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </PublicLayout>
  )
}

// Import useParams at the top
import { useParams } from 'react-router-dom'
