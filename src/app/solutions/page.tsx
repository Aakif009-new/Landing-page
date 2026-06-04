import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Solutions } from '@/components/sections/Solutions'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solar Solutions | Xurya',
  description: 'Explore our premium solar energy solutions — residential, commercial, and industrial systems designed for maximum efficiency.',
  openGraph: {
    title: 'Solar Solutions | Xurya',
    description: 'Custom solar energy solutions for every scale — from home rooftops to industrial installations.',
  },
}

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Solutions />
      <Sustainability />
      <Footer />
    </>
  )
}
