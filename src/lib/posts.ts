import glob from 'fast-glob'
import redis from '@/lib/redis'
import fs from 'fs'

interface Post {
  title: string
  description: string
  published: boolean
  date: string
  views: number
}

export interface PostWithSlug extends Post {
  slug: string
}

async function importPost(postFilename: string): Promise<PostWithSlug> {
  let { post } = (await import(`@/app/posts/${postFilename}`)) as {
    default: React.ComponentType
    post: Post
  }

  return {
    slug: postFilename.replace(/(\/page)?\.mdx$/, ''),
    ...post,
  }
}

export async function getAllPosts() {
  const postFilenames = await glob('*/page.mdx', {
    cwd: './src/app/posts',
  })

  const posts = await Promise.all(postFilenames.map(importPost))
  console.log(`posts: ${posts.length}`)
  const views = await redis.hgetall('views')
  console.log(`views: ${views}`)
  const files = fs.readdirSync('./')
  console.log(`files: ${files}`)

  return posts
    .filter((post) => post.published)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
