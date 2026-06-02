import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Xurya — Clean Energy For The Future',
  description: 'Xurya designs and deploys renewable energy systems for homes, factories, and cities — delivering measurable savings, resilience, and zero-emission impact at scale.',
  openGraph: {
    title: 'Xurya — Clean Energy For The Future',
    description: 'Premium renewable energy solutions for residential, commercial, and industrial applications.',
    type: 'website',
    siteName: 'Xurya',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
