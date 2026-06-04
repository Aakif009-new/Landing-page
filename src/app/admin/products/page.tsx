'use client'

import { useEffect, useState, FormEvent, startTransition } from 'react'

interface Product {
  _id?: string
  name: string
  category: string
  description: string
  image: string
  specifications: string[]
  featured: boolean
  displayOrder: number
}

const emptyProduct = (): Product => ({
  name: '',
  category: '',
  description: '',
  image: '',
  specifications: [''],
  featured: false,
  displayOrder: 0,
})

export default function ProductsCMS() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Product | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    let cancelled = false
    const params = new URLSearchParams({ page: page.toString(), limit: '10' })
    if (search) params.set('search', search)
    fetch(`/api/products?${params}`)
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!cancelled && json?.data) {
          startTransition(() => {
            setProducts(json.data.products || [])
            setTotalPages(json.data.pagination?.totalPages || 1)
          })
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [page, search])

  async function fetchProducts() {
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '10' })
      if (search) params.set('search', search)
      const res = await fetch(`/api/products?${params}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data.data?.products || [])
        setTotalPages(data.data?.pagination?.totalPages || 1)
      }
    } catch {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    setMessage('')
    setError('')

    const specs = editing.specifications.filter((s) => s.trim())

    try {
      const isNew = !editing._id
      const url = isNew ? '/api/products' : `/api/products/${editing._id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, specifications: specs }),
      })

      if (res.ok) {
        setMessage(isNew ? 'Product created' : 'Product updated')
        setEditing(null)
        fetchProducts()
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
    if (!confirm('Delete this product?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessage('Product deleted')
        fetchProducts()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete')
      }
    } catch {
      setError('Network error')
    }
  }

  function addSpec() {
    if (editing) {
      setEditing({ ...editing, specifications: [...editing.specifications, ''] })
    }
  }

  function updateSpec(index: number, value: string) {
    if (editing) {
      const specs = [...editing.specifications]
      specs[index] = value
      setEditing({ ...editing, specifications: specs })
    }
  }

  function removeSpec(index: number) {
    if (editing) {
      const specs = editing.specifications.filter((_, i) => i !== index)
      setEditing({ ...editing, specifications: specs })
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-emerald-500 text-sm">Loading...</div></div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading text-white font-bold">Products</h1>
          <p className="text-surface-400 text-sm mt-1">Manage your product catalog</p>
        </div>
        <button onClick={() => setEditing(emptyProduct())} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">Add Product</button>
      </div>

      <div className="mb-4">
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search products..." className="w-full max-w-xs px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 mb-4">{message}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">{error}</div>}

      {editing && (
        <form onSubmit={handleSave} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5 mb-6">
          <h2 className="text-white font-heading font-bold">{editing._id ? 'Edit Product' : 'New Product'}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Product Name</label>
              <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Category</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="">Select category</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Display Order</label>
              <input type="number" value={editing.displayOrder} onChange={(e) => setEditing({ ...editing, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-surface-300 pt-6">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="rounded bg-surface-700 border-surface-600 text-emerald-600 focus:ring-emerald-500" />
                Featured
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Description</label>
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" rows={3} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Image URL</label>
              <input type="url" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
              {editing.image && (
                <div className="mt-2 relative w-24 h-16 rounded-lg overflow-hidden">
                  <img src={editing.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Specifications</label>
              {editing.specifications.map((spec, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" value={spec} onChange={(e) => updateSpec(i, e.target.value)}
                    className="flex-1 px-4 py-2 bg-surface-700 border border-surface-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder={`Specification ${i + 1}`} />
                  <button type="button" onClick={() => removeSpec(i)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">×</button>
                </div>
              ))}
              <button type="button" onClick={addSpec} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">+ Add Specification</button>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2.5 bg-surface-700 text-surface-300 rounded-lg text-sm hover:bg-surface-600 transition-colors">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-surface-800 border border-surface-700 rounded-2xl overflow-hidden">
        {products.length === 0 ? (
          <div className="p-8 text-center text-surface-400 text-sm">No products yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  <th className="text-left px-4 py-3 text-surface-400 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-surface-400 font-medium">Category</th>
                  <th className="text-left px-4 py-3 text-surface-400 font-medium">Featured</th>
                  <th className="text-right px-4 py-3 text-surface-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-surface-700 last:border-0">
                    <td className="px-4 py-3 text-white">{product.name}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-surface-700 text-surface-300 rounded text-xs">{product.category}</span></td>
                    <td className="px-4 py-3">{product.featured ? <span className="text-emerald-400">Yes</span> : <span className="text-surface-500">No</span>}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setEditing(product)} className="text-emerald-400 hover:text-emerald-300 text-sm mr-3">Edit</button>
                      <button onClick={() => handleDelete(product._id!)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
            className="px-3 py-1.5 bg-surface-700 text-surface-300 rounded-lg text-sm disabled:opacity-50 hover:bg-surface-600 transition-colors">Previous</button>
          <span className="text-surface-400 text-sm">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
            className="px-3 py-1.5 bg-surface-700 text-surface-300 rounded-lg text-sm disabled:opacity-50 hover:bg-surface-600 transition-colors">Next</button>
        </div>
      )}
    </div>
  )
}
