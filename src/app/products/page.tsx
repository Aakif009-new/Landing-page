import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Performance } from '@/components/sections/Performance'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solar Products | Xurya',
  description: 'High-performance solar panels, smart inverters, and battery storage systems engineered for reliability and efficiency.',
  openGraph: {
    title: 'Solar Products | Xurya',
    description: 'Explore our technology and system packages for clean energy generation and storage.',
  },
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Performance />
      <Sustainability />
      <Footer />
    </>
  )
}
