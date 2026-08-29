import { useEffect, useState } from 'react'
import { api } from './api'

export function useOfficialNotices(fallback = []) {
  const [state, setState] = useState({ items: fallback, sync: null, live: false })
  useEffect(() => {
    let active = true
    api.notices().then(result => {
      if (!active || !result.notices?.length) return
      setState({
        items: result.notices.map((notice, index) => ({ id: notice.sourceUrl || `official-${index}`, title: notice.title, date: notice.fetchedAt, type: notice.exam || 'Official notice', sourceUrl: notice.sourceUrl, verifiedOfficialSource: true })),
        sync: result.sync,
        live: true
      })
    }).catch(() => {})
    return () => { active = false }
  }, [])
  return state
}

export function useOfficialExams(fallback = []) {
  const [state, setState] = useState({ items: fallback, sync: null, live: false })
  useEffect(() => {
    let active = true
    api.exams().then(result => {
      if (!active || !result.exams?.length) return
      const bySlug = new Map(fallback.map(exam => [exam.slug, exam]))
      result.exams.forEach(remote => {
        const local = bySlug.get(remote.slug)
        bySlug.set(remote.slug, local ? { ...local, name: remote.name || local.name, shortName: remote.name || local.shortName, officialUrl: remote.officialUrl || local.officialUrl, syncedAt: remote.fetchedAt, verifiedOfficialSource: true } : {
          id: remote.slug, slug: remote.slug, name: remote.name, shortName: remote.name, domain: remote.domain || 'Specialized Programmes', level: 'National', purpose: `Official NTA examination listing synchronized from ${remote.sourceUrl || 'nta.ac.in'}.`, registrationStatus: 'open', officialUrl: remote.officialUrl, color: '#245dc1', notices: [], resources: [], centers: []
        })
      })
      setState({ items: [...bySlug.values()], sync: result.sync, live: true })
    }).catch(() => {})
    return () => { active = false }
  }, [fallback])
  return state
}
