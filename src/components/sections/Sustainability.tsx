'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'

export function Sustainability() {
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
                  Switch to the solar
                  <br />
                  energy for a brighter world.
                </h2>
                <p className="mt-3 text-surface-300 max-w-[500px] text-[15px]">
                  Reliable solutions from strategy to installation, built for long-term performance.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Button variant="outline" size="md" href="#services" className="bg-white text-near-black border-0 hover:bg-surface-100">
                    Explore More
                  </Button>
                  <Button variant="ghost" size="md" href="mailto:hello@xurya.energy" className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
                    Book Now
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
