'use client'

import { useEffect, useState, FormEvent } from 'react'

export default function CTACMS() {
  const [data, setData] = useState({
    heading: '',
    description: '',
    buttonOneText: '',
    buttonOneLink: '',
    buttonTwoText: '',
    buttonTwoLink: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/api/cta')
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
      const res = await fetch('/api/cta', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('CTA section updated')
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
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'buttonOneText', label: 'Button One Text', type: 'text' },
    { key: 'buttonOneLink', label: 'Button One Link', type: 'text' },
    { key: 'buttonTwoText', label: 'Button Two Text', type: 'text' },
    { key: 'buttonTwoLink', label: 'Button Two Link', type: 'text' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-white font-bold">CTA Section</h1>
        <p className="text-surface-400 text-sm mt-1">Manage the call-to-action section (Sustainability)</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSave} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className={field.key === 'description' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea value={(data as Record<string, string>)[field.key]} onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" rows={3} />
              ) : (
                <input type={field.type} value={(data as Record<string, string>)[field.key]} onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              )}
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  )
}
