import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useApp } from './state/AppState'
import { About, ApplicationStep, Dashboard, ExamCatalogue, Help, Home, Login, ManageExams, Notices, Onboarding, Workspace } from './pages'
import { ResourceDirectory, ExamsByCategory, ExamDetail } from './directory-pages'
import { AboutUs, RTI, Tender, Downloads, ContactUs } from './nta-official-pages'
import { AbhyasPage, MockExam, MockInstructions, MockResult, MockTestLanding } from './mock-pages'

function Protected({ children }) {
  const { state } = useApp(); const location = useLocation()
  if (!state.authReady) return <div className="auth-loading" role="status">Checking your secure session…</div>
  if (!state.authenticated) return <Navigate to="/login" state={{ from: location }} replace/>
  return children
}

export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return <Routes>
    <Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/exams" element={<ExamCatalogue/>}/><Route path="/notices" element={<Notices/>}/><Route path="/help" element={<Help/>}/><Route path="/about-prototype" element={<About/>}/>
    <Route path="/about-us" element={<AboutUs/>}/><Route path="/about-us/:section" element={<AboutUs/>}/><Route path="/rti" element={<RTI/>}/><Route path="/tender" element={<Tender/>}/><Route path="/downloads" element={<Downloads/>}/><Route path="/contact-us" element={<ContactUs/>}/>
    <Route path="/resources" element={<ResourceDirectory/>}/><Route path="/exams-by-category" element={<ExamsByCategory/>}/><Route path="/exam-detail/:examSlug" element={<ExamDetail/>}/>
    <Route path="/mock-test" element={<MockTestLanding/>}/><Route path="/mock-test/instructions" element={<Protected><MockInstructions/></Protected>}/><Route path="/mock-test/exam" element={<Protected><MockExam/></Protected>}/><Route path="/mock-test/result" element={<Protected><MockResult/></Protected>}/><Route path="/abhyas" element={<AbhyasPage/>}/>
    <Route path="/onboarding/exams" element={<Protected><Onboarding/></Protected>}/><Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/><Route path="/workspace/:examSlug" element={<Protected><Workspace/></Protected>}/><Route path="/workspace/:examSlug/:section" element={<Protected><Workspace/></Protected>}/><Route path="/apply/:examSlug/:step" element={<Protected><ApplicationStep/></Protected>}/><Route path="/manage-exams" element={<Protected><ManageExams/></Protected>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}
