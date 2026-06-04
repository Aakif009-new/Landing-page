import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { requireEnv } from './env'

function getJwtSecret(): string {
  return requireEnv('JWT_SECRET')
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: { id: string; email: string; role: string }): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' })
}

export function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    return jwt.verify(token, getJwtSecret()) as { id: string; email: string; role: string }
  } catch {
    return null
  }
}
