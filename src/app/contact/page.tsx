import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Xurya',
  description: 'Get in touch with Xurya for solar energy consultations, quotes, and support. Start your clean energy journey today.',
  openGraph: {
    title: 'Contact Xurya',
    description: 'Ready to switch to solar? Contact our team for a free consultation and custom proposal.',
  },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sustainability />
      <Footer />
    </>
  )
}
