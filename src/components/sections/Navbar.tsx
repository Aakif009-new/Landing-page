'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/75 backdrop-blur-xl border-b border-surface-100 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2" />
                <path d="M12 21v2" />
                <path d="M4.22 4.22l1.42 1.42" />
                <path d="M18.36 18.36l1.42 1.42" />
                <path d="M1 12h2" />
                <path d="M21 12h2" />
                <path d="M4.22 19.78l1.42-1.42" />
                <path d="M18.36 5.64l1.42-1.42" />
              </svg>
            </div>
            <span className="font-heading font-bold text-lg text-near-black tracking-tight">
              Xurya
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-surface-600 hover:text-near-black rounded-lg hover:bg-surface-50 transition-all duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="primary" size="sm" href="#contact">
              Get In Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-surface-100 py-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-base text-surface-600 hover:text-near-black rounded-lg hover:bg-surface-50 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 px-4">
              <Button variant="primary" size="md" href="#contact" className="w-full">
                Get In Touch
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
