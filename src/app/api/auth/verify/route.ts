import { requireAdmin } from '@/lib/api-utils'

export async function GET() {
  const { error } = await requireAdmin()
  if (error) {
    return Response.json({ success: false, error }, { status: 401 })
  }
  return Response.json({ success: true })
}
