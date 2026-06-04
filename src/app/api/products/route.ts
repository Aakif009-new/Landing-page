import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

export async function GET(req: Request) {
  try {
    await connectDB()
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search') || ''

    const query = search ? { name: { $regex: search, $options: 'i' } } : {}
    const total = await Product.countDocuments(query)
    const products = await Product.find(query)
      .sort({ displayOrder: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return successResponse({
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
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
    const data = await Product.create(body)
    return successResponse(data, 201)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
