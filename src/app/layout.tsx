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
  description:
    'Xurya designs and deploys renewable energy systems for homes, factories, and cities — delivering measurable savings, resilience, and zero-emission impact at scale.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Xurya — Clean Energy For The Future',
    description:
      'Premium renewable energy solutions for residential, commercial, and industrial applications.',
    url: 'https://xurya.energy',
    siteName: 'Xurya',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Xurya — Clean Energy For The Future',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xurya — Clean Energy For The Future',
    description:
      'Premium renewable energy solutions for residential, commercial, and industrial applications.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
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
