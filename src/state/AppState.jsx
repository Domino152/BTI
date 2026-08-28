import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'nta-citizen-first-v1'
const initial = { authenticated: false, profile: { id: 'demo-candidate', name: 'Aarav Mehta', email: 'aarav@example.test', phone: '90000 00000', selectedExamIds: [], activeExamId: null }, applications: {}, archivedExamIds: [] }
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    try { return { ...initial, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } } catch { return initial }
  })
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }, [state])

  const actions = useMemo(() => ({
    login: () => setState(s => ({ ...s, authenticated: true })),
    logout: () => setState(s => ({ ...s, authenticated: false })),
    reset: () => setState({ ...initial, profile: { ...initial.profile } }),
    setSelected: (ids) => setState(s => ({ ...s, archivedExamIds: s.archivedExamIds.filter(id => !ids.includes(id)), profile: { ...s.profile, selectedExamIds: ids, activeExamId: ids[0] || null } })),
    addExam: (id) => setState(s => ({ ...s, archivedExamIds: s.archivedExamIds.filter(x => x !== id), profile: { ...s.profile, selectedExamIds: [...new Set([...s.profile.selectedExamIds, id])], activeExamId: id } })),
    setActive: (id) => setState(s => ({ ...s, profile: { ...s.profile, activeExamId: id } })),
    archiveExam: (id) => setState(s => { const ids = s.profile.selectedExamIds.filter(x => x !== id); return { ...s, archivedExamIds: [...new Set([...s.archivedExamIds, id])], profile: { ...s.profile, selectedExamIds: ids, activeExamId: s.profile.activeExamId === id ? (ids[0] || null) : s.profile.activeExamId } } }),
    restoreExam: (id) => setState(s => ({ ...s, archivedExamIds: s.archivedExamIds.filter(x => x !== id), profile: { ...s.profile, selectedExamIds: [...new Set([...s.profile.selectedExamIds, id])], activeExamId: id } })),
    updateApplication: (examId, patch) => setState(s => ({ ...s, applications: { ...s.applications, [examId]: { id: `app-${examId}`, candidateId: s.profile.id, examId, state: 'NOT_STARTED', currentStep: null, answers: {}, documentMetadata: {}, paymentReference: null, updatedAt: new Date().toISOString(), ...s.applications[examId], ...patch } } })),
  }), [])

  return <AppContext.Provider value={{ state, ...actions }}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
