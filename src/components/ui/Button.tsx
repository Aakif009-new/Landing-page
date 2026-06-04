'use client'

import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 cursor-pointer select-none'

  const variants = {
    primary:
      'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 shadow-sm hover:shadow-emerald-500/20 hover:shadow-md',
    secondary:
      'bg-near-black text-white hover:bg-near-black/90 active:bg-near-black/80',
    ghost:
      'text-near-black bg-transparent hover:bg-surface-100 active:bg-surface-200',
    outline:
      'text-near-black bg-transparent border border-surface-300 hover:border-surface-400 hover:bg-surface-50',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-[15px] gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  }

  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
