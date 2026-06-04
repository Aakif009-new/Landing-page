let envCache: Record<string, string> = {}

export function getEnv(key: string): string | undefined {
  if (envCache[key]) return envCache[key]
  const val = process.env[key]
  if (val) envCache[key] = val
  return val
}

export function requireEnv(key: string): string {
  const val = getEnv(key)
  if (!val) throw new Error(`Missing required environment variable: ${key}`)
  return val
}
