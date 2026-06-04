import { connectDB } from '@/lib/mongodb'
import { ProcessStep } from '@/models/ProcessStep'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

export async function GET() {
  try {
    await connectDB()
    const data = await ProcessStep.find().sort({ displayOrder: 1 }).lean()
    return successResponse(data)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return errorResponse('Unauthorized', 401)

  try {
    await connectDB()
    const body = await req.json()
    const data = await ProcessStep.create(body)
    return successResponse(data, 201)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
