import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertCircle, ArrowRight, Award, BookOpen, Briefcase, Building, Calendar,
  CheckCircle2, Download, ExternalLink, FileText, Globe, GraduationCap,
  Heart, HelpCircle, Home, Info, Mail, MapPin, Megaphone, Phone, Search,
  Shield, Target, Users, Clock, FileSearch, Scale, Eye, Landmark
} from 'lucide-react'
import { Footer, Header, ExternalAnchor } from './components'

function PublicLayout({ children }) {
  return (
    <div className="public-page">
      <Header />
      <main className="public-main">{children}</main>
      <Footer />
    </div>
  )
}

function downloadPrototypeFile(title, body) {
  const blob = new Blob([`${title}\n\n${body}\n\nPrototype document — verify all information on the linked official NTA portal.`], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`
  anchor.click()
  URL.revokeObjectURL(url)
}

// ABOUT US PAGE
export function AboutUs() {
  const { section = 'about' } = useParams()
  const sections = [
    ['about', 'About NTA', Home], ['vision', 'Vision & Mission', Eye], ['objectives', 'Objectives', Target],
    ['functions', 'Functions', CheckCircle2], ['governing-body', 'Governing Body', Users]
  ]
  const detail = {
    vision: ['Vision & Mission', 'A fair, trusted and technology-led national assessment system.', ['Deliver valid and reliable assessments', 'Use modern technology and international best practices', 'Make candidate journeys transparent and accessible']],
    objectives: ['Key Objectives', 'The outcomes NTA is designed to deliver across the assessment lifecycle.', ['Create uniform examination standards', 'Strengthen question design and psychometrics', 'Improve security, transparency and candidate service', 'Build reusable digital examination infrastructure']],
    functions: ['Functions of NTA', 'Core institutional responsibilities of the testing agency.', ['Plan and deliver computer-based examinations', 'Publish notices, answer keys and scorecards', 'Coordinate test centres and candidate support', 'Conduct research in assessment and evaluation']],
    'governing-body': ['Governing Body', 'Institutional oversight and accountability.', ['Chairperson and domain experts', 'Representatives of the Ministry of Education', 'Academic, administrative and technology leadership', 'Transparent review of policy and operations']]
  }[section]
  return (
    <PublicLayout>
      <div className="public-title">
        <span className="eyebrow">About the organization</span>
        <h1>National Testing Agency</h1>
        <p>Premier testing organization for conducting efficient, transparent and international standards-based examinations for admissions to higher education institutions.</p>
      </div>

      <div className="institution-layout">
        <aside className="institution-sidebar" aria-label="About NTA sections"><h2>About Us</h2>{sections.map(([id,label,Icon]) => <Link key={id} className={section === id ? 'active' : ''} to={id === 'about' ? '/about-us' : `/about-us/${id}`}><Icon size={17}/>{label}<ArrowRight size={14}/></Link>)}</aside>
        <div className="institution-content">
        {detail ? <>
          <section className="panel institution-detail"><span className="institution-icon"><Info size={25}/></span><div><span className="eyebrow">Institutional profile</span><h2>{detail[0]}</h2><p>{detail[1]}</p></div></section>
          <section className="panel"><h3>At a glance</h3><ul className="official-check-list">{detail[2].map(item => <li key={item}><CheckCircle2 size={19}/><span>{item}</span></li>)}</ul><ExternalAnchor href="https://www.nta.ac.in/About" className="primary-btn">View official information</ExternalAnchor></section>
        </> : <>
        <section className="panel" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'start', marginBottom: '24px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'var(--blue-soft)',
              color: 'var(--blue)',
              display: 'grid',
              placeItems: 'center'
            }}>
              <Info size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '28px', margin: '0 0 12px' }}>About NTA</h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                The National Testing Agency (NTA) is an autonomous and self-sustained premier testing organization under the Department of Higher Education, Ministry of Education (MoE), Government of India. It has been established to conduct entrance examinations for admission/fellowship in higher educational institutions.
              </p>
            </div>
          </div>
        </section>

        <div className="about-grid" style={{ marginBottom: '32px' }}>
          <section className="panel">
            <Target size={32} style={{ color: 'var(--blue)' }} />
            <h2>Vision</h2>
            <p>To be the world's premier testing organization with unmatched excellence in the conduct of fair, valid, and reliable examinations.</p>
          </section>

          <section className="panel">
            <Eye size={32} style={{ color: 'var(--blue)' }} />
            <h2>Mission</h2>
            <p>To conduct high-quality entrance examinations using cutting-edge technology, international best practices, and ensuring transparency and efficiency.</p>
          </section>

          <section className="panel">
            <Award size={32} style={{ color: 'var(--blue)' }} />
            <h2>Excellence</h2>
            <p>Setting national standards for testing with international quality benchmarks, leveraging modern infrastructure and technology.</p>
          </section>
        </div>

        <section className="panel" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '18px' }}>Key Objectives</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Conduct efficient, transparent, and international standard examinations',
              'Implement uniform examination norms and standards',
              'Ensure assessment quality through rigorous research and development',
              'Maintain transparency in testing processes and results',
              'Deploy advanced information and communication technology',
              'Develop expertise in test creation, delivery, and psychometrics'
            ].map((objective, idx) => (
              <li key={idx} style={{
                display: 'flex',
                gap: '12px',
                padding: '14px 0',
                borderTop: idx > 0 ? '1px solid #edf0f4' : 'none'
              }}>
                <CheckCircle2 size={20} style={{ color: 'var(--green)', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', lineHeight: 1.6 }}>{objective}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '18px' }}>Examinations Conducted</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              'Joint Entrance Examination (JEE Main)',
              'National Eligibility cum Entrance Test (NEET)',
              'Common University Entrance Test (CUET)',
              'University Grants Commission NET (UGC-NET)',
              'CSIR-UGC NET',
              'ICAR AIEEA',
              'Common Management Admission Test (CMAT)',
              'And many more national-level examinations'
            ].map((exam, idx) => (
              <div key={idx} style={{
                padding: '12px',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <GraduationCap size={16} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                <span>{exam}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3 style={{ fontSize: '22px', marginBottom: '18px' }}>Organizational Structure</h3>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '16px' }}>
            NTA is registered as a society under the Societies Registration Act, 1860. It operates under the Department of Higher Education, Ministry of Education.
          </p>
          <ExternalAnchor href="https://www.nta.ac.in/about" className="primary-btn">
            Visit official About page
          </ExternalAnchor>
        </section>
        </>}
        </div>
      </div>
    </PublicLayout>
  )
}

// RTI PAGE
export function RTI() {
  const [searchQuery, setSearchQuery] = useState('')

  const rtiSections = [
    {
      title: 'Right to Information Act, 2005',
      description: 'Complete information about RTI Act and how to file applications',
      icon: Scale,
      color: '#2d7385', href: 'https://www.nta.ac.in/RTI'
    },
    {
      title: 'RTI Application Form',
      description: 'Download and submit RTI application to NTA',
      icon: FileText,
      color: '#3467d6', href: 'https://www.nta.ac.in/RTI'
    },
    {
      title: 'Public Information Officers',
      description: 'Contact details of PIOs and Appellate Authorities',
      icon: Users,
      color: '#168769', href: 'https://www.nta.ac.in/RTI/Officers'
    },
    {
      title: 'Suo Moto Disclosures',
      description: 'Information disclosed proactively under Section 4(1)(b)',
      icon: Eye,
      color: '#7656bd', href: 'https://www.nta.ac.in/RTI/SuoMoto'
    },
    {
      title: 'RTI Applications Status',
      description: 'Track your RTI application status online',
      icon: Search,
      color: '#8a4b63', href: 'https://rtionline.gov.in/'
    },
    {
      title: 'RTI Fees & Payment',
      description: 'Information on RTI application fees and payment methods',
      icon: FileSearch,
      color: '#8b4513', href: 'https://rtionline.gov.in/'
    }
  ]

  return (
    <PublicLayout>
      <div className="public-title">
        <span className="eyebrow">Transparency & Accountability</span>
        <h1>Right to Information (RTI)</h1>
        <p>Access to information under the Right to Information Act, 2005. NTA is committed to transparency and citizen empowerment.</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <section className="panel" style={{ marginBottom: '28px', background: '#eaf1ff', borderColor: '#cfdcf5' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
            <Shield size={42} style={{ color: 'var(--blue)', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '20px', margin: '0 0 8px' }}>What is RTI?</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                The Right to Information Act empowers citizens to seek information from public authorities, making the Government and its agencies more accountable and transparent. Any citizen can request information from NTA regarding its functions, operations, and decision-making processes.
              </p>
            </div>
          </div>
        </section>

        <div className="rti-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {rtiSections.map((section, idx) => {
            const Icon = section.icon
            return (
              <article key={idx} className="panel" style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '22px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '11px',
                  background: `${section.color}18`,
                  color: section.color,
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: '16px'
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '17px', margin: '0 0 8px', fontFamily: 'Manrope, sans-serif' }}>
                  {section.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {section.description}
                </p>
                <ExternalAnchor href={section.href} className="secondary-btn small" style={{ marginTop: 'auto' }}>
                  Learn more <ArrowRight size={15} />
                </ExternalAnchor>
              </article>
            )
          })}
        </div>

        <section className="panel">
          <h3 style={{ fontSize: '22px', marginBottom: '18px' }}>How to File an RTI Application</h3>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { step: 'Draft your application', desc: 'Clearly state the information you seek from NTA' },
              { step: 'Address to the PIO', desc: 'Submit to the Public Information Officer of NTA' },
              { step: 'Pay the prescribed fee', desc: 'RTI application fee as per government norms' },
              { step: 'Submit application', desc: 'Online or offline submission as per guidelines' },
              { step: 'Track your application', desc: 'Monitor status and receive response within 30 days' }
            ].map((item, idx) => (
              <li key={idx} style={{
                display: 'flex',
                gap: '16px',
                padding: '16px 0',
                borderTop: idx > 0 ? '1px solid #edf0f4' : 'none'
              }}>
                <span style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--blue-soft)',
                  color: 'var(--blue)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '13px',
                  fontWeight: 800,
                  flexShrink: 0
                }}>
                  {idx + 1}
                </span>
                <div>
                  <strong style={{ fontSize: '15px', display: 'block', marginBottom: '4px' }}>{item.step}</strong>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{item.desc}</span>
                </div>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
            <ExternalAnchor href="https://www.nta.ac.in/RTI" className="primary-btn">
              Visit official RTI portal
            </ExternalAnchor>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}

// TENDER PAGE
export function Tender() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const tenders = [
    {
      title: 'Supply of Computer-Based Test Infrastructure',
      refNo: 'NTA/TENDER/2026/001',
      date: '15 August 2026',
      deadline: '15 September 2026',
      status: 'Open',
      category: 'Infrastructure'
    },
    {
      title: 'Printing and Dispatch of Admit Cards',
      refNo: 'NTA/TENDER/2026/002',
      date: '10 August 2026',
      deadline: '25 August 2026',
      status: 'Closing Soon',
      category: 'Services'
    },
    {
      title: 'Development of Online Examination Platform',
      refNo: 'NTA/TENDER/2026/003',
      date: '05 August 2026',
      deadline: '20 August 2026',
      status: 'Open',
      category: 'IT Services'
    },
    {
      title: 'Security and Surveillance Systems',
      refNo: 'NTA/TENDER/2026/004',
      date: '01 August 2026',
      deadline: '10 September 2026',
      status: 'Open',
      category: 'Security'
    },
    {
      title: 'Question Paper Setting and Evaluation',
      refNo: 'NTA/TENDER/2026/005',
      date: '28 July 2026',
      deadline: '05 September 2026',
      status: 'Archived',
      category: 'Academic'
    }
  ]
  const filteredTenders = filter === 'All' ? tenders : tenders.filter(t => filter === 'Closed' ? t.status === 'Closed' || t.status === 'Closing Soon' : t.status === filter)

  return (
    <PublicLayout>
      <div className="public-title">
        <span className="eyebrow">Procurement & Contracts</span>
        <h1>Tenders & Procurements</h1>
        <p>Current and archived tender notices, procurement opportunities, and bidding information for vendors and service providers.</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="panel" style={{ marginBottom: '24px', background: '#fff7e8', borderColor: '#f0d39e' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'start' }}>
            <AlertCircle size={36} style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '15px', display: 'block', marginBottom: '6px' }}>Important Notice</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                All tender documents are sample data for this prototype. For actual tender notifications and participation, please visit the official NTA procurement portal at <a href="https://www.nta.ac.in/Tender" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)', fontWeight: 700 }}>nta.ac.in/Tender</a>
              </p>
            </div>
          </div>
        </div>

        <div className="official-filter-tabs" role="tablist" aria-label="Filter tenders">
          {['All','Open','Closed','Archived'].map(label => <button key={label} role="tab" aria-selected={filter === label} onClick={() => setFilter(label)} className={filter === label ? 'primary-btn small' : 'secondary-btn small'}>{label === 'All' ? 'All Tenders' : label} ({label === 'All' ? tenders.length : tenders.filter(t => label === 'Closed' ? t.status === 'Closed' || t.status === 'Closing Soon' : t.status === label).length})</button>)}
        </div>

        {filteredTenders.map((tender, idx) => (
          <article key={idx} className="panel" style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '18px', alignItems: 'start' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '11px',
                background: '#eef3fb',
                color: 'var(--blue)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0
              }}>
                <Briefcase size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span className={`status ${tender.status === 'Open' ? 'open' : tender.status === 'Closing Soon' ? 'upcoming' : 'closed'}`}>
                    {tender.status}
                  </span>
                  <span style={{ fontSize: '11px', color: '#738096', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                    {tender.category}
                  </span>
                  <span style={{ fontSize: '11px', color: '#8a95a6' }}>Ref: {tender.refNo}</span>
                </div>
                <h3 style={{ fontSize: '19px', margin: '0 0 8px', fontFamily: 'Manrope, sans-serif' }}>
                  {tender.title}
                </h3>
                <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--muted)', marginBottom: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={15} /> Published: {tender.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={15} /> Deadline: {tender.deadline}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="secondary-btn small" onClick={() => downloadPrototypeFile(tender.title, `${tender.refNo}\nPublished: ${tender.date}\nDeadline: ${tender.deadline}`)}>
                    <Download size={15} /> Download document
                  </button>
                  <button className="secondary-btn small" aria-expanded={expanded === tender.refNo} onClick={() => setExpanded(expanded === tender.refNo ? null : tender.refNo)}>
                    View details <ArrowRight size={15} />
                  </button>
                </div>
                {expanded === tender.refNo && <div className="tender-expanded"><strong>Prototype procurement summary</strong><p>This simulated listing demonstrates the information hierarchy, lifecycle state, deadline and document access pattern. Confirm eligibility and the complete scope on the official portal before taking any action.</p></div>}
              </div>
            </div>
          </article>
        ))}

        <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '32px', borderTop: '1px solid var(--line)' }}>
          <ExternalAnchor href="https://www.nta.ac.in/Tender" className="primary-btn">
            Visit official tender portal
          </ExternalAnchor>
        </div>
      </div>
    </PublicLayout>
  )
}

// DOWNLOADS PAGE
export function Downloads() {
  const [activeCategory, setActiveCategory] = useState('all')

  const downloadCategories = [
    { id: 'all', name: 'All Downloads' },
    { id: 'bulletins', name: 'Information Bulletins' },
    { id: 'forms', name: 'Application Forms' },
    { id: 'syllabi', name: 'Syllabi' },
    { id: 'papers', name: 'Sample Papers' },
    { id: 'reports', name: 'Reports' },
    { id: 'guidelines', name: 'Guidelines' }
  ]

  const downloads = [
    { title: 'JEE Main 2026 Information Bulletin', category: 'bulletins', exam: 'JEE Main', size: '2.4 MB', date: '10 Aug 2026' },
    { title: 'NEET UG 2026 Information Bulletin', category: 'bulletins', exam: 'NEET UG', size: '3.1 MB', date: '08 Aug 2026' },
    { title: 'CUET UG Application Form', category: 'forms', exam: 'CUET UG', size: '450 KB', date: '15 Aug 2026' },
    { title: 'JEE Main Syllabus 2026', category: 'syllabi', exam: 'JEE Main', size: '1.8 MB', date: '05 Aug 2026' },
    { title: 'NEET UG Sample Paper - Biology', category: 'papers', exam: 'NEET UG', size: '890 KB', date: '12 Aug 2026' },
    { title: 'UGC-NET Information Bulletin', category: 'bulletins', exam: 'UGC-NET', size: '2.7 MB', date: '07 Aug 2026' },
    { title: 'NTA Annual Report 2025-26', category: 'reports', exam: 'General', size: '5.2 MB', date: '01 Aug 2026' },
    { title: 'Exam Centre Guidelines for Candidates', category: 'guidelines', exam: 'General', size: '650 KB', date: '18 Aug 2026' },
    { title: 'CMAT 2026 Syllabus', category: 'syllabi', exam: 'CMAT', size: '1.2 MB', date: '14 Aug 2026' },
    { title: 'Document Upload Guidelines', category: 'guidelines', exam: 'General', size: '780 KB', date: '16 Aug 2026' },
    { title: 'CUET PG Sample Paper', category: 'papers', exam: 'CUET PG', size: '1.5 MB', date: '09 Aug 2026' },
    { title: 'JEE Main Previous Year Paper 2025', category: 'papers', exam: 'JEE Main', size: '2.1 MB', date: '03 Aug 2026' }
  ]

  const filtered = activeCategory === 'all'
    ? downloads
    : downloads.filter(d => d.category === activeCategory)

  return (
    <PublicLayout>
      <div className="public-title">
        <span className="eyebrow">Resources & Documents</span>
        <h1>Downloads</h1>
        <p>Information bulletins, application forms, syllabi, sample papers, and official guidelines for all NTA examinations.</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px', justifyContent: 'center' }}>
          {downloadCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={activeCategory === cat.id ? 'primary-btn small' : 'secondary-btn small'}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {filtered.map((item, idx) => (
            <article key={idx} className="panel" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 22px',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: '#edf3ff',
                  color: 'var(--blue)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '15px', display: 'block', marginBottom: '5px' }}>
                    {item.title}
                  </strong>
                  <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: 'var(--muted)' }}>
                    <span>{item.exam}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              <button className="secondary-btn small" onClick={() => downloadPrototypeFile(item.title, `${item.exam}\nPublished: ${item.date}\nDisplay size: ${item.size}`)}>
                <Download size={16} /> Download
              </button>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p>No downloads found in this category.</p>
          </div>
        )}

        <div style={{ marginTop: '32px', padding: '24px', background: '#f9fbfe', borderRadius: '12px', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'start' }}>
            <Info size={24} style={{ color: 'var(--blue)', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Sample Documents</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                All downloads shown are simulated for this prototype. For official information bulletins, forms, and documents, visit the respective examination portals or the main NTA downloads section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

// CONTACT US PAGE
export function ContactUs() {
  const [selectedTopic, setSelectedTopic] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const contactMethods = [
    {
      title: 'Email Support',
      icon: Mail,
      color: '#3467d6',
      details: ['General: info@nta.ac.in', 'Technical: tech.support@nta.ac.in', 'Grievance: grievance@nta.ac.in'],
      action: 'Send email', href: 'mailto:genadmin@nta.ac.in'
    },
    {
      title: 'Phone Support',
      icon: Phone,
      color: '#168769',
      details: ['Helpline: 011-4075 9000', 'Monday to Friday', '10:00 AM - 5:00 PM'],
      action: 'Call now', href: 'tel:01169227700'
    },
    {
      title: 'Head Office',
      icon: Building,
      color: '#7656bd',
      details: ['National Testing Agency', 'Plot No. 27, Sector 20', 'Dwarka, New Delhi - 110077'],
      action: 'Get directions', href: 'https://maps.google.com/?q=National+Testing+Agency+New+Delhi'
    },
    {
      title: 'Online Grievance',
      icon: HelpCircle,
      color: '#8a4b63',
      details: ['Submit complaints online', 'Track grievance status', 'Resolution within 30 days'],
      action: 'File grievance', href: 'https://www.nta.ac.in/ContactUs'
    }
  ]

  const examContacts = [
    { exam: 'JEE Main', email: 'jeemain@nta.ac.in', phone: '011-4089 2706' },
    { exam: 'NEET UG', email: 'neet@nta.ac.in', phone: '011-4089 2700' },
    { exam: 'CUET UG', email: 'cuet-ug@nta.ac.in', phone: '011-4089 2710' },
    { exam: 'CUET PG', email: 'cuet-pg@nta.ac.in', phone: '011-4089 2715' },
    { exam: 'UGC-NET', email: 'ugcnet@nta.ac.in', phone: '011-4089 2750' },
    { exam: 'CSIR-NET', email: 'csirnet@nta.ac.in', phone: '011-4089 2755' }
  ]

  return (
    <PublicLayout>
      <div className="public-title">
        <span className="eyebrow">Get in touch</span>
        <h1>Contact Us</h1>
        <p>Multiple channels to reach NTA for queries, technical support, and grievance redressal. We're here to help.</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="contact-method-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px', marginBottom: '32px' }}>
          {contactMethods.map((method, idx) => {
            const Icon = method.icon
            return (
              <article key={idx} className="panel" style={{ padding: '24px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: `${method.color}18`,
                  color: method.color,
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: '16px'
                }}>
                  <Icon size={26} />
                </div>
                <h3 style={{ fontSize: '19px', margin: '0 0 12px', fontFamily: 'Manrope, sans-serif' }}>
                  {method.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px' }}>
                  {method.details.map((detail, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--muted)', padding: '4px 0' }}>
                      {detail}
                    </li>
                  ))}
                </ul>
                <a className="secondary-btn small" href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {method.action} <ArrowRight size={15} />
                </a>
              </article>
            )
          })}
        </div>

        <section className="panel" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '18px' }}>Exam-Specific Contact</h3>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px' }}>
            For queries related to specific examinations, use these dedicated contact channels:
          </p>
          <div style={{ display: 'grid', gap: '10px' }}>
            {examContacts.map((contact, idx) => (
              <div key={idx} className="exam-contact-row" style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr 1fr',
                gap: '16px',
                padding: '14px 16px',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                alignItems: 'center'
              }}>
                <strong style={{ fontSize: '14px' }}>{contact.exam}</strong>
                <span style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={15} /> {contact.email}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={15} /> {contact.phone}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3 style={{ fontSize: '22px', marginBottom: '18px' }}>Send us a Message</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4b5870' }}>Your Name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your full name"
                style={{
                  height: '46px',
                  border: '1px solid #cfd8e5',
                  borderRadius: '8px',
                  padding: '0 13px',
                  fontSize: '14px'
                }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4b5870' }}>Email Address</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your.email@example.com"
                style={{
                  height: '46px',
                  border: '1px solid #cfd8e5',
                  borderRadius: '8px',
                  padding: '0 13px',
                  fontSize: '14px'
                }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4b5870' }}>Select Topic</span>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                style={{
                  height: '46px',
                  border: '1px solid #cfd8e5',
                  borderRadius: '8px',
                  padding: '0 13px',
                  fontSize: '14px'
                }}
              >
                <option value="">Choose a topic</option>
                <option value="technical">Technical Support</option>
                <option value="application">Application Related</option>
                <option value="payment">Payment Issues</option>
                <option value="admit-card">Admit Card</option>
                <option value="results">Results & Scorecards</option>
                <option value="other">Other Queries</option>
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4b5870' }}>Your Message</span>
              <textarea
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your query in detail..."
                rows="5"
                style={{
                  border: '1px solid #cfd8e5',
                  borderRadius: '8px',
                  padding: '13px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </label>
            <button type="submit" className="primary-btn" style={{ alignSelf: 'flex-start' }}>
              Submit message <ArrowRight size={17} />
            </button>
            {submitted && <div className="prototype-success" role="status"><CheckCircle2 size={20}/><div><strong>Message captured in this prototype</strong><span>No message was sent. For real support, use the official NTA contact channel linked below.</span></div></div>}
          </form>
        </section>

        <div className="panel" style={{ marginTop: '24px', background: '#f9fbfe' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'start' }}>
            <Info size={24} style={{ color: 'var(--blue)', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Prototype Note</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                This is a demonstration contact form. For actual support, visit <ExternalAnchor href="https://www.nta.ac.in/ContactUs">nta.ac.in/ContactUs</ExternalAnchor> or use the official helpline numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
