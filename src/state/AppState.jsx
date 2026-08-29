import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api, saveSessionToken, sessionToken } from '../api'

const STORAGE_KEY = 'nta-citizen-first-v1'
const initialMockSession = { examId: '', paperId: '', answers: {}, marked: [], visited: [], startedAt: null, submittedAt: null, durationSeconds: 1800 }
const initial = { authenticated: false, authReady: false, profile: { id: '', name: '', username: '', email: '', phone: '', selectedExamIds: [], activeExamId: null }, applications: {}, archivedExamIds: [], mockSession: initialMockSession }
const AppContext = createContext(null)
const indexApplications = items => Object.fromEntries((items || []).map(application => [application.examId, application]))

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    try { return { ...initial, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'), authenticated: false, authReady: false } } catch { return initial }
  })
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }, [state])
  useEffect(() => {
    let active = true
    if (!sessionToken()) { setState(current => ({ ...current, authenticated: false, authReady: true })); return () => { active = false } }
    Promise.all([api.me(), api.applications()]).then(([{ user }, { applications }]) => {
      if (!active) return
      setState(current => ({ ...current, authenticated: true, authReady: true, applications: { ...current.applications, ...indexApplications(applications) }, profile: { ...current.profile, id: user.id, username: user.username, name: user.name || user.username } }))
    }).catch(() => {
      saveSessionToken('')
      if (active) setState(current => ({ ...current, authenticated: false, authReady: true }))
    })
    return () => { active = false }
  }, [])

  const actions = useMemo(() => ({
    login: async (username, password) => { const result = await api.login(username, password); saveSessionToken(result.token); setState(s => ({ ...s, authenticated: true, authReady: true, profile: { ...s.profile, id: result.user.id, username: result.user.username, name: result.user.name || result.user.username } })); return result },
    register: async (username, password) => { const result = await api.register(username, password); saveSessionToken(result.token); setState(s => ({ ...s, authenticated: true, authReady: true, profile: { ...s.profile, id: result.user.id, username: result.user.username, name: result.user.name || result.user.username } })); return result },
    logout: async () => { try { await api.logout() } catch {} saveSessionToken(''); setState(s => ({ ...s, authenticated: false, authReady: true })) },
    reset: () => setState({ ...initial, profile: { ...initial.profile } }),
    setSelected: (ids) => setState(s => ({ ...s, archivedExamIds: s.archivedExamIds.filter(id => !ids.includes(id)), profile: { ...s.profile, selectedExamIds: ids, activeExamId: ids[0] || null } })),
    addExam: (id) => setState(s => ({ ...s, archivedExamIds: s.archivedExamIds.filter(x => x !== id), profile: { ...s.profile, selectedExamIds: [...new Set([...s.profile.selectedExamIds, id])], activeExamId: id } })),
    setActive: (id) => setState(s => ({ ...s, profile: { ...s.profile, activeExamId: id } })),
    archiveExam: (id) => setState(s => { const ids = s.profile.selectedExamIds.filter(x => x !== id); return { ...s, archivedExamIds: [...new Set([...s.archivedExamIds, id])], profile: { ...s.profile, selectedExamIds: ids, activeExamId: s.profile.activeExamId === id ? (ids[0] || null) : s.profile.activeExamId } } }),
    restoreExam: (id) => setState(s => ({ ...s, archivedExamIds: s.archivedExamIds.filter(x => x !== id), profile: { ...s.profile, selectedExamIds: [...new Set([...s.profile.selectedExamIds, id])], activeExamId: id } })),
    updateApplication: (examId, patch) => setState(s => {
      const application = { id: `app-${examId}`, candidateId: s.profile.id, examId, state: 'NOT_STARTED', currentStep: null, answers: {}, documentMetadata: {}, paymentReference: null, updatedAt: new Date().toISOString(), ...s.applications[examId], ...patch }
      if (s.authenticated) api.saveApplication(examId, application).catch(() => {})
      return { ...s, applications: { ...s.applications, [examId]: application } }
    }),
    setMockSelection: (examId, paperId) => setState(s => ({ ...s, mockSession: { ...initialMockSession, examId, paperId } })),
    updateMockSession: (patch) => setState(s => ({ ...s, mockSession: { ...initialMockSession, ...(s.mockSession || {}), ...patch } })),
    resetMockSession: () => setState(s => ({ ...s, mockSession: { ...initialMockSession } })),
  }), [])

  return <AppContext.Provider value={{ state, ...actions }}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
