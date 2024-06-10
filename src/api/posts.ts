'use server'

import { importPost } from '@/lib/posts'
import glob from 'fast-glob'

export async function getAllPosts() {
  const postFilenames = await glob('*/page.mdx', {
    cwd: './src/app/posts',
  })

  const posts = await Promise.all(postFilenames.map(importPost))

  return posts
    .filter((post) => post.published)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
