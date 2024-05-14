'use server'

import redis from '@/lib/redis'

export async function incrementViews(slug: string): Promise<number> {
  return redis.hincrby('views', slug, 1)
}

export async function getViews(slug: string): Promise<number> {
  const views = await redis.hget('views', slug)
  return Number(views)
}

export type Views = {
  [id: string]: number
} | null

export async function getAllViews(): Promise<Views> {
  return redis.hgetall('views')
}
