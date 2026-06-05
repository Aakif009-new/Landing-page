import { Navbar } from '@/components/sections/Navbar'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import { GeoContent } from '@/components/sections/GeoContent'
import { getSeoForPage } from '@/lib/seo-utils'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage('caseStudies')
  return {
    title: seo.title || 'Case Studies | Xurya',
    description: seo.description || 'Real-world renewable energy transformations with Xurya solar solutions.',
    keywords: seo.keywords || 'solar case studies, renewable energy projects, Xurya installations',
    openGraph: {
      title: seo.ogTitle || seo.title || 'Case Studies | Xurya',
      description: seo.ogDescription || seo.description || 'Discover how businesses achieved energy independence.',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd page="caseStudies" />
      <Navbar />
      <CaseStudy />
      <GeoContent section="caseStudies" />
      <Sustainability />
      <Footer />
    </>
  )
}
