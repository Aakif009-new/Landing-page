import { connectDB } from '@/lib/mongodb'
import { SeoSettings } from '@/models/SeoSettings'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

const defaultSeo = {
  home: { title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '' },
  about: { title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '' },
  solutions: { title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '' },
  caseStudies: { title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '' },
  products: { title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '' },
  contact: { title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '' },
}

export async function GET() {
  try {
    await connectDB()
    const data = await SeoSettings.findOne().lean()
    return successResponse(data || defaultSeo)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin()
  if (error) return errorResponse('Unauthorized', 401)

  try {
    await connectDB()
    const body = await req.json()

    let data = await SeoSettings.findOne()
    if (data) {
      Object.assign(data, body)
      await data.save()
    } else {
      data = await SeoSettings.create(body)
    }

    return successResponse(data)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
