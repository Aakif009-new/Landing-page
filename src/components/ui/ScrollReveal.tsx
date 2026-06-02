'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
