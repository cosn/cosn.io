import logger from '@/lib/logger'
import { getAllPosts } from '@/lib/posts'
import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const posts = await getAllPosts()

  if (req.nextUrl.searchParams.get('tag') === 'posts') {
    logger.verbose('Revalidating posts')
    revalidateTag('posts')
  }

  return Response.json({ posts })
}
