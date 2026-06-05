import { connectDB } from '@/lib/mongodb'
import { Faq } from '@/models/Faq'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

export async function GET() {
  try {
    await connectDB()
    const data = await Faq.find().sort({ createdAt: -1 }).lean()
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
    if (!body.question?.trim()) return errorResponse('Question is required')
    if (!body.answer?.trim()) return errorResponse('Answer is required')
    const faq = await Faq.create({ question: body.question, answer: body.answer })
    return successResponse(faq, 201)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
