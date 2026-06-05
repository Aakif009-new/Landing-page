import { connectDB } from '@/lib/mongodb'
import { GeoSettings } from '@/models/GeoSettings'
import { Faq } from '@/models/Faq'

const siteUrl = 'https://xurya.energy'

const pageSchemas: Record<string, string> = {
  home: 'WebPage',
  about: 'AboutPage',
  solutions: 'CollectionPage',
  products: 'CollectionPage',
  caseStudies: 'CollectionPage',
  contact: 'ContactPage',
}

export async function JsonLd({ page }: { page: string }) {
  let geoData: Record<string, string> = {}
  let faqs: { question: string; answer: string }[] = []

  try {
    await connectDB()
    const geo = await GeoSettings.findOne().lean()
    if (geo) {
      geoData = geo as Record<string, string>
    }
    const faqDocs = await Faq.find().lean()
    faqs = faqDocs.map((f: Record<string, unknown>) => ({
      question: (f.question as string) || '',
      answer: (f.answer as string) || '',
    }))
  } catch {
  }

  const schemas: Record<string, unknown>[] = []

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Xurya',
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    description: geoData.businessDescription || 'Premium renewable energy solutions for homes, factories, and cities.',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'customer service',
      email: 'hello@xurya.energy',
      url: `${siteUrl}/contact`,
    },
    sameAs: [],
  })

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Xurya',
    url: siteUrl,
    description: geoData.companySummary || 'Clean Energy For The Future',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  })

  if (geoData.companySummary || geoData.businessDescription) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Xurya',
      description: geoData.businessDescription || geoData.companySummary,
      url: siteUrl,
      telephone: '',
      email: 'hello@xurya.energy',
      areaServed: 'Worldwide',
      priceRange: '$$',
    })
  }

  const pageType = pageSchemas[page] || 'WebPage'
  let pageDescription = ''
  let pageName = 'Xurya'

  const pageDescriptions: Record<string, string> = {
    about: geoData.companySummary || '',
    solutions: geoData.servicesOverview || '',
    products: geoData.productsOverview || '',
    caseStudies: geoData.caseStudySummary || '',
  }

  if (pageDescriptions[page]) {
    pageDescription = pageDescriptions[page]
  }

  const pageNames: Record<string, string> = {
    about: 'About Xurya',
    solutions: 'Solar Solutions',
    products: 'Solar Products',
    caseStudies: 'Case Studies',
    contact: 'Contact Xurya',
  }
  pageName = `${pageNames[page] || 'Xurya'} | Xurya`

  schemas.push({
    '@context': 'https://schema.org',
    '@type': pageType,
    name: pageName,
    description: pageDescription || undefined,
    url: page === 'home' ? siteUrl : `${siteUrl}/${page === 'caseStudies' ? 'case-studies' : page}`,
    isPartOf: {
      '@type': 'WebSite',
      url: siteUrl,
    },
  })

  if (faqs.length > 0 && page === 'home') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
