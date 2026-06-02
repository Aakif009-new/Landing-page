'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const products = [
  {
    title: 'SolarNova UltraCell 550W',
    subtitle: 'Mono Standard Boost Series for all climates',
    image: 'https://images.unsplash.com/photo-1595437193398-f24279553f4f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Suncryst EdgeTech 500W',
    subtitle: 'Module Dual-Layer PERC cell with AI control',
    image: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'HelioMax TriPhase 533W',
    subtitle: 'Panel precision engineered for solar efficiency',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80',
  },
]

export function Performance() {
  return (
    <section className="py-14 md:py-20 bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <p className="text-[11px] tracking-[0.2em] uppercase text-surface-400 mb-4">[ Our Product ]</p>
            <h2 className="font-heading text-3xl md:text-[52px] leading-[1.02] tracking-tight text-near-black">
              Explore our technology
              <br />
              and system packages
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {products.map((product, i) => (
            <ScrollReveal key={product.title} delay={120 + i * 90}>
              <div className="group h-full flex flex-col">
                <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] min-h-[290px] mb-4">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                </div>
                <h3 className="font-heading text-lg text-near-black">{product.title}</h3>
                <p className="text-sm text-surface-500 mt-1 max-w-[260px]">{product.subtitle}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
