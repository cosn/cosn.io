'use server'

import redis from '@/lib/redis'

export async function incrementViews(slug: string) : Promise<number> {
  return redis.hincrby('views', slug, 1)
}
