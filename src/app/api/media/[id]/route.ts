import { connectDB } from '@/lib/mongodb'
import { Media } from '@/models/Media'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return errorResponse('Unauthorized', 401)

  try {
    await connectDB()
    const { id } = await params
    const data = await Media.findByIdAndDelete(id)
    if (!data) return errorResponse('Not found', 404)

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (cloudName && apiKey && apiSecret && data.publicId && !data.publicId.startsWith('local_')) {
      const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
      await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}` },
        body: new URLSearchParams({ public_id: data.publicId }),
      })
    }

    return successResponse({ deleted: true })
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
