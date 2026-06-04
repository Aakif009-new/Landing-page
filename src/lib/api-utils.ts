import { NextResponse } from 'next/server'
import { verifyToken } from './auth'
import { cookies } from 'next/headers'

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status })
}

export async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return { error: 'Unauthorized', admin: null }
  }

  const admin = verifyToken(token)
  if (!admin) {
    return { error: 'Invalid token', admin: null }
  }

  return { error: null, admin }
}
