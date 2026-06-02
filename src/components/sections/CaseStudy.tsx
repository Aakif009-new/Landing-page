'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const metrics = [
  { value: '8.4', label: 'MW Installed Capacity', suffix: ' MW' },
  { value: '62%', label: 'Energy Cost Reduction' },
  { value: '11,200', label: 't CO₂ Offset Annually', suffix: '' },
]

export function CaseStudy() {
  return (
    <section id="case-study" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-semibold tracking-widest uppercase mb-5">
              Case Study
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-near-black font-heading tracking-tight leading-[1.1] mb-4">
              How Nordpak cut energy costs by{' '}
              <span className="text-emerald-600">62%</span> in 9 months.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg text-surface-500 leading-relaxed">
              A comprehensive renewable energy transformation for one of Southeast Asia&apos;s largest packaging manufacturers.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <ScrollReveal delay={250}>
              <div className="group relative rounded-2xl overflow-hidden bg-surface-900 aspect-[4/3] lg:aspect-auto lg:h-[400px]">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src="/images/industrial-solar.jpg"
                    alt="Industrial rooftop solar panel installation at Nordpak facility"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold font-heading text-lg">
                      N
                    </div>
                    <div>
                      <div className="text-white font-semibold font-heading">Nordpak Industries</div>
                      <div className="text-white/60 text-sm">Packaging Manufacturer</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <div className="mt-6 p-6 md:p-8 rounded-2xl border border-surface-100 bg-surface-50/50">
                <div className="flex items-start gap-4">
                  <div className="text-emerald-600 flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base md:text-lg text-surface-700 leading-relaxed italic">
                      &ldquo;Xurya transformed our energy infrastructure. The ROI exceeded projections, and the installation was seamless. We now run 60% of our operations on clean energy.&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-near-black text-sm">Thomas Chen</div>
                        <div className="text-surface-500 text-xs">Chief Sustainability Officer, Nordpak</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {metrics.map((metric, i) => (
              <ScrollReveal key={metric.label} delay={300 + i * 100}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 p-6 md:p-8 rounded-2xl border border-surface-100 bg-white hover:border-emerald-100 transition-colors duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-near-black font-heading tracking-tight">
                    {metric.value}
                    {metric.suffix && (
                      <span className="text-lg md:text-xl text-surface-400 font-normal ml-1">{metric.suffix}</span>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-surface-500 font-medium">{metric.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={600}>
              <a
                href="#contact"
                className="group flex items-center justify-between p-6 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors duration-300"
              >
                <span className="font-semibold font-heading">Read Full Case Study</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
