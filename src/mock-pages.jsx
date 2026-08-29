import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  AlertTriangle, AppWindow, ArrowLeft, ArrowRight, BarChart3, BookOpen, Bookmark,
  Brain, Check, CheckCircle2, ChevronLeft, ChevronRight, CircleHelp, Clock3,
  ExternalLink, Eye, Gauge, GraduationCap, Info, Lightbulb, LockKeyhole, Menu,
  MonitorSmartphone, PlayCircle, RotateCcw, ShieldCheck, Smartphone, Sparkles,
  Target, TimerReset, Trophy, UserRound, X, XCircle, Zap
} from 'lucide-react'
import { Footer, Header } from './components'
import { getExam } from './data'
import { useApp } from './state/AppState'

const mockCatalog = [
  { id: 'jee-main', name: 'JEE Main', papers: [{ id: 'paper-1', name: 'Paper 1 — B.E./B.Tech' }, { id: 'paper-2a', name: 'Paper 2A — B.Arch' }] },
  { id: 'neet-ug', name: 'NEET UG', papers: [{ id: 'neet-practice', name: 'NEET UG Practice Paper' }] },
  { id: 'cuet-ug', name: 'CUET UG', papers: [{ id: 'general-test', name: 'General Test' }, { id: 'english', name: 'English Language' }, { id: 'physics', name: 'Physics Domain' }] },
  { id: 'ugc-net', name: 'UGC-NET', papers: [{ id: 'paper-i', name: 'Paper I — Teaching & Research Aptitude' }] },
]

const questions = [
  { id: 'q1', text: 'Which institution is responsible for conducting the JEE Main examination?', options: ['University Grants Commission', 'National Testing Agency', 'Central Board of Secondary Education', 'All India Council for Technical Education'], correct: 1 },
  { id: 'q2', text: 'If 3x + 5 = 20, what is the value of x?', options: ['3', '5', '7', '15'], correct: 1 },
  { id: 'q3', text: 'Which unit is used to measure electric current?', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], correct: 2 },
  { id: 'q4', text: 'Choose the word closest in meaning to “meticulous”.', options: ['Careless', 'Thorough', 'Rapid', 'Ordinary'], correct: 1 },
  { id: 'q5', text: 'What is the derivative of x² with respect to x?', options: ['x', '2x', 'x³', '2'], correct: 1 },
  { id: 'q6', text: 'Which gas is most abundant in Earth’s atmosphere?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], correct: 2 },
  { id: 'q7', text: 'A candidate marks a question for review after answering it. How is it shown in the palette?', options: ['Not visited', 'Answered and marked for review', 'Not answered', 'Submitted'], correct: 1 },
  { id: 'q8', text: 'Which constitutional right supports access to public information in India?', options: ['Right to Education', 'Right to Information', 'Right to Property', 'Right against Exploitation'], correct: 1 },
  { id: 'q9', text: 'What is 15% of 200?', options: ['15', '20', '30', '45'], correct: 2 },
  { id: 'q10', text: 'Which action records the response and opens the next question?', options: ['Clear', 'Back', 'Save & Next', 'Submit'], correct: 2 },
]

const sessionDefaults = { examId: '', paperId: '', answers: {}, marked: [], visited: [], startedAt: null, submittedAt: null, durationSeconds: 1800 }
const getPaper = session => mockCatalog.find(e => e.id === session.examId)?.papers.find(p => p.id === session.paperId)

function VideoEmbed({ videoId, title }) {
  return <div className="video-embed"><iframe src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div>
}

export function MockTestLanding() {
  const { state, login, setMockSelection } = useApp()
  const session = { ...sessionDefaults, ...(state.mockSession || {}) }
  const [examId, setExamId] = useState(session.examId)
  const [paperId, setPaperId] = useState(session.paperId)
  const [showLogin, setShowLogin] = useState(false)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('candidate-demo')
  const [password, setPassword] = useState('demo-password')
  const navigate = useNavigate()
  const selectedExam = mockCatalog.find(e => e.id === examId)

  const begin = () => {
    if (!examId || !paperId) { setError('Select an examination and paper before continuing.'); return }
    setMockSelection(examId, paperId)
    if (state.authenticated) navigate('/mock-test/instructions')
    else setShowLogin(true)
  }
  const signIn = e => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return
    login()
    setShowLogin(false)
    navigate('/mock-test/instructions')
  }

  return <div className="mock-page"><Header/><main className="mock-landing"><div className="mock-breadcrumb"><Link to="/"><ArrowLeft/> Home</Link><span>Computer Based Test practice</span></div><section className="mock-landing-grid"><div className="mock-video-card"><VideoEmbed videoId="DmlfMLWQETQ" title="NTA computer-based test practice overview"/><div><span className="eyebrow">OFFICIAL PRACTICE GUIDANCE</span><h2>Get familiar with the CBT experience</h2><p>Watch the overview, then choose an examination and paper for a complete simulated practice flow.</p></div></div><section className="mock-selector panel"><span className="mock-feature-icon"><AppWindow/></span><span className="eyebrow">NTA MOCK TEST</span><h1>Select exam and paper</h1><p>Choose the examination and paper you want to practise.</p><label>Examination<select value={examId} onChange={e => { setExamId(e.target.value); setPaperId(''); setError('') }}><option value="">Select examination</option>{mockCatalog.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}</select></label><label>Paper<select value={paperId} disabled={!selectedExam} onChange={e => { setPaperId(e.target.value); setError('') }}><option value="">Select paper</option>{selectedExam?.papers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>{error && <div className="inline-error"><AlertTriangle/> {error}</div>}<button className="primary-btn full" onClick={begin}>Start mock test <ArrowRight/></button><small className="mock-note"><ShieldCheck/> This is a local practice simulation. No answer is sent to NTA.</small></section></section><section className="mock-about"><Info/><div><h2>About the mock test</h2><p>This practice experience helps candidates understand question navigation, response states, marking for review, the question palette, timer, and submission process used in a computer-based examination.</p></div></section></main><Footer/>{showLogin && <div className="mock-modal-backdrop"><form className="mock-login-modal" onSubmit={signIn} role="dialog" aria-modal="true" aria-labelledby="mock-login-title"><button type="button" className="modal-close" onClick={() => setShowLogin(false)} aria-label="Close login"><X/></button><span className="modal-lock"><LockKeyhole/></span><h2 id="mock-login-title">Login required</h2><p>Sign in to start the selected mock test. Your exam and paper selection has been preserved.</p><label>Username<input value={username} onChange={e=>setUsername(e.target.value)} autoComplete="username" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/></label><button className="primary-btn full">Login and continue <ArrowRight/></button><small>Use the pre-filled demonstration credentials.</small></form></div>}</div>
}

export function MockInstructions() {
  const { state, updateMockSession } = useApp()
  const session = { ...sessionDefaults, ...(state.mockSession || {}) }
  const [accepted, setAccepted] = useState(false)
  const navigate = useNavigate()
  if (!session.examId || !session.paperId) return <Navigate to="/mock-test" replace/>
  const exam = mockCatalog.find(e => e.id === session.examId)
  const paper = getPaper(session)
  const proceed = () => { updateMockSession({ answers: {}, marked: [], visited: [questions[0].id], startedAt: Date.now(), submittedAt: null }); navigate('/mock-test/exam') }
  return <div className="cbt-page"><Header/><main className="instructions-page"><div className="cbt-titlebar"><span>GENERAL INSTRUCTIONS</span><div><strong>{exam?.name}</strong><small>{paper?.name}</small></div></div><section className="instructions-card"><h1>Please read the instructions carefully</h1><div className="instructions-columns"><div><h2>General instructions</h2><ol><li>The mock test has {questions.length} questions and a 30-minute countdown timer.</li><li>The timer appears at the top of the examination screen and continues while you move between questions.</li><li>When time expires, the practice test is submitted automatically.</li><li>Use the question palette to open any question directly.</li></ol><h2>Navigating and answering</h2><ol><li>Select one option for each multiple-choice question.</li><li><strong>Save & Next</strong> records the response and moves forward.</li><li><strong>Clear</strong> removes the selected response.</li><li>Back and Next move without changing the stored response.</li></ol></div><div><h2>Review and question states</h2><ul className="instruction-legend"><li><span className="palette-box not-visited">1</span> Not visited</li><li><span className="palette-box not-answered">2</span> Visited but not answered</li><li><span className="palette-box answered">3</span> Answered</li><li><span className="palette-box marked">4</span> Marked for review</li><li><span className="palette-box answered-marked">5</span> Answered and marked for review</li></ul><div className="instruction-info"><Info/><span>Answered and marked-for-review questions are included in scoring. Review marks are visual aids for the candidate.</span></div><h2>Submission</h2><p>You may submit before time expires. A confirmation dialog appears before the test is finalised. After submission, a result summary and answer review are available.</p></div></div><label className="instruction-confirm"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/><span>I have read and understood the instructions and am ready to begin the mock test.</span></label><button className="proceed-btn" disabled={!accepted} onClick={proceed}>Proceed to mock test <ArrowRight/></button></section></main></div>
}

const paletteStatus = (questionId, session) => {
  const answered = session.answers?.[questionId] !== undefined
  const marked = session.marked?.includes(questionId)
  if (answered && marked) return 'answered-marked'
  if (marked) return 'marked'
  if (answered) return 'answered'
  if (session.visited?.includes(questionId)) return 'not-answered'
  return 'not-visited'
}

export function MockExam() {
  const { state, updateMockSession } = useApp()
  const session = { ...sessionDefaults, ...(state.mockSession || {}) }
  const [current, setCurrent] = useState(0)
  const [now, setNow] = useState(Date.now())
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const navigate = useNavigate()
  const autoSubmitted = useRef(false)
  if (!session.examId || !session.paperId) return <Navigate to="/mock-test" replace/>
  if (!session.startedAt) return <Navigate to="/mock-test/instructions" replace/>
  const remaining = Math.max(0, session.durationSeconds - Math.floor((now - session.startedAt) / 1000))
  const q = questions[current]
  const exam = mockCatalog.find(e => e.id === session.examId)
  const paper = getPaper(session)
  const updateVisited = index => {
    const id = questions[index].id
    updateMockSession({ visited: [...new Set([...(session.visited || []), id])] })
    setCurrent(index)
  }
  const setAnswer = option => updateMockSession({ answers: { ...(session.answers || {}), [q.id]: option }, visited: [...new Set([...(session.visited || []), q.id])] })
  const clear = () => { const next = { ...(session.answers || {}) }; delete next[q.id]; updateMockSession({ answers: next }) }
  const setMarked = marked => updateMockSession({ marked: marked ? [...new Set([...(session.marked || []), q.id])] : (session.marked || []).filter(id => id !== q.id) })
  const advance = () => updateVisited(Math.min(questions.length - 1, current + 1))
  const finish = () => { updateMockSession({ submittedAt: Date.now() }); setConfirmSubmit(false); navigate('/mock-test/result') }

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  useEffect(() => { if (remaining === 0 && !autoSubmitted.current) { autoSubmitted.current = true; finish() } }, [remaining])
  const fmt = n => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`
  const counts = useMemo(() => questions.reduce((acc,item)=>{const s=paletteStatus(item.id,session);acc[s]=(acc[s]||0)+1;return acc},{}),[session.answers,session.marked,session.visited])

  return <div className="cbt-exam-page"><header className="cbt-exam-header"><Link to="/" className="cbt-brand"><span className="nta-emblem"/><span>National Testing Agency<small>Mock examination interface</small></span></Link><div className="candidate-chip"><UserRound/><span><small>Candidate</small><strong>{state.profile.name}</strong></span></div></header><main><section className="candidate-bar"><div><strong>{exam?.name}</strong><span>{paper?.name}</span></div><div className={remaining < 300 ? 'exam-timer urgent' : 'exam-timer'}><Clock3/><span><small>Remaining time</small><strong>{fmt(remaining)}</strong></span></div></section><div className="cbt-layout"><section className="question-panel"><header><span>Question {current+1} of {questions.length}</span><button className={session.marked?.includes(q.id) ? 'bookmark active' : 'bookmark'} onClick={()=>setMarked(!session.marked?.includes(q.id))} aria-label="Toggle mark for review"><Bookmark/></button></header><div className="question-body"><h1>{q.text}</h1><div className="answer-options">{q.options.map((option,i)=><label className={session.answers?.[q.id]===i?'selected':''} key={option}><input type="radio" name={q.id} checked={session.answers?.[q.id]===i} onChange={()=>setAnswer(i)}/><span>{String.fromCharCode(65+i)}</span><strong>{option}</strong></label>)}</div></div><div className="question-actions"><div><button className="exam-btn green" onClick={()=>{setMarked(false);advance()}}>Save & Next</button><button className="exam-btn light" onClick={clear}>Clear</button><button className="exam-btn amber" onClick={()=>{setMarked(true);advance()}}>Save & Mark for Review</button><button className="exam-btn navy" onClick={()=>{setMarked(true);advance()}}>Mark for Review & Next</button></div><div><button className="exam-btn light" disabled={current===0} onClick={()=>updateVisited(current-1)}><ChevronLeft/> Back</button><button className="exam-btn light" disabled={current===questions.length-1} onClick={()=>updateVisited(current+1)}>Next <ChevronRight/></button><button className="exam-btn green" onClick={()=>setConfirmSubmit(true)}>Submit</button></div></div></section><aside className="question-palette"><h2>Question palette</h2><div className="palette-summary"><span><i className="not-visited">{counts['not-visited']||0}</i>Not visited</span><span><i className="not-answered">{counts['not-answered']||0}</i>Not answered</span><span><i className="answered">{counts.answered||0}</i>Answered</span><span><i className="marked">{counts.marked||0}</i>Marked</span><span><i className="answered-marked">{counts['answered-marked']||0}</i>Answered & marked</span></div><h3>Questions</h3><div className="palette-grid">{questions.map((item,i)=><button className={`${paletteStatus(item.id,session)} ${i===current?'current':''}`} key={item.id} onClick={()=>updateVisited(i)}>{i+1}</button>)}</div></aside></div></main>{confirmSubmit&&<div className="modal-backdrop"><div className="submit-dialog" role="dialog" aria-modal="true"><AlertTriangle/><h2>Submit mock test?</h2><p>You answered {Object.keys(session.answers || {}).length} of {questions.length} questions. You cannot change responses after submission.</p><div><button className="secondary-btn" onClick={()=>setConfirmSubmit(false)}>Continue test</button><button className="primary-btn" onClick={finish}>Submit now</button></div></div></div>}</div>
}

export function MockResult() {
  const { state, resetMockSession } = useApp()
  const session = { ...sessionDefaults, ...(state.mockSession || {}) }
  const [review, setReview] = useState(false)
  if (!session.submittedAt) return <Navigate to="/mock-test" replace/>
  const answered = Object.keys(session.answers || {}).length
  const correct = questions.filter(q => session.answers?.[q.id] === q.correct).length
  const incorrect = answered - correct
  const unanswered = questions.length - answered
  const accuracy = answered ? Math.round(correct / answered * 100) : 0
  const elapsed = Math.min(session.durationSeconds, Math.floor((session.submittedAt - session.startedAt) / 1000))
  const fmt = n => `${Math.floor(n/60)}m ${n%60}s`
  const restart = () => resetMockSession()
  return <div className="result-page"><Header/><main className="result-main"><section className="result-hero"><span><Trophy/></span><p>MOCK TEST COMPLETED</p><h1>Your practice result</h1><strong>{correct}/{questions.length}</strong><small>questions correct</small></section><div className="result-metrics"><article><CheckCircle2/><strong>{correct}</strong><span>Correct</span></article><article><XCircle/><strong>{incorrect}</strong><span>Incorrect</span></article><article><CircleHelp/><strong>{unanswered}</strong><span>Unanswered</span></article><article><Target/><strong>{accuracy}%</strong><span>Accuracy</span></article><article><Clock3/><strong>{fmt(elapsed)}</strong><span>Time taken</span></article></div><div className="result-actions"><button className="primary-btn" onClick={()=>setReview(!review)}>{review?'Hide review':'Review answers'} <Eye/></button><Link className="secondary-btn" to="/dashboard">Return to dashboard</Link><Link className="text-btn" to="/mock-test" onClick={restart}><RotateCcw/> Try another test</Link></div>{review&&<section className="answer-review"><h2>Answer review</h2>{questions.map((q,i)=>{const selected=session.answers?.[q.id];const ok=selected===q.correct;return <article key={q.id} className={selected===undefined?'unanswered':ok?'correct':'incorrect'}><div><span>{i+1}</span><h3>{q.text}</h3></div><p>Your answer: <strong>{selected===undefined?'Not answered':q.options[selected]}</strong></p><p>Correct answer: <strong>{q.options[q.correct]}</strong></p></article>})}</section>}</main><Footer/></div>
}

function PhonePreview({ variant = 'dashboard' }) {
  return <div className={`abhyas-phone ${variant}`}><div className="phone-speaker"></div><div className="phone-screen"><div className="phone-appbar"><span className="nta-emblem"></span><strong>ABHYAS</strong><Menu/></div>{variant==='dashboard'?<><p>Good afternoon, student</p><h4>Today’s practice</h4><div className="phone-test-card"><Zap/><strong>JEE Main Full Test</strong><small>90 questions · 180 min</small><button>Start test</button></div><div className="phone-stats"><span>78%<small>Accuracy</small></span><span>12<small>Tests</small></span></div></>:<><p>Performance overview</p><div className="phone-chart"><BarChart3/></div><h4>Areas to improve</h4><div className="phone-topic">Physics <span>64%</span></div><div className="phone-topic">Chemistry <span>81%</span></div><div className="phone-topic">Mathematics <span>73%</span></div></>}</div></div>
}

export function AbhyasPage() {
  return <div className="abhyas-page"><Header/><main><section className="abhyas-hero"><div><span className="eyebrow">NATIONAL TEST ABHYAS</span><h1>Practice with purpose.<br/>Improve with insight.</h1><p>Official-quality mock tests, performance analysis, and personalised feedback help JEE Main and NEET aspirants prepare with confidence.</p><div className="store-buttons"><a href="https://play.google.com/store" target="_blank" rel="noreferrer"><Smartphone/><span><small>GET IT ON</small><strong>Google Play</strong></span></a><a href="https://www.apple.com/in/app-store/" target="_blank" rel="noreferrer"><Smartphone/><span><small>DOWNLOAD ON THE</small><strong>App Store</strong></span></a></div><div className="abhyas-trust"><ShieldCheck/> Practice content and actions shown here are a prototype demonstration.</div></div><div className="phone-stage"><span className="orbit-ring"></span><PhonePreview/></div></section><section className="abhyas-section launch"><div className="section-title"><span>Launch</span><h2>See how National Test Abhyas works</h2><p>A short official overview of the practice experience and its learning tools.</p></div><VideoEmbed videoId="DmlfMLWQETQ" title="National Test Abhyas explanatory video by NTA"/></section><section className="abhyas-section features"><div className="section-title"><span>Only the best for you</span><h2>Feedback that turns practice into progress</h2></div><div className="abhyas-feature-grid"><article><BarChart3/><h3>Advanced analytics</h3><p>Understand performance by topic, question type, speed, and accuracy.</p></article><article><Brain/><h3>Personalised reports</h3><p>Identify strengths and focus practice on the concepts that need attention.</p></article><article><MonitorSmartphone/><h3>Real exam-level tests</h3><p>Practise complete mock papers designed around the CBT experience.</p></article></div></section><section className="abhyas-dark"><div className="abhyas-dark-inner"><div><span className="eyebrow">THE ULTIMATE SELF-STUDY TOOL</span><h2>Prepare anywhere. Learn from every attempt.</h2><div className="exam-choice"><button><GraduationCap/> Engineering <ArrowRight/></button><button><BookOpen/> Medical <ArrowRight/></button></div></div><div className="phone-pair"><PhonePreview/><PhonePreview variant="analytics"/></div><ul><li><Target/> Reduce careless errors</li><li><TimerReset/> Improve time management</li><li><Gauge/> Improve speed and accuracy</li><li><Lightbulb/> Strengthen test-taking strategy</li></ul></div></section><section className="abhyas-section learn-video"><div className="section-title"><span>Learn more</span><h2>A complete guide to the Abhyas app</h2><p>Follow a practical walkthrough of installation, practice tests, reports, and improvement tools.</p></div><VideoEmbed videoId="FR6FY8iUL7c" title="Complete guide to the NTA Abhyas app"/></section></main><Footer/></div>
}
