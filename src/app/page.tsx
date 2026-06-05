import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Trust } from '@/components/sections/Trust'
import { WhyXurya } from '@/components/sections/WhyXurya'
import { Solutions } from '@/components/sections/Solutions'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { Performance } from '@/components/sections/Performance'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import { getSeoForPage } from '@/lib/seo-utils'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage('home')
  return {
    title: seo.title || 'Xurya — Clean Energy For The Future',
    description: seo.description || 'Xurya designs and deploys renewable energy systems for homes, factories, and cities.',
    keywords: seo.keywords || 'solar energy, renewable energy, clean power, solar panels, Xurya',
    openGraph: {
      title: seo.ogTitle || seo.title || 'Xurya — Clean Energy For The Future',
      description: seo.ogDescription || seo.description || 'Premium renewable energy solutions for residential, commercial, and industrial applications.',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default function Home() {
  return (
    <>
      <JsonLd page="home" />
      <Navbar />
      <Hero />
      <Trust />
      <WhyXurya />
      <Solutions />
      <CaseStudy />
      <Performance />
      <Sustainability />
      <Footer />
    </>
  )
}
