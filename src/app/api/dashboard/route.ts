import { connectDB } from '@/lib/mongodb'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'
import { Product } from '@/models/Product'
import { Media } from '@/models/Media'

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return errorResponse('Unauthorized', 401)

  try {
    await connectDB()
    const totalProducts = await Product.countDocuments()
    const totalImages = await Media.countDocuments()
    const totalSections = 8

    return successResponse({
      totalProducts,
      totalImages,
      totalSections,
      lastUpdated: new Date().toISOString(),
      recentActivity: [],
    })
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
