// Import from comprehensive directory
import { ntaExams } from './nta-directory-data'

export const exams = ntaExams

export const ecosystem = [
  ['Ministry of Education', 'Education policy & programmes', 'https://www.education.gov.in/', 'MOE'],
  ['Digital India', 'Digital public services', 'https://www.digitalindia.gov.in/', 'DI'],
  ['DigiLocker', 'Secure document wallet', 'https://www.digilocker.gov.in/', 'DL'],
  ['JEE Main', 'Official exam portal', 'https://jeemain.nta.nic.in/', 'JEE'],
  ['NEET UG', 'Official exam portal', 'https://neet.nta.nic.in/', 'NEET'],
  ['CUET UG', 'Official exam portal', 'https://cuet.nta.nic.in/', 'CUET'],
]

export const getExam = (slugOrId) => exams.find((exam) => exam.id === slugOrId || exam.slug === slugOrId)
export const getSteps = (exam) => exam.steps || ['Profile review', 'Exam preferences', 'Documents', 'Review & payment']

// =============================================================
// Homepage data additions — used by redesigned Home only.
// Pure additions, no breaking changes to existing exports.
// =============================================================

// Hero promotional carousel slides
export const heroSlides = [
  {
    id: 'tiranga',
    eyebrow: 'Azadi Ka Amrit Mahotsav',
    title: 'Know Your Tiranga',
    subtitle: 'Honouring the tricolour and the spirit of a free India.',
    bg: 'tiranga',
    badge: '#MomentsWithTiranga'
  },
  {
    id: 'abhyas',
    eyebrow: 'National Test Abhyas',
    title: 'Practice. Perform. Progress.',
    subtitle: 'Official practice platform for NTA examinations across streams.',
    bg: 'abhyas',
    badge: 'Practice'
  },
  {
    id: 'jee-main',
    eyebrow: 'JEE (Main) 2026',
    title: 'Session 1 registration now open',
    subtitle: 'Apply online at the official JEE Main portal before the deadline.',
    bg: 'jee',
    badge: 'Engineering'
  },
  {
    id: 'cuet-ug',
    eyebrow: 'CUET (UG) 2026',
    title: 'Common University Entrance Test',
    subtitle: 'One test, multiple central and state universities across India.',
    bg: 'cuet',
    badge: 'University'
  }
]

// Latest news — realistic NTA-style announcements
export const latestNews = [
  {
    id: 'n1',
    title: 'Display of Final Answer Keys of UGC-NET June 2026 - reg.',
    date: '2026-08-22',
    type: 'Result'
  },
  {
    id: 'n2',
    title: 'Conduct of Re-Examination For Affected Candidates At Shri Satya Sai PG College, Jaipur',
    date: '2026-08-18',
    type: 'Notice'
  },
  {
    id: 'n3',
    title: 'Declaration of Results of the January 2026-Semester Exams of the courses held in Hybrid (CBT + Pen & Paper) Mode under SWAYAM',
    date: '2026-08-12',
    type: 'Result'
  },
  {
    id: 'n4',
    title: 'Release of Admit Cards for All India Ayush Post Graduate Entrance Test',
    date: '2026-08-08',
    type: 'Admit Card'
  },
  {
    id: 'n5',
    title: 'Extension of last date for submission of Online Application for UGC-NET June 2026',
    date: '2026-08-02',
    type: 'Notice'
  }
]

// Government / partner logos for the official ecosystem carousel
export const partnerLogos = [
  { name: 'Ministry of Education',         monogram: 'MoE',  color: '#0a2e5a', url: 'https://www.education.gov.in/' },
  { name: 'Digital India',                  monogram: 'DI',   color: '#138a72', url: 'https://www.digitalindia.gov.in/' },
  { name: 'data.gov.in',                    monogram: 'DGI',  color: '#1a4d8f', url: 'https://data.gov.in/' },
  { name: 'MyGov',                          monogram: 'MG',   color: '#cf3a3a', url: 'https://mygov.in/' },
  { name: 'Ministry of Health & Family Welfare', monogram: 'MoHFW', color: '#1f7a4d', url: 'https://www.mohfw.gov.in/' },
  { name: 'DigiLocker',                     monogram: 'DL',   color: '#2b6cb0', url: 'https://www.digilocker.gov.in/' },
  { name: 'UMANG',                          monogram: 'UMG',  color: '#d97706', url: 'https://web.umang.gov.in/' },
  { name: 'NCERT',                          monogram: 'NCE',  color: '#7c3aed', url: 'https://ncert.nic.in/' }
]

// Examination showcase for the auto-sliding exam card carousel
export const examinationShowcase = [
  {
    id: 'swayam',
    name: 'SWAYAM',
    category: 'MOOC',
    description: 'MOOC / SWAYAM Examination',
    monogram: 'SWY',
    color: '#1f7a4d',
    url: 'https://swayam.gov.in/'
  },
  ...exams
    .filter(e => ['jee-main', 'neet-ug', 'cuet-ug', 'ugc-net', 'csir-net'].includes(e.id))
    .map(e => ({
      id: e.id,
      name: e.shortName,
      category: e.domain,
      description: e.name,
      monogram: e.shortName.replace(/[^A-Z]/g, '').slice(0, 3) || e.shortName.slice(0, 3).toUpperCase(),
      color: e.color,
      url: e.officialUrl
    }))
]
