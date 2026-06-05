'use client'

import { useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface GeoData {
  companySummary: string
  businessDescription: string
  servicesOverview: string
  productsOverview: string
  industryOverview: string
  whyChooseXurya: string
  faqSection: string
  caseStudySummary: string
}

const defaults: GeoData = {
  companySummary: '',
  businessDescription: '',
  servicesOverview: '',
  productsOverview: '',
  industryOverview: '',
  whyChooseXurya: '',
  faqSection: '',
  caseStudySummary: '',
}

const sectionKeys: Record<string, keyof GeoData> = {
  about: 'companySummary',
  solutions: 'servicesOverview',
  products: 'productsOverview',
  caseStudies: 'caseStudySummary',
}

export function GeoContent({ section }: { section: string }) {
  const [data, setData] = useState<GeoData>(defaults)

  useEffect(() => {
    fetch('/api/geo')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.data) setData({ ...defaults, ...json.data })
      })
      .catch(() => {})
  }, [])

  const contentKey = sectionKeys[section]
  const content = contentKey ? data[contentKey] : ''

  if (!content) return null

  return (
    <section className="bg-soft-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <p className="text-surface-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {content}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
