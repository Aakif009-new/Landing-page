import { connectDB } from '@/lib/mongodb'
import { Footer } from '@/models/Footer'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'
import { validateFooter } from '@/validations/schemas'

export async function GET() {
  try {
    await connectDB()
    const data = await Footer.findOne().lean()
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
    const validationError = validateFooter(body)
    if (validationError) return errorResponse(validationError)

    let data = await Footer.findOne()
    if (data) {
      Object.assign(data, body)
      await data.save()
    } else {
      data = await Footer.create(body)
    }

    return successResponse(data)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
