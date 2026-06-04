'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardMetrics {
  totalProducts: number
  totalImages: number
  totalSections: number
  lastUpdated: string
  recentActivity: { action: string; section: string; timestamp: string }[]
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('/api/dashboard')
        if (res.ok) {
          const data = await res.json()
          setMetrics(data.data)
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [])

  const cards = [
    { label: 'Total Products', value: metrics?.totalProducts ?? 0, href: '/admin/products', color: 'emerald' },
    { label: 'Total Images', value: metrics?.totalImages ?? 0, href: '/admin/media', color: 'blue' },
    { label: 'CMS Sections', value: metrics?.totalSections ?? 8, href: '/admin/hero', color: 'purple' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading text-white font-bold">Dashboard</h1>
        <p className="text-surface-400 text-sm mt-1">Overview of your Xurya content management system</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3 mb-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 hover:border-surface-600 transition-colors">
            <p className="text-surface-400 text-sm">{card.label}</p>
            {loading ? (
              <div className="h-8 w-16 bg-surface-700 rounded mt-2 animate-pulse" />
            ) : (
              <p className="text-3xl font-heading text-white font-bold mt-1">{card.value}</p>
            )}
          </Link>
        ))}
      </div>

      <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6">
        <h2 className="text-white font-heading font-bold text-lg mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Edit Hero', href: '/admin/hero' },
            { label: 'Edit About', href: '/admin/about' },
            { label: 'Manage Products', href: '/admin/products' },
            { label: 'Manage Featured', href: '/admin/featured-products' },
            { label: 'Edit CTA', href: '/admin/cta' },
            { label: 'Media Library', href: '/admin/media' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-3 bg-surface-700 hover:bg-surface-600 rounded-lg text-surface-300 hover:text-white text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {metrics && metrics.recentActivity.length > 0 && (
        <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6 mt-5">
          <h2 className="text-white font-heading font-bold text-lg mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {metrics.recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-surface-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-surface-300 text-sm">{activity.action}</span>
                  <span className="text-surface-500 text-xs bg-surface-700 px-2 py-0.5 rounded">{activity.section}</span>
                </div>
                <span className="text-surface-500 text-xs">{new Date(activity.timestamp).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
