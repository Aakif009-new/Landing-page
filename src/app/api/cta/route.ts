import { connectDB } from '@/lib/mongodb'
import { CTA } from '@/models/CTA'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'
import { validateCTA } from '@/validations/schemas'

export async function GET() {
  try {
    await connectDB()
    const data = await CTA.findOne().lean()
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
    const validationError = validateCTA(body)
    if (validationError) return errorResponse(validationError)

    let data = await CTA.findOne()
    if (data) {
      Object.assign(data, body)
      await data.save()
    } else {
      data = await CTA.create(body)
    }

    return successResponse(data)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
