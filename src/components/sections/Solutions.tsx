'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

const services = [
  {
    title: 'Suncryst EdgeTech 500W Module Dual-Layer PERC',
    description: 'High-efficiency panel architecture designed for dense rooftops and long-term durability.',
    specs: ['Special Edition Product', '500W Output / 22% Efficiency', 'Mono N-type Cell + Rear Contact'],
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'SolarNova GridCell 550W',
    description: 'Engineered for utility-scale fields where performance stability and heat tolerance are critical.',
    specs: ['550W Utility-Class Panel', 'Dual Glass + 30 Year Warranty', 'Optimized for Harsh Climates'],
    image: 'https://images.unsplash.com/photo-1611365892117-00c13b8f8fba?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'HelioMax TriPhase 533W',
    description: 'Commercial-grade module tuned for factories and campuses needing reliable daytime output.',
    specs: ['533W Commercial Panel', 'Smart Junction Monitoring', 'High Precision Engineering'],
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
  },
]

export function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" className="py-14 md:py-20 bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.2em] uppercase text-surface-400 mb-4">[ Premium Product ]</p>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-stretch">
          <ScrollReveal delay={120}>
            <div className="rounded-[32px] p-7 md:p-8 bg-white border border-surface-100 h-full">
              <p className="font-heading text-[31px] md:text-[44px] leading-[1.05] text-near-black max-w-lg mb-4">
                {services[activeIndex].title}
              </p>
              <p className="text-surface-500 leading-relaxed mb-7 max-w-[420px]">{services[activeIndex].description}</p>
              <div className="space-y-2 mb-8">
                {services[activeIndex].specs.map((spec) => (
                  <p key={spec} className="text-sm text-near-black">
                    {spec}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {services.map((service, i) => (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      'px-4 py-2 rounded-full border text-xs uppercase tracking-[0.18em] transition-colors',
                      activeIndex === i ? 'bg-near-black text-white border-near-black' : 'bg-white border-surface-300 text-surface-500 hover:border-surface-500'
                    )}
                  >
                    {`0${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal delay={180}>
              <div className="group relative rounded-[32px] overflow-hidden bg-surface-900 min-h-[430px] md:min-h-[520px]">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={services[activeIndex].image}
                    alt={services[activeIndex].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/55 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-white/80 text-xs tracking-[0.2em] uppercase mb-2">featured collection</p>
                  <h3 className="text-white font-heading text-xl md:text-2xl max-w-md">{services[activeIndex].title}</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
