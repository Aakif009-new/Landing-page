import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { WhyXurya } from '@/components/sections/WhyXurya'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Xurya | Renewable Energy Solutions',
  description: 'We are a dedicated team of energy experts passionate about accelerating solar adoption worldwide with premium renewable energy systems.',
  openGraph: {
    title: 'About Xurya | Renewable Energy Solutions',
    description: 'Learn about our mission to deliver clean energy solutions for homes, factories, and cities.',
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyXurya />
      <Sustainability />
      <Footer />
    </>
  )
}
