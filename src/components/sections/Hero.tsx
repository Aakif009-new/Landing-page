'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface HeroData {
  title: string
  subtitle: string
  backgroundImage: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  floatingCardTitle: string
  floatingCardDescription: string
  floatingCardImage: string
}

const defaults: HeroData = {
  title: 'Power your\nfuture with clean\nsolar energy',
  subtitle: '',
  backgroundImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=80',
  primaryButtonText: 'Explore More',
  primaryButtonLink: '#services',
  secondaryButtonText: 'Watch Video',
  secondaryButtonLink: '#case-study',
  floatingCardTitle: 'Power station',
  floatingCardDescription: 'Power station from Xi area to Vana hills',
  floatingCardImage: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=400&q=80',
}

export function Hero() {
  const [data, setData] = useState<HeroData>(defaults)

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.data) {
          setData({
            title: json.data.title || defaults.title,
            subtitle: json.data.subtitle || defaults.subtitle,
            backgroundImage: json.data.backgroundImage || defaults.backgroundImage,
            primaryButtonText: json.data.primaryButtonText || defaults.primaryButtonText,
            primaryButtonLink: json.data.primaryButtonLink || defaults.primaryButtonLink,
            secondaryButtonText: json.data.secondaryButtonText || defaults.secondaryButtonText,
            secondaryButtonLink: json.data.secondaryButtonLink || defaults.secondaryButtonLink,
            floatingCardTitle: json.data.floatingCardTitle || defaults.floatingCardTitle,
            floatingCardDescription: json.data.floatingCardDescription || defaults.floatingCardDescription,
            floatingCardImage: json.data.floatingCardImage || defaults.floatingCardImage,
          })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="bg-soft-white pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] min-h-[640px] md:min-h-[760px]">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="absolute inset-0">
            <Image
              src={data.backgroundImage}
              alt="Solar panels in open landscape"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-near-black/65 via-near-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-near-black/45 to-transparent" />

          <div className="relative z-10 flex h-full min-h-[640px] md:min-h-[760px] flex-col justify-between p-7 md:p-10 lg:p-12">
            <div className="max-w-2xl pt-2 md:pt-4">
              <ScrollReveal>
                <h1 className="font-heading text-white text-[48px] leading-[0.96] sm:text-[62px] md:text-[78px] lg:text-[90px] tracking-tight whitespace-pre-line">
                  {data.title}
                </h1>
              </ScrollReveal>
            </div>

            <div className="flex items-end justify-between gap-6 pb-1">
              <ScrollReveal delay={100}>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button variant="outline" size="md" href={data.primaryButtonLink} className="bg-white/95 border-0 text-near-black hover:bg-white">
                    {data.primaryButtonText}
                  </Button>
                  <Button variant="ghost" size="md" href={data.secondaryButtonLink} className="bg-white/10 text-white border border-white/30 hover:bg-white/20">
                    {data.secondaryButtonText}
                  </Button>
                </div>
              </ScrollReveal>

              {data.floatingCardTitle && (
                <ScrollReveal delay={180}>
                  <div className="hidden md:flex items-center gap-3 bg-white/90 rounded-2xl p-3.5 max-w-[300px]">
                    {data.floatingCardImage && (
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                        <Image
                          src={data.floatingCardImage}
                          alt={data.floatingCardTitle}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-surface-400">{data.floatingCardTitle}</p>
                      {data.floatingCardDescription && (
                        <p className="font-heading text-sm text-near-black leading-tight">{data.floatingCardDescription}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
