'use client'

import { useEffect, useState, FormEvent } from 'react'

interface FaqItem {
  _id: string
  question: string
  answer: string
}

export default function FaqCMS() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ question: '', answer: '' })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/faqs')
        if (!res.ok) return
        const json = await res.json()
        if (!cancelled && json?.data) setFaqs(json.data)
      } catch {
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  function refetch() {
    fetch('/api/faqs')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => { if (json?.data) setFaqs(json.data) })
      .catch(() => {})
  }

  function resetForm() {
    setForm({ question: '', answer: '' })
    setEditingId(null)
  }

  function startEdit(faq: FaqItem) {
    setForm({ question: faq.question, answer: faq.answer })
    setEditingId(faq._id)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.question.trim() || !form.answer.trim()) {
      setError('Both question and answer are required')
      return
    }

    setSaving(true)
    setMessage('')
    setError('')

    try {
      const url = editingId ? `/api/faqs/${editingId}` : '/api/faqs'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setMessage(editingId ? 'FAQ updated' : 'FAQ created')
        resetForm()
        refetch()
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

  async function handleDelete(id: string) {
    if (!confirm('Delete this FAQ?')) return
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessage('FAQ deleted')
        if (editingId === id) resetForm()
        refetch()
      }
    } catch {
      setError('Failed to delete')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-white font-bold">FAQ Manager</h1>
        <p className="text-surface-400 text-sm mt-1">Add, edit, and remove frequently asked questions</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6">
          <h2 className="text-lg font-heading text-white font-bold mb-5">{editingId ? 'Edit FAQ' : 'Add FAQ'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Question</label>
              <input
                type="text"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="What is solar energy?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Answer</label>
              <textarea
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                rows={4}
                placeholder="Solar energy is..."
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update FAQ' : 'Add FAQ'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-surface-700 hover:bg-surface-600 text-surface-300 rounded-lg font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6">
          <h2 className="text-lg font-heading text-white font-bold mb-5">All FAQs ({faqs.length})</h2>
          {loading ? (
            <div className="text-emerald-500 text-sm">Loading...</div>
          ) : faqs.length === 0 ? (
            <p className="text-surface-400 text-sm">No FAQs yet. Add your first one.</p>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {faqs.map((faq) => (
                <div key={faq._id} className="bg-surface-700 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{faq.question}</p>
                      <p className="text-surface-400 text-xs mt-1 line-clamp-2">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => startEdit(faq)}
                        className="px-3 py-1.5 bg-surface-600 hover:bg-surface-500 text-surface-300 rounded-lg text-xs transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq._id)}
                        className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
