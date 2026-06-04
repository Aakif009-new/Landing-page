import { HeroData, AboutData, FeaturedProductData, ProcessStepData, ProductData, CTAData, ContactData, FooterData } from '@/types/cms'

export function validateHero(data: Partial<HeroData>): string | null {
  if (!data.title?.trim()) return 'Title is required'
  if (!data.backgroundImage?.trim()) return 'Background image is required'
  return null
}

export function validateAbout(data: Partial<AboutData>): string | null {
  if (!data.heading?.trim()) return 'Heading is required'
  return null
}

export function validateFeaturedProduct(data: Partial<FeaturedProductData>): string | null {
  if (!data.name?.trim()) return 'Name is required'
  if (!data.image?.trim()) return 'Image is required'
  return null
}

export function validateProcessStep(data: Partial<ProcessStepData>): string | null {
  if (!data.title?.trim()) return 'Title is required'
  return null
}

export function validateProduct(data: Partial<ProductData>): string | null {
  if (!data.name?.trim()) return 'Name is required'
  if (!data.category?.trim()) return 'Category is required'
  if (!data.image?.trim()) return 'Image is required'
  return null
}

export function validateCTA(data: Partial<CTAData>): string | null {
  if (!data.heading?.trim()) return 'Heading is required'
  return null
}

export function validateContact(data: Partial<ContactData>): string | null {
  return null
}

export function validateFooter(data: Partial<FooterData>): string | null {
  return null
}
