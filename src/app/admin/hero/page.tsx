'use client'

import { useEffect, useState, FormEvent } from 'react'

export default function HeroCMS() {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    backgroundImage: '',
    primaryButtonText: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    floatingCardTitle: '',
    floatingCardDescription: '',
    floatingCardImage: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/api/hero')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!cancelled && json?.data) setData(json.data)
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('Hero section updated')
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

  const fields = [
    { key: 'title', label: 'Title', type: 'textarea' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'backgroundImage', label: 'Background Image URL', type: 'url' },
    { key: 'primaryButtonText', label: 'Primary Button Text', type: 'text' },
    { key: 'primaryButtonLink', label: 'Primary Button Link', type: 'text' },
    { key: 'secondaryButtonText', label: 'Secondary Button Text', type: 'text' },
    { key: 'secondaryButtonLink', label: 'Secondary Button Link', type: 'text' },
    { key: 'floatingCardTitle', label: 'Floating Card Title', type: 'text' },
    { key: 'floatingCardDescription', label: 'Floating Card Description', type: 'text' },
    { key: 'floatingCardImage', label: 'Floating Card Image URL', type: 'url' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-white font-bold">Hero Section</h1>
        <p className="text-surface-400 text-sm mt-1">Manage the main hero banner</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSave} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className={field.key === 'title' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  value={(data as Record<string, string>)[field.key]}
                  onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={3}
                />
              ) : (
                <input
                  type={field.type}
                  value={(data as Record<string, string>)[field.key]}
                  onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>
          ))}
        </div>

        {data.backgroundImage && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden">
            <img src={data.backgroundImage} alt="Hero preview" className="w-full h-full object-cover" />
          </div>
        )}

        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
