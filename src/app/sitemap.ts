import { getAllPosts } from '@/api/posts'
import { siteUrl } from '@/lib/utils.ts'

export default async function sitemap() {
  const posts = await getAllPosts()
  const postsMetadata = posts.map((post) => ({
    url: siteUrl('posts', post.slug),
    lastModified: post.date
  }))

  const routes = ['', '/about', '/portfolio', '/posts'].map((route) => ({
    url: siteUrl(route),
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...postsMetadata]
}

