'use client'

import { useEffect, useState } from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterData {
  companyDescription: string
  footerLinks: FooterLink[]
  socialLinks: { platform: string; url: string }[]
  copyright: string
}

const defaults: FooterData = {
  companyDescription: '',
  footerLinks: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'About Us', href: '/about' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Products', href: '/products' },
  ],
  socialLinks: [],
  copyright: 'Xurya.com - All Rights Reserved',
}

export function Footer() {
  const [data, setData] = useState<FooterData>(defaults)

  useEffect(() => {
    fetch('/api/footer')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.data) {
          setData({
            companyDescription: json.data.companyDescription || defaults.companyDescription,
            footerLinks: json.data.footerLinks?.length ? json.data.footerLinks : defaults.footerLinks,
            socialLinks: json.data.socialLinks || [],
            copyright: json.data.copyright || defaults.copyright,
          })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10 border-t border-surface-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="text-xs text-surface-400">&copy; {new Date().getFullYear()} {data.copyright}</span>
          <div className="flex items-center gap-4 text-xs text-surface-400">
            {data.footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-surface-600 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
