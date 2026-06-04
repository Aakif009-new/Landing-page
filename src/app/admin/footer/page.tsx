'use client'

import { useEffect, useState, FormEvent } from 'react'

interface FooterLink {
  label: string
  href: string
}

interface SocialLink {
  platform: string
  url: string
}

export default function FooterCMS() {
  const [data, setData] = useState({
    companyDescription: '',
    footerLinks: [{ label: '', href: '' }],
    socialLinks: [{ platform: '', url: '' }],
    copyright: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/api/footer')
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
      const res = await fetch('/api/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('Footer updated')
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

  function addFooterLink() {
    setData({ ...data, footerLinks: [...data.footerLinks, { label: '', href: '' }] })
  }

  function updateFooterLink(index: number, field: keyof FooterLink, value: string) {
    const links = [...data.footerLinks]
    links[index] = { ...links[index], [field]: value }
    setData({ ...data, footerLinks: links })
  }

  function removeFooterLink(index: number) {
    setData({ ...data, footerLinks: data.footerLinks.filter((_, i) => i !== index) })
  }

  function addSocialLink() {
    setData({ ...data, socialLinks: [...data.socialLinks, { platform: '', url: '' }] })
  }

  function updateSocialLink(index: number, field: keyof SocialLink, value: string) {
    const links = [...data.socialLinks]
    links[index] = { ...links[index], [field]: value }
    setData({ ...data, socialLinks: links })
  }

  function removeSocialLink(index: number) {
    setData({ ...data, socialLinks: data.socialLinks.filter((_, i) => i !== index) })
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-emerald-500 text-sm">Loading...</div></div>
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-white font-bold">Footer</h1>
        <p className="text-surface-400 text-sm mt-1">Manage the footer content</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSave} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">Company Description</label>
          <textarea value={data.companyDescription} onChange={(e) => setData({ ...data, companyDescription: e.target.value })}
            className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" rows={3} />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">Copyright</label>
          <input type="text" value={data.copyright} onChange={(e) => setData({ ...data, copyright: e.target.value })}
            className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-surface-300">Footer Links</label>
            <button type="button" onClick={addFooterLink} className="text-sm text-emerald-400 hover:text-emerald-300">+ Add Link</button>
          </div>
          {data.footerLinks.map((link, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={link.label} onChange={(e) => updateFooterLink(i, 'label', e.target.value)}
                className="flex-1 px-4 py-2 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Label" />
              <input type="text" value={link.href} onChange={(e) => updateFooterLink(i, 'href', e.target.value)}
                className="flex-1 px-4 py-2 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="URL" />
              <button type="button" onClick={() => removeFooterLink(i)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30">×</button>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-surface-300">Social Links</label>
            <button type="button" onClick={addSocialLink} className="text-sm text-emerald-400 hover:text-emerald-300">+ Add Social</button>
          </div>
          {data.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={link.platform} onChange={(e) => updateSocialLink(i, 'platform', e.target.value)}
                className="flex-1 px-4 py-2 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Platform" />
              <input type="url" value={link.url} onChange={(e) => updateSocialLink(i, 'url', e.target.value)}
                className="flex-1 px-4 py-2 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="URL" />
              <button type="button" onClick={() => removeSocialLink(i)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30">×</button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  )
}
