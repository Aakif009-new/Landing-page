'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 1200, label: 'Projects Completed', suffix: '+' },
  { value: 184300, label: 'MWh Energy Generated', suffix: ' MWh' },
  { value: 125000, label: 'Tonnes CO₂ Reduced', suffix: '+', prefix: '' },
  { value: 8, label: 'Countries Served' },
]

export function Performance() {
  return (
    <section className="py-24 md:py-32 bg-white border-y border-surface-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-near-black font-heading tracking-tight leading-[1.1]">
              Our impact by the numbers.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={100 + i * 100}>
              <AnimatedCounter
                end={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="relative mt-20 md:mt-24">
          <ScrollReveal delay={400}>
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100/50">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold tracking-widest uppercase mb-4">
                    Our Commitment
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-near-black font-heading tracking-tight leading-[1.1] mb-3">
                    Every megawatt counts toward a cleaner planet.
                  </h3>
                  <p className="text-surface-500 leading-relaxed">
                    We measure success not just in revenue, but in emissions avoided, families empowered, and communities transformed.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'UN SDG Alignment', value: '7, 11, 13' },
                    { label: 'ISO Certification', value: '14001, 50001' },
                    { label: 'Projects Audited', value: '100%' },
                    { label: 'Warranty Coverage', value: '25 Years' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl bg-white border border-surface-100"
                    >
                      <div className="text-xs text-surface-400 font-medium mb-1">{item.label}</div>
                      <div className="text-base font-bold text-near-black font-heading">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
