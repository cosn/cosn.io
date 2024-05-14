import redis from '@/lib/redis'

type Views = {
  [id: string]: number
} | null

export async function getViews(slug: string) : Promise<number> {
  const views = await redis.hget('views', slug)  
  return Number(views)
}

export async function getAllViews() : Promise<Views> {
  return redis.hgetall('views')
}
