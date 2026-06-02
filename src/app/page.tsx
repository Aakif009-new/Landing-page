import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Trust } from '@/components/sections/Trust'
import { WhyXurya } from '@/components/sections/WhyXurya'
import { Solutions } from '@/components/sections/Solutions'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { Performance } from '@/components/sections/Performance'
import { Sustainability } from '@/components/sections/Sustainability'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
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
