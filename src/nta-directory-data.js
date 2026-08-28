// Comprehensive NTA URL Directory Data

export const ntaExams = [
  // Engineering & Technology
  { id: 'jee-main', slug: 'jee-main', name: 'Joint Entrance Examination (Main)', shortName: 'JEE Main', domain: 'Engineering', level: 'Undergraduate', purpose: 'Admission to NITs, IIITs and other engineering programmes.', officialUrl: 'https://jeemain.nta.nic.in/', registrationStatus: 'open', color: '#3467d6', nextDate: '2026-10-18', nextLabel: 'Session 1 registration closes', notices: [{ type: 'Schedule', date: '18 Aug 2026', title: 'Sample examination calendar for Session 1', urgent: true }, { type: 'Advisory', date: '12 Aug 2026', title: 'Image upload guidance for candidates' }], resources: ['CBT sample paper', 'Previous paper: Paper 1', 'Syllabus overview'], centers: ['Sion Digital Centre, Mumbai', 'Sector 62 Test Centre, Noida', 'Taramani Assessment Hub, Chennai'], steps: ['Personal details', 'Academic details', 'Exam preferences', 'Documents', 'Review & payment'] },

  { id: 'jee-advanced', slug: 'jee-advanced', name: 'Joint Entrance Examination (Advanced)', shortName: 'JEE Advanced', domain: 'Engineering', level: 'Undergraduate', purpose: 'Admission to IITs and Indian School of Mines.', officialUrl: 'https://jeeadv.ac.in/', registrationStatus: 'upcoming', color: '#2a5caa', nextDate: '2026-11-05', nextLabel: 'Registration opens', steps: ['Personal details', 'JEE Main qualification', 'IIT preferences', 'Documents', 'Review & payment'] },

  // Medical & Health Sciences
  { id: 'neet-ug', slug: 'neet-ug', name: 'National Eligibility cum Entrance Test (UG)', shortName: 'NEET UG', domain: 'Medical', level: 'Undergraduate', purpose: 'Entrance examination for undergraduate medical education.', officialUrl: 'https://neet.nta.nic.in/', registrationStatus: 'upcoming', color: '#168769', nextDate: '2026-11-02', nextLabel: 'Sample registration window opens', notices: [{ type: 'Information', date: '16 Aug 2026', title: 'Sample information bulletin released' }, { type: 'Advisory', date: '08 Aug 2026', title: 'Identity document readiness checklist' }], resources: ['Practice set: Biology', 'Previous paper: Set A', 'Exam pattern overview'], centers: ['Salt Lake Test Centre, Kolkata', 'Aundh Assessment Hub, Pune', 'Banjara Hills Centre, Hyderabad'], steps: ['Personal details', 'Eligibility', 'Exam city choices', 'Documents', 'Review & payment'] },

  { id: 'neet-pg', slug: 'neet-pg', name: 'National Eligibility cum Entrance Test (PG)', shortName: 'NEET PG', domain: 'Medical', level: 'Postgraduate', purpose: 'Entrance for postgraduate medical courses (MD/MS/DNB).', officialUrl: 'https://nbe.edu.in/neet-pg', registrationStatus: 'closed', color: '#0f6b52' },

  { id: 'neet-mds', slug: 'neet-mds', name: 'National Eligibility cum Entrance Test (MDS)', shortName: 'NEET MDS', domain: 'Dental', level: 'Postgraduate', purpose: 'Entrance for postgraduate dental courses.', officialUrl: 'https://nbe.edu.in/neet-mds', registrationStatus: 'upcoming', color: '#1a7d65' },

  { id: 'aiims', slug: 'aiims', name: 'All India Institute of Medical Sciences', shortName: 'AIIMS', domain: 'Medical', level: 'Undergraduate', purpose: 'Admission to AIIMS medical programmes.', officialUrl: 'https://www.aiimsexams.ac.in/', registrationStatus: 'sample', color: '#0d5943' },

  // University Entrance
  { id: 'cuet-ug', slug: 'cuet-ug', name: 'Common University Entrance Test (UG)', shortName: 'CUET UG', domain: 'University', level: 'Undergraduate', purpose: 'Admission to undergraduate programmes at participating universities.', officialUrl: 'https://cuet.nta.nic.in/', registrationStatus: 'sample', color: '#7656bd', nextDate: '2026-09-25', nextLabel: 'Sample subject-selection deadline', notices: [{ type: 'Schedule', date: '20 Aug 2026', title: 'Sample subject-wise date sheet', urgent: true }, { type: 'FAQ', date: '10 Aug 2026', title: 'Choosing language and domain subjects' }], resources: ['General test practice', 'Previous paper: English', 'Subject mapping guide'], centers: ['Dwarka Assessment Centre, Delhi', 'Navrangpura Test Hub, Ahmedabad', 'Indiranagar Centre, Bengaluru'], steps: ['Personal details', 'University & subjects', 'Exam cities', 'Documents', 'Review & payment'] },

  { id: 'cuet-pg', slug: 'cuet-pg', name: 'Common University Entrance Test (PG)', shortName: 'CUET PG', domain: 'University', level: 'Postgraduate', purpose: 'Admission to postgraduate programmes at participating universities.', officialUrl: 'https://exams.nta.nic.in/cuet-pg/', registrationStatus: 'closed', color: '#8f5d28' },

  // Research & Teaching Eligibility
  { id: 'ugc-net', slug: 'ugc-net', name: 'University Grants Commission NET', shortName: 'UGC-NET', domain: 'Research & Teaching', level: 'Postgraduate', purpose: 'Eligibility for Assistant Professor and Junior Research Fellowship.', officialUrl: 'https://ugcnet.nta.nic.in/', registrationStatus: 'upcoming', color: '#2d7385' },

  { id: 'csir-net', slug: 'csir-net', name: 'Joint CSIR-UGC NET', shortName: 'CSIR-NET', domain: 'Science Research', level: 'Postgraduate', purpose: 'JRF and lectureship eligibility in science subjects.', officialUrl: 'https://csirnet.nta.nic.in/', registrationStatus: 'upcoming', color: '#375c7c' },

  { id: 'icar-aieea', slug: 'icar-aieea', name: 'ICAR All India Entrance Examination', shortName: 'ICAR AIEEA', domain: 'Agriculture', level: 'Undergraduate', purpose: 'Admission to agriculture and related programmes.', officialUrl: 'https://icar.nta.nic.in/', registrationStatus: 'closed', color: '#4a7c34' },

  { id: 'icmr-jrf', slug: 'icmr-jrf', name: 'ICMR Junior Research Fellowship', shortName: 'ICMR JRF', domain: 'Medical Research', level: 'Postgraduate', purpose: 'Fellowship for biomedical research.', officialUrl: 'https://icmr.nta.nic.in/', registrationStatus: 'upcoming', color: '#5a4a7c' },

  // Management
  { id: 'cmat', slug: 'cmat', name: 'Common Management Admission Test', shortName: 'CMAT', domain: 'Management', level: 'Postgraduate', purpose: 'Admission to AICTE-approved management programmes.', officialUrl: 'https://cmat.nta.nic.in/', registrationStatus: 'closed', color: '#8a4b63' },

  { id: 'mat', slug: 'mat', name: 'Management Aptitude Test', shortName: 'MAT', domain: 'Management', level: 'Postgraduate', purpose: 'Admission to MBA and allied programmes.', officialUrl: 'https://mat.aima.in/', registrationStatus: 'open', color: '#7c3d55' },

  // Law
  { id: 'clat', slug: 'clat', name: 'Common Law Admission Test', shortName: 'CLAT', domain: 'Law', level: 'Undergraduate', purpose: 'Admission to National Law Universities.', officialUrl: 'https://consortiumofnlus.ac.in/', registrationStatus: 'upcoming', color: '#8b4513' },

  { id: 'ailet', slug: 'ailet', name: 'All India Law Entrance Test', shortName: 'AILET', domain: 'Law', level: 'Undergraduate', purpose: 'Admission to National Law University, Delhi.', officialUrl: 'https://nludelhi.ac.in/', registrationStatus: 'sample', color: '#6d3a1f' },

  // Design & Architecture
  { id: 'nata', slug: 'nata', name: 'National Aptitude Test in Architecture', shortName: 'NATA', domain: 'Architecture', level: 'Undergraduate', purpose: 'Admission to B.Arch programmes.', officialUrl: 'https://nata.in/', registrationStatus: 'open', color: '#9b5d8f' },

  { id: 'uceed', slug: 'uceed', name: 'Undergraduate Common Entrance Exam for Design', shortName: 'UCEED', domain: 'Design', level: 'Undergraduate', purpose: 'Admission to IIT design programmes.', officialUrl: 'https://uceed.iitb.ac.in/', registrationStatus: 'upcoming', color: '#a84c7d' },

  { id: 'ceed', slug: 'ceed', name: 'Common Entrance Examination for Design', shortName: 'CEED', domain: 'Design', level: 'Postgraduate', purpose: 'Admission to M.Des programmes at IITs.', officialUrl: 'https://ceed.iitb.ac.in/', registrationStatus: 'closed', color: '#8f3d6f' },

  // Hospitality & Tourism
  { id: 'nchmct-jee', slug: 'nchmct-jee', name: 'NCHMCT Joint Entrance Examination', shortName: 'NCHMCT JEE', domain: 'Hospitality', level: 'Undergraduate', purpose: 'Admission to hotel management programmes.', officialUrl: 'https://nchmctjee.nta.nic.in/', registrationStatus: 'sample', color: '#c17a3d' },

  // Additional University & Specialized
  { id: 'du-entrance', slug: 'du-entrance', name: 'Delhi University Entrance Test', shortName: 'DU Entrance', domain: 'University', level: 'Postgraduate', purpose: 'Admission to various PG programmes at Delhi University.', officialUrl: 'https://du.ac.in/', registrationStatus: 'upcoming', color: '#5d4a94' },

  { id: 'bhu-uet', slug: 'bhu-uet', name: 'Banaras Hindu University Undergraduate Entrance Test', shortName: 'BHU UET', domain: 'University', level: 'Undergraduate', purpose: 'Admission to BHU undergraduate programmes.', officialUrl: 'https://bhu.ac.in/', registrationStatus: 'closed', color: '#4a5d94' },

  { id: 'iiser-aptitude', slug: 'iiser-aptitude', name: 'IISER Aptitude Test', shortName: 'IISER Aptitude', domain: 'Science', level: 'Undergraduate', purpose: 'Admission to IISER BS-MS programmes.', officialUrl: 'https://iiseradmission.in/', registrationStatus: 'upcoming', color: '#3d7a8b' },

  // Commerce & Economics
  { id: 'iift', slug: 'iift', name: 'Indian Institute of Foreign Trade Exam', shortName: 'IIFT', domain: 'Foreign Trade', level: 'Postgraduate', purpose: 'Admission to IIFT MBA programmes.', officialUrl: 'https://www.iift.edu/', registrationStatus: 'sample', color: '#6b5d3a' },

  { id: 'ipmat', slug: 'ipmat', name: 'Integrated Programme in Management Aptitude Test', shortName: 'IPMAT', domain: 'Management', level: 'Undergraduate', purpose: 'Admission to 5-year integrated management programmes.', officialUrl: 'https://www.ipmat.iimidr.ac.in/', registrationStatus: 'open', color: '#7a4d5b' },
]

export const ntaResources = {
  main: [
    { title: 'National Testing Agency', description: 'Official NTA homepage', url: 'https://www.nta.ac.in/', icon: 'Home', category: 'Main Portal' },
    { title: 'About NTA', description: 'Mission, vision and organizational structure', url: 'https://www.nta.ac.in/about', icon: 'Info', category: 'Main Portal' },
    { title: 'Contact NTA', description: 'Official contact directory and helplines', url: 'https://www.nta.ac.in/ContactUs', icon: 'Phone', category: 'Main Portal' },
  ],

  practice: [
    { title: 'NTA Quiz Platform', description: 'Official CBT mock tests for all exams', url: 'https://nta.ac.in/Quiz', icon: 'PlayCircle', category: 'Practice Tools' },
    { title: 'National Test Abhyas', description: 'Practice test platform with performance analytics', url: 'https://www.nta.ac.in/abhyas', icon: 'BookOpen', category: 'Practice Tools' },
    { title: 'Abhyas Help', description: 'Guidance for using the practice platform', url: 'https://www.nta.ac.in/Abhyas/help', icon: 'HelpCircle', category: 'Practice Tools' },
  ],

  results: [
    { title: 'Results Portal', description: 'Check examination results', url: 'https://www.nta.ac.in/results', icon: 'FileCheck2', category: 'Results & Verification' },
    { title: 'Scorecard Verification', description: 'Verify authenticity of NTA scorecards', url: 'https://www.nta.ac.in/verification', icon: 'ShieldCheck', category: 'Results & Verification' },
  ],

  support: [
    { title: 'Candidate Login', description: 'Access your application portal', url: 'https://exams.nta.ac.in/candidate-login', icon: 'LogIn', category: 'Support Services' },
    { title: 'FAQ Section', description: 'Frequently asked questions', url: 'https://www.nta.ac.in/faq', icon: 'HelpCircle', category: 'Support Services' },
    { title: 'Grievance Redressal', description: 'Submit and track complaints', url: 'https://www.nta.ac.in/grievance', icon: 'AlertCircle', category: 'Support Services' },
    { title: 'Refund Portal', description: 'Application fee refund requests', url: 'https://www.nta.ac.in/refund', icon: 'CreditCard', category: 'Support Services' },
  ],

  digital: [
    { title: 'DigiLocker', description: 'Secure digital document storage', url: 'https://www.digilocker.gov.in/', icon: 'FileText', category: 'Digital Infrastructure' },
    { title: 'UMANG App', description: 'Unified mobile application for government services', url: 'https://web.umang.gov.in/', icon: 'Smartphone', category: 'Digital Infrastructure' },
    { title: 'Digital India', description: 'Digital public services platform', url: 'https://www.digitalindia.gov.in/', icon: 'Globe', category: 'Digital Infrastructure' },
    { title: 'Ministry of Education', description: 'Education policy and programmes', url: 'https://www.education.gov.in/', icon: 'Building', category: 'Digital Infrastructure' },
  ],

  transparency: [
    { title: 'RTI Section', description: 'Right to Information requests', url: 'https://www.nta.ac.in/rti', icon: 'FileSearch', category: 'Transparency & Policy' },
    { title: 'Tenders & Procurements', description: 'Official procurement notices', url: 'https://www.nta.ac.in/tenders', icon: 'Briefcase', category: 'Transparency & Policy' },
    { title: 'Annual Reports', description: 'NTA performance and activities', url: 'https://www.nta.ac.in/annual-reports', icon: 'BookOpen', category: 'Transparency & Policy' },
    { title: 'Recruitment', description: 'Career opportunities at NTA', url: 'https://www.nta.ac.in/careers', icon: 'Users', category: 'Transparency & Policy' },
  ]
}

export const examCategories = [
  { id: 'engineering', name: 'Engineering & Technology', color: '#3467d6', icon: 'Cog' },
  { id: 'medical', name: 'Medical & Health Sciences', color: '#168769', icon: 'Heart' },
  { id: 'university', name: 'University Entrance', color: '#7656bd', icon: 'GraduationCap' },
  { id: 'research', name: 'Research & Teaching', color: '#2d7385', icon: 'BookOpen' },
  { id: 'management', name: 'Management', color: '#8a4b63', icon: 'Briefcase' },
  { id: 'law', name: 'Law', color: '#8b4513', icon: 'Scale' },
  { id: 'design', name: 'Design & Architecture', color: '#9b5d8f', icon: 'Palette' },
  { id: 'specialized', name: 'Specialized Programmes', color: '#5d4a94', icon: 'Star' },
]

export const getExamsByDomain = (domain) => {
  const mapping = {
    'Engineering': 'engineering',
    'Medical': 'medical',
    'Dental': 'medical',
    'University': 'university',
    'Research & Teaching': 'research',
    'Science Research': 'research',
    'Agriculture': 'research',
    'Medical Research': 'research',
    'Management': 'management',
    'Law': 'law',
    'Architecture': 'design',
    'Design': 'design',
    'Hospitality': 'specialized',
    'Foreign Trade': 'specialized',
    'Science': 'research',
  }
  return mapping[domain] || 'specialized'
}

export const getExam = (slugOrId) => ntaExams.find((exam) => exam.id === slugOrId || exam.slug === slugOrId)
export const getSteps = (exam) => exam.steps || ['Profile review', 'Exam preferences', 'Documents', 'Review & payment']

// Ecosystem for homepage carousel
export const ecosystem = [
  ['Ministry of Education', 'Education policy & programmes', 'https://www.education.gov.in/', 'MOE'],
  ['Digital India', 'Digital public services', 'https://www.digitalindia.gov.in/', 'DI'],
  ['DigiLocker', 'Secure document wallet', 'https://www.digilocker.gov.in/', 'DL'],
  ['NTA Abhyas', 'Practice test platform', 'https://www.nta.ac.in/abhyas', 'ABH'],
  ['JEE Main', 'Official exam portal', 'https://jeemain.nta.nic.in/', 'JEE'],
  ['NEET UG', 'Official exam portal', 'https://neet.nta.nic.in/', 'NEET'],
  ['CUET', 'University entrance portal', 'https://cuet.nta.nic.in/', 'CUET'],
  ['UGC-NET', 'Research fellowship portal', 'https://ugcnet.nta.nic.in/', 'NET'],
]

// Export for backward compatibility
export const exams = ntaExams
