'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface ProcessData {
  stepNumber: number
  title: string
  description: string
  image: string
  displayOrder: number
}

export function CaseStudy() {
  const [data, setData] = useState<ProcessData | null>(null)

  useEffect(() => {
    fetch('/api/process')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.data?.length) {
          const sorted = json.data.sort((a: ProcessData, b: ProcessData) => a.displayOrder - b.displayOrder)
          setData(sorted[0])
        }
      })
      .catch(() => {})
  }, [])

  if (!data) return null

  return (
    <section id="case-study" className="py-14 md:py-20 bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.2em] uppercase text-surface-400">[ Easy Process ]</p>
          </ScrollReveal>
        </div>

        <div className="relative rounded-[32px] overflow-hidden min-h-[500px] md:min-h-[580px]">
          <div className="absolute inset-0 transition-transform duration-700 hover:scale-105">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-near-black/70 via-near-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-between p-7 md:p-10">
            <ScrollReveal delay={100}>
              <div className="max-w-[620px] pt-1">
                <p className="text-white/75 text-sm mb-3">{String(data.stepNumber).padStart(2, '0')}/03</p>
                <h3 className="font-heading text-white text-3xl md:text-[52px] leading-[1.02] tracking-tight">
                  {data.title.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < data.title.split('\n').length - 1 && <br />}</span>
                  ))}
                </h3>
                <p className="mt-3 text-white/75 max-w-md text-[15px]">
                  {data.description}
                </p>
              </div>
            </ScrollReveal>

            <div className="flex justify-end">
              <a href="#contact" className="w-11 h-11 rounded-full bg-white/25 border border-white/40 text-white inline-flex items-center justify-center hover:bg-white/35 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
