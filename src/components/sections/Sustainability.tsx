'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { ParticlesBackground } from '@/components/three/ParticlesBackground'

const contactCards = [
  {
    label: 'Email Us',
    value: 'hello@xurya.energy',
    href: 'mailto:hello@xurya.energy',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '+62 21 5091 8000',
    href: 'tel:+622150918000',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Book a Consultation',
    value: 'Schedule a call with our team',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
]

export function Sustainability() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-near-black overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/30 border border-emerald-800/40 rounded-full text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-5">
              Take Action
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading tracking-tight leading-[1.1] mb-4">
              It&apos;s time to support zero pollution with{' '}
              <span className="text-emerald-400">renewable resources.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
              Every day of inaction counts. Let&apos;s build your clean energy future — starting with a conversation.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {contactCards.map((card, i) => (
            <ScrollReveal key={card.label} delay={300 + i * 100}>
              <a
                href={card.href}
                className="group block p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-white font-heading mb-1">
                  {card.label}
                </h3>
                <p className="text-sm text-surface-400 group-hover:text-surface-300 transition-colors duration-300">
                  {card.value}
                </p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={600}>
          <div className="mt-12 p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white font-heading mb-1">
                  Ready to make the switch?
                </h3>
                <p className="text-surface-400 text-sm">
                  Get a free feasibility assessment and custom proposal within 48 hours.
                </p>
              </div>
              <Button variant="primary" size="lg" href="mailto:hello@xurya.energy">
                Start Your Assessment
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
