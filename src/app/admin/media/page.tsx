'use client'

import { useEffect, useState, FormEvent, useRef, startTransition } from 'react'

interface MediaItem {
  _id: string
  url: string
  publicId: string
  section: string
  uploadedAt: string
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [section, setSection] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (section) params.set('section', section)
    fetch(`/api/media?${params}`)
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!cancelled && json?.data) startTransition(() => setMedia(json.data))
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [search, section])

  async function fetchMedia() {
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (section) params.set('section', section)
      const res = await fetch(`/api/media?${params}`)
      if (res.ok) {
        const data = await res.json()
        setMedia(data.data || [])
      }
    } catch {
      setError('Failed to load media')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e: FormEvent) {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage('')
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('section', section || 'general')

      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        setMessage('File uploaded successfully')
        if (fileRef.current) fileRef.current.value = ''
        fetchMedia()
      } else {
        const data = await res.json()
        setError(data.error || 'Upload failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this file?')) return
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessage('File deleted')
        fetchMedia()
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
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-white font-bold">Media Library</h1>
        <p className="text-surface-400 text-sm mt-1">Upload and manage images</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleUpload} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-4 mb-6">
        <h2 className="text-white font-heading font-bold text-lg">Upload New File</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">Section</label>
            <select value={section} onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="">General</option>
              <option value="hero">Hero</option>
              <option value="about">About</option>
              <option value="products">Products</option>
              <option value="featured">Featured</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">File</label>
            <input type="file" ref={fileRef} accept="image/*"
              className="w-full text-sm text-surface-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={uploading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {media.length === 0 ? (
          <div className="col-span-full p-8 text-center text-surface-400 text-sm bg-surface-800 border border-surface-700 rounded-2xl">No media uploaded yet.</div>
        ) : (
          media.map((item) => (
            <div key={item._id} className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden group">
              <div className="relative aspect-square">
                <img src={item.url} alt={item.publicId} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-surface-400 text-xs truncate">{item.publicId}</p>
                <p className="text-surface-500 text-[10px] mt-0.5">{item.section || 'general'}</p>
                <button onClick={() => handleDelete(item._id)} className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
