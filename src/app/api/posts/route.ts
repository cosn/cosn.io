import { getAllPosts } from '@/lib/posts'

export const GET = async () => {
  const posts = await getAllPosts()
  return Response.json({ posts })
}
