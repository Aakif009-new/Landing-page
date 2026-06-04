import { connectDB } from '@/lib/mongodb'
import { FeaturedProduct } from '@/models/FeaturedProduct'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return errorResponse('Unauthorized', 401)

  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()
    const data = await FeaturedProduct.findByIdAndUpdate(id, body, { new: true })
    if (!data) return errorResponse('Not found', 404)
    return successResponse(data)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return errorResponse('Unauthorized', 401)

  try {
    await connectDB()
    const { id } = await params
    const data = await FeaturedProduct.findByIdAndDelete(id)
    if (!data) return errorResponse('Not found', 404)
    return successResponse({ deleted: true })
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
