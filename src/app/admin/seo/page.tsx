'use client'

import { useEffect, useState, FormEvent } from 'react'

const pages = ['home', 'about', 'solutions', 'caseStudies', 'products', 'contact'] as const
const pageLabels: Record<string, string> = {
  home: 'Home Page',
  about: 'About Page',
  solutions: 'Solutions Page',
  caseStudies: 'Case Studies Page',
  products: 'Products Page',
  contact: 'Contact Page',
}

interface SeoPageData {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
}

type SeoData = Record<string, SeoPageData>

const emptyPage: SeoPageData = { title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '' }

const defaultData: SeoData = {
  home: { ...emptyPage },
  about: { ...emptyPage },
  solutions: { ...emptyPage },
  caseStudies: { ...emptyPage },
  products: { ...emptyPage },
  contact: { ...emptyPage },
}

export default function SeoCMS() {
  const [data, setData] = useState<SeoData>(defaultData)
  const [activeTab, setActiveTab] = useState('home')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/api/seo')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!cancelled && json?.data) {
          const merged: SeoData = { ...defaultData }
          for (const page of pages) {
            if (json.data[page]) {
              merged[page] = { ...emptyPage, ...json.data[page] }
            }
          }
          setData(merged)
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  function updateField(page: string, field: string, value: string) {
    setData((prev) => ({ ...prev, [page]: { ...prev[page], [field]: value } }))
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('SEO settings updated')
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
        <h1 className="text-2xl font-heading text-white font-bold">SEO Settings</h1>
        <p className="text-surface-400 text-sm mt-1">Manage SEO metadata for all pages</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      <div className="flex flex-wrap gap-2 mb-6">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setActiveTab(page)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === page
                ? 'bg-emerald-600 text-white'
                : 'bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-white'
            }`}
          >
            {pageLabels[page]}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-surface-800 border border-surface-700 rounded-2xl p-6">
        <h2 className="text-lg font-heading text-white font-bold mb-5">{pageLabels[activeTab]}</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">SEO Title</label>
            <input
              type="text"
              value={data[activeTab].title}
              onChange={(e) => updateField(activeTab, 'title', e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Page title for search engines"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">Meta Description</label>
            <textarea
              value={data[activeTab].description}
              onChange={(e) => updateField(activeTab, 'description', e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              rows={3}
              placeholder="Brief description for search results"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">Keywords</label>
            <input
              type="text"
              value={data[activeTab].keywords}
              onChange={(e) => updateField(activeTab, 'keywords', e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="solar energy, renewable, clean power, ..."
            />
          </div>

          <div className="border-t border-surface-700 pt-5">
            <h3 className="text-sm font-heading text-white font-semibold mb-4">Open Graph (Social Sharing)</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">OG Title</label>
                <input
                  type="text"
                  value={data[activeTab].ogTitle}
                  onChange={(e) => updateField(activeTab, 'ogTitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Title for social sharing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">OG Description</label>
                <input
                  type="text"
                  value={data[activeTab].ogDescription}
                  onChange={(e) => updateField(activeTab, 'ogDescription', e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Description for social sharing"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-surface-300 mb-1.5">OG Image URL</label>
                <input
                  type="url"
                  value={data[activeTab].ogImage}
                  onChange={(e) => updateField(activeTab, 'ogImage', e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="https://example.com/og-image.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save SEO Settings'}
        </button>
      </form>
    </div>
  )
}
