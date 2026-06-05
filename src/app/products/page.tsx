import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Performance } from '@/components/sections/Performance'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import { GeoContent } from '@/components/sections/GeoContent'
import { getSeoForPage } from '@/lib/seo-utils'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage('products')
  return {
    title: seo.title || 'Solar Products | Xurya',
    description: seo.description || 'High-performance solar panels, smart inverters, and battery storage systems.',
    keywords: seo.keywords || 'solar panels, solar products, inverters, battery storage, Xurya',
    openGraph: {
      title: seo.ogTitle || seo.title || 'Solar Products | Xurya',
      description: seo.ogDescription || seo.description || 'Explore our technology and system packages.',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default function ProductsPage() {
  return (
    <>
      <JsonLd page="products" />
      <Navbar />
      <Hero />
      <Performance />
      <GeoContent section="products" />
      <Sustainability />
      <Footer />
    </>
  )
}
