'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

interface ServiceItem {
  _id?: string
  name: string
  description: string
  specifications: string[]
  image: string
  displayOrder: number
  active: boolean
}

const defaults: ServiceItem[] = [
  {
    name: 'Residential Solar Panels',
    description: 'Custom rooftop systems that cut electricity bills by up to 70% with elegant, low-profile designs.',
    specifications: ['High-efficiency monocrystalline panels', '25-year performance warranty', 'Smart inverter included'],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
    active: true,
  },
]

export function Solutions() {
  const [services, setServices] = useState<ServiceItem[]>(defaults)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    fetch('/api/featured-products')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.data?.length) {
          const active = json.data.filter((p: ServiceItem) => p.active).sort((a: ServiceItem, b: ServiceItem) => a.displayOrder - b.displayOrder)
          if (active.length) setServices(active)
        }
      })
      .catch(() => {})
  }, [])

  const current = services[activeIndex] || services[0]

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
                {current.name}
              </p>
              <p className="text-surface-500 leading-relaxed mb-7 max-w-[420px]">{current.description}</p>
              {current.specifications?.length > 0 && (
                <div className="space-y-2 mb-8">
                  {current.specifications.map((spec) => (
                    <p key={spec} className="text-sm text-near-black">
                      {spec}
                    </p>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                {services.map((service, i) => (
                  <button
                    key={service._id || service.name}
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
                  {current.image && (
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/55 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-white/80 text-xs tracking-[0.2em] uppercase mb-2">featured collection</p>
                  <h3 className="text-white font-heading text-xl md:text-2xl max-w-md">{current.name}</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
