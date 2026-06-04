'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

const logos = [
  { name: 'Nordpak', width: 140 },
  { name: 'GreenGrid', width: 160 },
  { name: 'EcoVault', width: 130 },
  { name: 'SunCore', width: 150 },
  { name: 'VerdeCorp', width: 145 },
  { name: 'Aether Energy', width: 165 },
  { name: 'Polaris Renewables', width: 155 },
  { name: 'ClimeTech', width: 135 },
]

function LogoBlock({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="flex-shrink-0 h-12 flex items-center justify-center px-8"
      style={{ width: `${width + 64}px` }}
    >
      <span
        className="text-surface-300 font-heading font-bold tracking-tight text-lg whitespace-nowrap transition-colors duration-300 hover:text-surface-400"
      >
        {name}
      </span>
    </div>
  )
}

export function Trust() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-surface-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-surface-400 mb-10">
            Trusted By Industry Leaders
          </p>
        </ScrollReveal>

        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-marquee">
            {[...logos, ...logos].map((logo, i) => (
              <LogoBlock key={`${logo.name}-${i}`} {...logo} />
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
