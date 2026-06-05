'use client'

import { useEffect, useState, FormEvent } from 'react'

interface GeoData {
  companySummary: string
  businessDescription: string
  servicesOverview: string
  productsOverview: string
  industryOverview: string
  whyChooseXurya: string
  faqSection: string
  caseStudySummary: string
}

const defaultData: GeoData = {
  companySummary: '',
  businessDescription: '',
  servicesOverview: '',
  productsOverview: '',
  industryOverview: '',
  whyChooseXurya: '',
  faqSection: '',
  caseStudySummary: '',
}

const fields = [
  { key: 'companySummary', label: 'Company Summary', desc: 'Brief company overview for AI/SEOs' },
  { key: 'businessDescription', label: 'Business Description', desc: 'Detailed business description' },
  { key: 'servicesOverview', label: 'Services Overview', desc: 'Overview of services offered' },
  { key: 'productsOverview', label: 'Products Overview', desc: 'Overview of products/solutions' },
  { key: 'industryOverview', label: 'Industry Overview', desc: 'Industry context and expertise' },
  { key: 'whyChooseXurya', label: 'Why Choose Xurya', desc: "Key differentiators and value props" },
  { key: 'faqSection', label: 'FAQ Section Text', desc: 'Intro text for FAQ section' },
  { key: 'caseStudySummary', label: 'Case Study Summary', desc: 'Summary for case study sections' },
]

export default function GeoCMS() {
  const [data, setData] = useState<GeoData>(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/api/geo')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!cancelled && json?.data) {
          setData({ ...defaultData, ...json.data })
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  function updateField(key: string, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/geo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('GEO settings updated')
      } else {
        const d = await res.json()
        setError(d.error || 'Failed to save')
      }
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-emerald-500 text-sm">Loading...</div></div>
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-white font-bold">GEO Settings</h1>
        <p className="text-surface-400 text-sm mt-1">Manage AI-friendly structured content for search engines and LLMs</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSave} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-surface-300 mb-1">{field.label}</label>
            <p className="text-xs text-surface-500 mb-2">{field.desc}</p>
            <textarea
              value={data[field.key as keyof GeoData]}
              onChange={(e) => updateField(field.key, e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              rows={4}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save GEO Settings'}
        </button>
      </form>
    </div>
  )
}
