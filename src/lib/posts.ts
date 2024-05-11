import glob from 'fast-glob'

interface Post {
  title: string
  description: string
  published: boolean
  date: string
}

export interface PostWithSlug extends Post {
  slug: string
}

async function importPost(
  postFilename: string,
): Promise<PostWithSlug> {
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
  let postFilenames = await glob('*/page.mdx', {
    cwd: './src/app/posts',
  })

  let posts = await Promise.all(postFilenames.map(importPost))

  return posts
    .filter(post => post.published)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
