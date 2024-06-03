import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = await getAllPosts()

  return Response.json({ posts })
}
