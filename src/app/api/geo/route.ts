import { connectDB } from '@/lib/mongodb'
import { GeoSettings } from '@/models/GeoSettings'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

const defaultGeo = {
  companySummary: '',
  businessDescription: '',
  servicesOverview: '',
  productsOverview: '',
  industryOverview: '',
  whyChooseXurya: '',
  faqSection: '',
  caseStudySummary: '',
}

export async function GET() {
  try {
    await connectDB()
    const data = await GeoSettings.findOne().lean()
    return successResponse(data || defaultGeo)
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

    let data = await GeoSettings.findOne()
    if (data) {
      Object.assign(data, body)
      await data.save()
    } else {
      data = await GeoSettings.create(body)
    }

    return successResponse(data)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
