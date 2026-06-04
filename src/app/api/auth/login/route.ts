import { connectDB } from '@/lib/mongodb'
import { Admin } from '@/models/Admin'
import { comparePassword, signToken } from '@/lib/auth'
import { requireEnv } from '@/lib/env'
import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const adminCount = await Admin.countDocuments()
    if (adminCount === 0) {
      const passwordHash = await hashPassword(requireEnv('ADMIN_PASSWORD'))
      await Admin.create({ email: requireEnv('ADMIN_EMAIL'), passwordHash, role: 'superadmin' })
    }

    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await comparePassword(password, admin.passwordHash)
    if (!valid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({ id: admin._id.toString(), email: admin.email, role: admin.role })

    const response = NextResponse.json({ success: true, data: { email: admin.email, role: admin.role } })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 })
  }
}
