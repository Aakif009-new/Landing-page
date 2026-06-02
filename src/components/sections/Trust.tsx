'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function Trust() {
  return (
    <section className="py-14 md:py-16 bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="border-y border-surface-200 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[11px] tracking-[0.2em] uppercase text-surface-400">Trusted Solar Engineering</p>
            <div className="flex items-center gap-8">
              <p className="font-heading text-2xl text-near-black">184.3 MW</p>
              <p className="text-sm text-surface-500">installed clean energy capacity</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
