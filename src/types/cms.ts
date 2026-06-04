export interface HeroData {
  title: string
  subtitle: string
  backgroundImage: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  floatingCardTitle: string
  floatingCardDescription: string
  floatingCardImage: string
}

export interface AboutData {
  sectionLabel: string
  heading: string
  description: string
  teamCount: number
  teamImages: string[]
  aboutImage: string
}

export interface FeaturedProductData {
  name: string
  description: string
  specifications: string[]
  image: string
  displayOrder: number
  active: boolean
}

export interface ProcessStepData {
  stepNumber: number
  title: string
  description: string
  image: string
  displayOrder: number
}

export interface ProductData {
  name: string
  category: string
  description: string
  image: string
  specifications: string[]
  featured: boolean
  displayOrder: number
}

export interface CTAData {
  heading: string
  description: string
  buttonOneText: string
  buttonOneLink: string
  buttonTwoText: string
  buttonTwoLink: string
}

export interface ContactData {
  phone: string
  email: string
  whatsapp: string
  address: string
  googleMapsUrl: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface FooterData {
  companyDescription: string
  footerLinks: FooterLink[]
  socialLinks: SocialLink[]
  copyright: string
}

export interface MediaData {
  url: string
  publicId: string
  section: string
}
