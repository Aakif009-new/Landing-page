'use client'

import { Button } from '@/components/ui/Button'
import { HeroScene } from '@/components/three/HeroScene'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const metrics = [
  { value: '184.3', label: 'MW Capacity', suffix: ' MW' },
  { value: '1200+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
]

function MetricCard({
  value,
  label,
  delay,
}: {
  value: string
  label: string
  delay: number
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.5 })

  return (
    <div
      ref={ref}
      className="text-center transition-all duration-700"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <div className="text-2xl md:text-3xl font-bold text-near-black font-heading tracking-tight">
        {value}
        {value === '184.3' && (
          <span className="text-lg md:text-xl text-surface-400 font-normal ml-0.5">MW</span>
        )}
      </div>
      <div className="text-xs md:text-sm text-surface-500 font-medium mt-1">{label}</div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-emerald-50/30 via-white to-white">
      <div className="absolute inset-0 z-0">
        <HeroScene className="w-full h-full" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/0 to-white/80 z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Powering A Sustainable Tomorrow
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-near-black font-heading tracking-tight leading-[0.9] mb-6">
              Clean Energy
              <br />
              <span className="text-emerald-600">For The Future</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-surface-500 leading-relaxed mb-10">
              Xurya designs and deploys renewable energy systems for homes, factories, and cities — delivering measurable savings, resilience, and zero-emission impact at scale.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={550}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
              <Button variant="primary" size="lg" href="#contact">
                Start Your Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
              <Button variant="outline" size="lg" href="#case-study">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Watch How It Works
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={700}>
            <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-lg mx-auto">
              {metrics.map((metric, i) => (
                <MetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  delay={700 + i * 150}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-surface-400">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-surface-300 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-surface-500 rounded-full animate-[scroll-indicator_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
