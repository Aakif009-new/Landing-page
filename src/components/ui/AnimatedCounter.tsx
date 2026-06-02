'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  end: number
  label: string
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  label,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })
  const count = useCountUp({ end, enabled: isVisible })

  return (
    <div
      ref={ref}
      className={cn(
        'text-center transition-all duration-700',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className
      )}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-near-black font-heading tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm md:text-base text-surface-500 font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  )
}
