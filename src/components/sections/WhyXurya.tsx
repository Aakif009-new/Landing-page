'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface AboutData {
  sectionLabel: string
  heading: string
  description: string
  teamCount: number
  teamImages: string[]
  aboutImage: string
}

const defaults: AboutData = {
  sectionLabel: '[ Feature ]',
  heading: 'We are a dedicated team of energy experts passionate about the accelerating solar',
  description: 'We craft solar systems with high-performance materials, precise engineering, and timeless design standards.',
  teamCount: 52,
  teamImages: [
    'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=220&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=220&q=80',
    'https://images.unsplash.com/photo-1542178432-52211bc52073?auto=format&fit=crop&w=220&q=80',
  ],
  aboutImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1300&q=80',
}

export function WhyXurya() {
  const [data, setData] = useState<AboutData>(defaults)

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.data) {
          setData({
            sectionLabel: json.data.sectionLabel || defaults.sectionLabel,
            heading: json.data.heading || defaults.heading,
            description: json.data.description || defaults.description,
            teamCount: json.data.teamCount || defaults.teamCount,
            teamImages: json.data.teamImages?.length ? json.data.teamImages : defaults.teamImages,
            aboutImage: json.data.aboutImage || defaults.aboutImage,
          })
        }
      })
      .catch(() => {})
  }, [])

  const headingLines = data.heading.split('\n')

  return (
    <section id="about" className="py-14 md:py-20 bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 items-center">
          <ScrollReveal>
            <div className="rounded-[32px] p-4 bg-white border border-surface-100">
              <div className="relative overflow-hidden rounded-[24px] min-h-[290px] md:min-h-[370px]">
                <Image
                  src={data.aboutImage}
                  alt="Solar engineer reviewing system"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <p className="text-[11px] tracking-[0.2em] uppercase text-surface-400 mb-4">{data.sectionLabel}</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="font-heading text-[32px] leading-[1.04] md:text-[48px] tracking-tight text-near-black">
                {headingLines.map((line, i) => (
                  <span key={i}>{line}{i < headingLines.length - 1 && <br />}</span>
                ))}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <p className="mt-4 max-w-[380px] text-surface-500 leading-relaxed text-[15px]">
                {data.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={260}>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {data.teamImages.slice(0, 3).map((img, i) => (
                    <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={img}
                        alt="Team member portrait"
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-heading text-xl text-near-black">{data.teamCount} Team Member</p>
                  <p className="text-sm text-surface-500">give ready to assist you</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
