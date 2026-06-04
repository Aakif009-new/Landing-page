'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'

interface CTAData {
  heading: string
  description: string
  buttonOneText: string
  buttonOneLink: string
  buttonTwoText: string
  buttonTwoLink: string
}

const defaults: CTAData = {
  heading: 'Switch to the solar energy for a brighter world.',
  description: 'Reliable solutions from strategy to installation, built for long-term performance.',
  buttonOneText: 'Explore More',
  buttonOneLink: '#services',
  buttonTwoText: 'Book Now',
  buttonTwoLink: 'mailto:hello@xurya.energy',
}

export function Sustainability() {
  const [data, setData] = useState<CTAData>(defaults)

  useEffect(() => {
    fetch('/api/cta')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.data) {
          setData({
            heading: json.data.heading || defaults.heading,
            description: json.data.description || defaults.description,
            buttonOneText: json.data.buttonOneText || defaults.buttonOneText,
            buttonOneLink: json.data.buttonOneLink || defaults.buttonOneLink,
            buttonTwoText: json.data.buttonTwoText || defaults.buttonTwoText,
            buttonTwoLink: json.data.buttonTwoLink || defaults.buttonTwoLink,
          })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="contact" className="py-14 md:py-18 bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <motion.div whileHover={{ scale: 1.004 }} transition={{ duration: 0.3 }} className="rounded-[32px] bg-near-black text-white p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] items-center">
              <div>
                <a href="#" className="inline-flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2" />
                      <path d="M12 21v2" />
                      <path d="M4.22 4.22l1.42 1.42" />
                      <path d="M18.36 18.36l1.42 1.42" />
                    </svg>
                  </div>
                  <span className="font-heading text-lg">Xurya</span>
                </a>
                <p className="text-sm text-surface-300 leading-relaxed max-w-xs">
                  Powering clean energy systems for homes, cities, and modern industries.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl md:text-[52px] leading-[1.02] tracking-tight">
                  {data.heading.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < data.heading.split('\n').length - 1 && <br />}</span>
                  ))}
                </h2>
                <p className="mt-3 text-surface-300 max-w-[500px] text-[15px]">
                  {data.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Button variant="outline" size="md" href={data.buttonOneLink} className="bg-white text-near-black border-0 hover:bg-surface-100">
                    {data.buttonOneText}
                  </Button>
                  <Button variant="ghost" size="md" href={data.buttonTwoLink} className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
                    {data.buttonTwoText}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
