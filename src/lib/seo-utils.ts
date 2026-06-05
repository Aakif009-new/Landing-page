import { connectDB } from './mongodb'
import { SeoSettings } from '@/models/SeoSettings'

interface SeoPageData {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
}

const defaultSeo: SeoPageData = {
  title: '',
  description: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
}

export async function getSeoForPage(page: string): Promise<SeoPageData> {
  try {
    await connectDB()
    const settings = await SeoSettings.findOne().lean() as Record<string, unknown> | null
    if (settings && settings[page]) {
      return { ...defaultSeo, ...(settings[page] as SeoPageData) }
    }
  } catch {
  }
  return defaultSeo
}
