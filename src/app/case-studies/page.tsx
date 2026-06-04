import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies | Xurya',
  description: 'Real-world renewable energy transformations — see how our clients cut costs and carbon emissions with Xurya solar solutions.',
  openGraph: {
    title: 'Case Studies | Xurya',
    description: 'Discover how businesses achieved energy independence with Xurya solar installations.',
  },
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <CaseStudy />
      <Sustainability />
      <Footer />
    </>
  )
}
