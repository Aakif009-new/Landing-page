import mongoose from 'mongoose'

declare global {
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined
  var __seeded: boolean | undefined
}
