'use client'

import { useEffect, useState, FormEvent } from 'react'

export default function AboutCMS() {
  const [data, setData] = useState({
    sectionLabel: '',
    heading: '',
    description: '',
    teamCount: 0,
    teamImages: ['', '', ''],
    aboutImage: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/api/about')
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
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('About section updated')
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
        <h1 className="text-2xl font-heading text-white font-bold">About Section</h1>
        <p className="text-surface-400 text-sm mt-1">Manage the Why Xurya section</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSave} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">Section Label</label>
            <input type="text" value={data.sectionLabel} onChange={(e) => setData({ ...data, sectionLabel: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">Team Count</label>
            <input type="number" value={data.teamCount} onChange={(e) => setData({ ...data, teamCount: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-surface-300 mb-1.5">Heading</label>
            <textarea value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" rows={3} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-surface-300 mb-1.5">Description</label>
            <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" rows={4} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-surface-300 mb-1.5">About Image URL</label>
            <input type="url" value={data.aboutImage} onChange={(e) => setData({ ...data, aboutImage: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            {data.aboutImage && (
              <div className="mt-2 relative w-32 h-20 rounded-lg overflow-hidden">
                <img src={data.aboutImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          {data.teamImages.map((img, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Team Image {i + 1}</label>
              <input type="url" value={img} onChange={(e) => {
                const imgs = [...data.teamImages]
                imgs[i] = e.target.value
                setData({ ...data, teamImages: imgs })
              }} className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
