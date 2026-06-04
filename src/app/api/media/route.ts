import { connectDB } from '@/lib/mongodb'
import { Media } from '@/models/Media'
import { successResponse, errorResponse, requireAdmin } from '@/lib/api-utils'

export async function GET(req: Request) {
  try {
    await connectDB()
    const url = new URL(req.url)
    const search = url.searchParams.get('search') || ''
    const section = url.searchParams.get('section') || ''

    const query: Record<string, unknown> = {}
    if (search) query.url = { $regex: search, $options: 'i' }
    if (section) query.section = section

    const data = await Media.find(query).sort({ uploadedAt: -1 }).lean()
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
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const section = (formData.get('section') as string) || 'general'

    if (!file) return errorResponse('No file provided')

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
    const apiKey = process.env.CLOUDINARY_API_KEY || ''
    const apiSecret = process.env.CLOUDINARY_API_SECRET || ''

    if (cloudName && apiKey && apiSecret) {
      const form = new FormData()
      form.append('file', dataUri)
      form.append('upload_preset', 'xurya_cms')
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: form,
      })
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json()
        const media = await Media.create({
          url: uploadData.secure_url,
          publicId: uploadData.public_id,
          section,
        })
        return successResponse(media, 201)
      }
    }

    const media = await Media.create({
      url: dataUri,
      publicId: `local_${Date.now()}`,
      section,
    })
    return successResponse(media, 201)
  } catch (e) {
    return errorResponse((e as Error).message, 500)
  }
}
