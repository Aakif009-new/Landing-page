import mongoose from 'mongoose'
import { getEnv } from './env'

const MONGODB_URI = getEnv('MONGODB_URI')!

let cached = globalThis._mongooseCache as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined

if (!cached) {
  cached = globalThis._mongooseCache = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached!.conn) return cached!.conn

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached!.conn = await cached!.promise

  if (!globalThis.__seeded) {
    globalThis.__seeded = true
    try {
      const { seedDatabase } = await import('@/services/seed')
      await seedDatabase()
    } catch (e) {
      console.error('Seed failed:', e)
    }
  }

  return cached!.conn
}
