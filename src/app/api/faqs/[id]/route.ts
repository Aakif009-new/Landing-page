import { connectDB } from '@/lib/mongodb'
import { Faq } from '@/models/Faq'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return errorResponse('Unauthorized', 401)

  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()
    if (!body.question?.trim()) return errorResponse('Question is required')
    if (!body.answer?.trim()) return errorResponse('Answer is required')

    const faq = await Faq.findByIdAndUpdate(id, { question: body.question, answer: body.answer }, { new: true })
    if (!faq) return errorResponse('FAQ not found', 404)
    return successResponse(faq)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return errorResponse('Unauthorized', 401)

  try {
    await connectDB()
    const { id } = await params
    const faq = await Faq.findByIdAndDelete(id)
    if (!faq) return errorResponse('FAQ not found', 404)
    return successResponse({ message: 'FAQ deleted' })
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
