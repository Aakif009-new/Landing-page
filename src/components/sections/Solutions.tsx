'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sun, Building2, Factory, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

const services = [
  {
    title: 'Residential Solar Panels',
    description: 'Custom rooftop systems that cut electricity bills by up to 70% with elegant, low-profile designs.',
    color: 'from-emerald-500 to-emerald-600',
    icon: Sun,
  },
  {
    title: 'Commercial Solar Systems',
    description: 'Scalable solar solutions for businesses seeking predictable energy costs and strong ESG performance.',
    color: 'from-emerald-600 to-emerald-700',
    icon: Building2,
  },
  {
    title: 'Industrial Renewable Energy',
    description: 'High-capacity installations for manufacturing, logistics, and heavy industry with guaranteed uptime.',
    color: 'from-emerald-700 to-emerald-800',
    icon: Factory,
  },
  {
    title: 'EV Charging Infrastructure',
    description: 'End-to-end EV charging networks integrated with renewable generation and smart load management.',
    color: 'from-emerald-500 to-teal-600',
    icon: Zap,
  },
]

export function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" className="py-24 md:py-32 bg-surface-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16 md:mb-20">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-near-black font-heading tracking-tight leading-[1.1] mb-4">
              Renewable solutions,{' '}
              <span className="text-emerald-600">end to end.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-lg text-surface-500 leading-relaxed">
              From residential rooftops to industrial-scale installations, we deliver comprehensive clean energy systems.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <ScrollReveal delay={200}>
              <div className="group relative rounded-2xl overflow-hidden bg-surface-900 aspect-[4/3] lg:aspect-auto lg:h-[500px]">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src="/images/solar-home.jpg"
                    alt="Residential solar panel installation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-near-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs font-medium mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Featured Solution
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-heading">
                    {services[activeIndex].title}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2 space-y-3">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <ScrollReveal key={service.title} delay={200 + i * 80}>
                  <motion.button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'w-full text-left p-5 md:p-6 rounded-xl border transition-all duration-300',
                      activeIndex === i
                        ? 'border-emerald-200 bg-white shadow-sm'
                        : 'border-surface-100 bg-white hover:border-surface-200 hover:shadow-sm'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300',
                          activeIndex === i
                            ? 'bg-emerald-600 text-white'
                            : 'bg-surface-200 text-surface-500'
                        )}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={cn(
                            'font-semibold font-heading transition-colors duration-300',
                            activeIndex === i ? 'text-near-black' : 'text-surface-700'
                          )}
                        >
                          {service.title}
                        </h4>
                        <p
                          className={cn(
                            'text-sm mt-1 leading-relaxed transition-all duration-300 max-h-0 overflow-hidden',
                            activeIndex === i ? 'max-h-20 text-surface-500 mt-1.5' : 'text-surface-400'
                          )}
                        >
                          {service.description}
                        </p>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn(
                          'flex-shrink-0 transition-all duration-300 mt-1',
                          activeIndex === i ? 'text-emerald-600 rotate-45' : 'text-surface-300'
                        )}
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </motion.button>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
