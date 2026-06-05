import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Solutions } from '@/components/sections/Solutions'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import { GeoContent } from '@/components/sections/GeoContent'
import { getSeoForPage } from '@/lib/seo-utils'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage('solutions')
  return {
    title: seo.title || 'Solar Solutions | Xurya',
    description: seo.description || 'Explore our premium solar energy solutions — residential, commercial, and industrial systems.',
    keywords: seo.keywords || 'solar solutions, residential solar, commercial solar, industrial solar, Xurya',
    openGraph: {
      title: seo.ogTitle || seo.title || 'Solar Solutions | Xurya',
      description: seo.ogDescription || seo.description || 'Custom solar energy solutions for every scale.',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default function SolutionsPage() {
  return (
    <>
      <JsonLd page="solutions" />
      <Navbar />
      <Hero />
      <Solutions />
      <GeoContent section="solutions" />
      <Sustainability />
      <Footer />
    </>
  )
}
