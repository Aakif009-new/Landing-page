import { connectDB } from '@/lib/mongodb'
import { About } from '@/models/About'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'
import { validateAbout } from '@/validations/schemas'

export async function GET() {
  try {
    await connectDB()
    const data = await About.findOne().lean()
    return successResponse(data || {})
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
    const validationError = validateAbout(body)
    if (validationError) return errorResponse(validationError)

    let data = await About.findOne()
    if (data) {
      Object.assign(data, body)
      await data.save()
    } else {
      data = await About.create(body)
    }

    return successResponse(data)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
