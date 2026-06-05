import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { WhyXurya } from '@/components/sections/WhyXurya'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import { GeoContent } from '@/components/sections/GeoContent'
import { getSeoForPage } from '@/lib/seo-utils'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage('about')
  return {
    title: seo.title || 'About Xurya | Renewable Energy Solutions',
    description: seo.description || 'We are a dedicated team of energy experts passionate about accelerating solar adoption worldwide.',
    keywords: seo.keywords || 'about Xurya, solar energy company, renewable energy team',
    openGraph: {
      title: seo.ogTitle || seo.title || 'About Xurya | Renewable Energy Solutions',
      description: seo.ogDescription || seo.description || 'Learn about our mission to deliver clean energy solutions.',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default function AboutPage() {
  return (
    <>
      <JsonLd page="about" />
      <Navbar />
      <Hero />
      <WhyXurya />
      <GeoContent section="about" />
      <Sustainability />
      <Footer />
    </>
  )
}
