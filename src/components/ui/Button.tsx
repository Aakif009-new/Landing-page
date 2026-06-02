'use client'

import { motion } from 'framer-motion'
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
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 cursor-pointer select-none'

  const variants = {
    primary:
      'bg-near-black text-white hover:bg-surface-800 active:bg-surface-900 shadow-sm',
    secondary:
      'bg-near-black text-white hover:bg-near-black/90 active:bg-near-black/80',
    ghost:
      'text-near-black bg-transparent hover:bg-surface-100 active:bg-surface-200',
    outline:
      'text-near-black bg-transparent border border-surface-300 hover:border-surface-500 hover:bg-surface-50',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  }

  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  )
}
