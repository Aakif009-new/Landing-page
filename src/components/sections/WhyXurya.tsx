'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Predictive Maintenance',
    description: 'AI-driven insights anticipate equipment needs, reducing downtime by up to 40% and extending system lifespan.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Smart Energy Analytics',
    description: 'Real-time dashboards provide granular visibility into generation, consumption, and grid interaction.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    title: 'AI Monitoring',
    description: 'Machine learning models detect anomalies and optimize energy flow across distributed assets in real time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Quality Control',
    description: 'Rigorous testing and certification ensure every component meets international standards for safety and performance.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Carbon Tracking',
    description: 'Comprehensive lifecycle analysis quantifies emissions avoided and supports sustainability reporting frameworks.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    description: 'Dedicated engineers provide around-the-clock monitoring, rapid response, and proactive system management.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
]

export function WhyXurya() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16 md:mb-20">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-near-black font-heading tracking-tight leading-[1.1] mb-4">
              We offer quality, with the best materials and service.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-lg text-surface-500 leading-relaxed">
              Every detail is engineered with precision, safety, and sustainability.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={100 + i * 80}>
              <div
                className={cn(
                  'group p-6 md:p-8 rounded-2xl border border-surface-100 bg-white',
                  'transition-all duration-300 hover:border-emerald-100 hover:bg-emerald-50/30 hover:shadow-sm hover:shadow-emerald-500/5',
                  'cursor-default'
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-near-black font-heading mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-surface-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
