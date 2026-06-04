'use client'

import { useEffect, useState, FormEvent, startTransition } from 'react'

interface ProcessStep {
  _id?: string
  stepNumber: number
  title: string
  description: string
  image: string
  displayOrder: number
}

const emptyStep = (): ProcessStep => ({
  stepNumber: 0,
  title: '',
  description: '',
  image: '',
  displayOrder: 0,
})

export default function ProcessCMS() {
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<ProcessStep | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/api/process')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!cancelled && json?.data) startTransition(() => setSteps(json.data))
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function fetchSteps() {
    try {
      const res = await fetch('/api/process')
      if (res.ok) {
        const data = await res.json()
        startTransition(() => setSteps(data.data || []))
      }
    } catch {
      startTransition(() => setError('Failed to load process steps'))
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const isNew = !editing._id
      const url = isNew ? '/api/process' : `/api/process/${editing._id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      })

      if (res.ok) {
        setMessage(isNew ? 'Step created' : 'Step updated')
        setEditing(null)
        fetchSteps()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save')
      }
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this process step?')) return
    try {
      const res = await fetch(`/api/process/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessage('Step deleted')
        fetchSteps()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete')
      }
    } catch {
      setError('Network error')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-emerald-500 text-sm">Loading...</div></div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading text-white font-bold">Process Steps</h1>
          <p className="text-surface-400 text-sm mt-1">Manage the process/case study section</p>
        </div>
        <button onClick={() => setEditing(emptyStep())} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">Add Step</button>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      {editing && (
        <form onSubmit={handleSave} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5 mb-6">
          <h2 className="text-white font-heading font-bold">{editing._id ? 'Edit Step' : 'New Step'}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Step Number</label>
              <input type="number" value={editing.stepNumber} onChange={(e) => setEditing({ ...editing, stepNumber: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Display Order</label>
              <input type="number" value={editing.displayOrder} onChange={(e) => setEditing({ ...editing, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Title</label>
              <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Description</label>
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" rows={3} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Image URL</label>
              <input type="url" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              {editing.image && (
                <div className="mt-2 relative w-24 h-16 rounded-lg overflow-hidden">
                  <img src={editing.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2.5 bg-surface-700 text-surface-300 rounded-lg text-sm hover:bg-surface-600 transition-colors">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-surface-800 border border-surface-700 rounded-2xl overflow-hidden">
        {steps.length === 0 ? (
          <div className="p-8 text-center text-surface-400 text-sm">No process steps yet. Click &quot;Add Step&quot; to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  <th className="text-left px-4 py-3 text-surface-400 font-medium">Order</th>
                  <th className="text-left px-4 py-3 text-surface-400 font-medium">Title</th>
                  <th className="text-right px-4 py-3 text-surface-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((step) => (
                  <tr key={step._id} className="border-b border-surface-700 last:border-0">
                    <td className="px-4 py-3 text-surface-300">{step.displayOrder}</td>
                    <td className="px-4 py-3 text-white">{step.title}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setEditing(step)} className="text-emerald-400 hover:text-emerald-300 text-sm mr-3">Edit</button>
                      <button onClick={() => handleDelete(step._id!)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
