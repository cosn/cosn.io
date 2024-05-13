'use server'

import redis from './redis'

export type Views = {
  [id: string]: number
} | null

export async function incrementViews(slug: string) : Promise<number> {
  return await redis.hincrby('views', slug, 1)
}

export async function getViews(slug: string) : Promise<number> {
  const views = await redis.hget('views', slug)  
  return Number(views)
}

export async function getAllViews() : Promise<Views> {
  return await redis.hgetall('views')
}
