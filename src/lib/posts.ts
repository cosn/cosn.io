import glob from 'fast-glob'

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

const importPost = async (postFilename: string): Promise<PostWithSlug> => {
  const { post } = (await import(`@/app/posts/${postFilename}`)) as {
    default: React.ComponentType
    post: Post
  }

  return {
    slug: postFilename.replace(/(\/page)?\.mdx$/, ''),
    ...post,
  }
}

export const getAllPosts = async () => {
  const postFilenames = await glob('*/page.mdx', {
    cwd: './src/app/posts',
  })

  const posts = await Promise.all(postFilenames.map(importPost))

  return posts
    .filter((post) => post.published)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
