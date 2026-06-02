'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

const logos = [
  {
    name: 'Nordpak',
    svg: (
      <svg viewBox="0 0 120 32" className="h-7 w-auto" fill="currentColor">
        <rect x="0" y="4" width="8" height="24" rx="1" />
        <rect x="10" y="4" width="8" height="24" rx="1" opacity="0.7" />
        <rect x="20" y="4" width="8" height="24" rx="1" opacity="0.4" />
        <path d="M36 8h4l6 16h0.5l6-16h4v20h-3.5V14l-5.5 14h-1l-5.5-14v14h-3.5V8z" />
        <path d="M68 8h3.5v20H68V8zM73 8h4.5l5 12.5L88 8h4v20h-3.5V14l-5 12h-1l-5-12v14H73V8z" />
        <path d="M98 8h3.5v7h6v-7h3.5v20h-3.5v-9.5h-6v9.5H98V8z" />
      </svg>
    ),
  },
  {
    name: 'GreenGrid',
    svg: (
      <svg viewBox="0 0 130 32" className="h-7 w-auto" fill="currentColor">
        <path d="M4 24c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M16 4v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 9l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 8h3.5v7h6v-7H47v20h-3.5v-9.5h-6V28H34V8z" />
        <path d="M53 8h6.5q3.5 0 5.5 2 2 2 2 5t-2 5q-2 2-5.5 2H57v6H53V8zm3.5 3v8h2.5q2 0 3-1t1-3-1-3-3-1h-2.5z" />
        <path d="M74 8h3.5v20H74V8z" />
        <path d="M83 8h4.5l5 12.5L98 8h4v20h-3.5V14l-5 12h-1l-5-12v14H83V8z" />
        <path d="M113 28q-4 0-6-2t-2-5.5 2-5.5 6-2 6 2 2 5.5-2 5.5-6 2zm0-3q2 0 3-1t1-3.5-1-3.5-3-1-3 1-1 3.5 1 3.5 3 1z" />
      </svg>
    ),
  },
  {
    name: 'EcoVault',
    svg: (
      <svg viewBox="0 0 110 32" className="h-7 w-auto" fill="currentColor">
        <path d="M4 14c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10S4 19.5 4 14z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 8h3.5v7h6v-7H43v20h-3.5v-9.5h-6V28H30V8z" />
        <path d="M49 8h4.5l5 12.5L64 8h4v20h-3.5V14l-5 12h-1l-5-12v14H49V8z" />
        <path d="M79 8h3.5v7h6v-7H92v20h-3.5v-9.5h-6V28H79V8z" />
        <path d="M98 8h3.5v20H98V8z" />
      </svg>
    ),
  },
  {
    name: 'SunCore',
    svg: (
      <svg viewBox="0 0 110 32" className="h-7 w-auto" fill="currentColor">
        <circle cx="14" cy="14" r="5" fill="currentColor" />
        <path d="M14 2v3M14 23v3M4 14H1M27 14h-3M6.5 6.5l2 2M19.5 19.5l2 2M6.5 21.5l2-2M19.5 8.5l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M34 8h3.5v7h6v-7H47v20h-3.5v-9.5h-6V28H34V8z" />
        <path d="M53 8h6.5q3.5 0 5.5 2 2 2 2 5t-2 5q-2 2-5.5 2H57v6H53V8zm3.5 3v8h2.5q2 0 3-1t1-3-1-3-3-1h-2.5z" />
        <path d="M74 8h3.5v20H74V8zM79 8h4.5l5 12.5L94 8h4v20h-3.5V14l-5 12h-1l-5-12v14H79V8z" />
      </svg>
    ),
  },
  {
    name: 'VerdeCorp',
    svg: (
      <svg viewBox="0 0 120 32" className="h-7 w-auto" fill="currentColor">
        <path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12v12H4V16z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M10 16h12M10 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M34 8h3.5v7h6v-7H47v20h-3.5v-9.5h-6V28H34V8z" />
        <path d="M53 8h6.5q3.5 0 5.5 2 2 2 2 5t-2 5q-2 2-5.5 2H57v6H53V8zm3.5 3v8h2.5q2 0 3-1t1-3-1-3-3-1h-2.5z" />
        <path d="M74 8h3.5v20H74V8zM79 8h4.5l5 12.5L94 8h4v20h-3.5V14l-5 12h-1l-5-12v14H79V8z" />
        <path d="M104 8h3.5v7h6v-7h3.5v20h-3.5v-9.5h-6V28h-3.5V8z" />
      </svg>
    ),
  },
  {
    name: 'Aether Energy',
    svg: (
      <svg viewBox="0 0 140 32" className="h-7 w-auto" fill="currentColor">
        <path d="M4 24c0-6 4-11 10-12v-4h4v4c6 1 10 6 10 12v2H4v-2z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M14 4v4M14 24v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M34 8h3.5v20H34V8z" />
        <path d="M43 8h6.5q3.5 0 5.5 2t2 5-2 5-5.5 2h-2.5v6H43V8zm3.5 3v8h2q2 0 3-1t1-3-1-3-3-1h-2z" />
        <path d="M66 8h3.5v7h6v-7H79v20h-3.5v-9.5h-6V28H66V8z" />
        <path d="M85 8h4.5l5 12.5L100 8h4v20h-3.5V14l-5 12h-1l-5-12v14H85V8z" />
        <path d="M115 8h3.5v7h6v-7h3.5v20h-3.5v-9.5h-6V28h-3.5V8z" />
      </svg>
    ),
  },
  {
    name: 'Polaris Renewables',
    svg: (
      <svg viewBox="0 0 160 32" className="h-7 w-auto" fill="currentColor">
        <polygon points="14,4 18,14 28,14 20,20 23,30 14,24 5,30 8,20 0,14 10,14" fill="currentColor" />
        <path d="M42 8h3.5v7h6v-7H55v20h-3.5v-9.5h-6V28H42V8z" />
        <path d="M61 8h6.5q3.5 0 5.5 2t2 5-2 5-5.5 2h-2.5v6H61V8zm3.5 3v8h2q2 0 3-1t1-3-1-3-3-1h-2z" />
        <path d="M84 8h3.5v20H84V8zM89 8h4.5l5 12.5L104 8h4v20h-3.5V14l-5 12h-1l-5-12v14H89V8z" />
        <path d="M118 28q-4 0-6-2t-2-5.5 2-5.5 6-2 6 2 2 5.5-2 5.5-6 2zm0-3q2 0 3-1t1-3.5-1-3.5-3-1-3 1-1 3.5 1 3.5 3 1z" />
        <path d="M136 8h3.5v7h6v-7h3.5v20h-3.5v-9.5h-6V28h-3.5V8z" />
      </svg>
    ),
  },
  {
    name: 'ClimeTech',
    svg: (
      <svg viewBox="0 0 120 32" className="h-7 w-auto" fill="currentColor">
        <path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M16 4v-2M16 28v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 8l-2-2M24 24l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 8h3.5v7h6v-7H47v20h-3.5v-9.5h-6V28H34V8z" />
        <path d="M53 8h6.5q3.5 0 5.5 2t2 5-2 5-5.5 2H57v6H53V8zm3.5 3v8h2.5q2 0 3-1t1-3-1-3-3-1h-2.5z" />
        <path d="M74 8h3.5v20H74V8zM79 8h4.5l5 12.5L94 8h4v20h-3.5V14l-5 12h-1l-5-12v14H79V8z" />
        <path d="M104 8h3.5v7h6v-7h3.5v20h-3.5v-9.5h-6V28h-3.5V8z" />
      </svg>
    ),
  },
]

function LogoBlock({ name, svg }: { name: string; svg: React.ReactNode }) {
  return (
    <div className="flex-shrink-0 h-10 flex items-center justify-center px-8 text-surface-300 transition-colors duration-300 hover:text-surface-400">
      <span className="sr-only">{name}</span>
      {svg}
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
