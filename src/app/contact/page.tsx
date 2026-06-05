import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import { getSeoForPage } from '@/lib/seo-utils'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage('contact')
  return {
    title: seo.title || 'Contact Xurya',
    description: seo.description || 'Get in touch with Xurya for solar energy consultations and support.',
    keywords: seo.keywords || 'contact Xurya, solar consultation, solar energy quote',
    openGraph: {
      title: seo.ogTitle || seo.title || 'Contact Xurya',
      description: seo.ogDescription || seo.description || 'Ready to switch to solar? Contact our team.',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default function ContactPage() {
  return (
    <>
      <JsonLd page="contact" />
      <Navbar />
      <Hero />
      <Sustainability />
      <Footer />
    </>
  )
}
