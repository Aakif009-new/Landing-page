'use client'

import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  enabled?: boolean
  suffix?: string
  prefix?: string
}

export function useCountUp({ end, duration = 2000, enabled = true }: UseCountUpOptions) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, enabled])

  return count
}
