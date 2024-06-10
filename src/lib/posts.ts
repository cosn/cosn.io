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

export async function importPost(postFilename: string): Promise<PostWithSlug> {
  const { post } = (await import(`@/app/posts/${postFilename}`)) as {
    default: React.ComponentType
    post: Post
  }

  return {
    slug: postFilename.replace(/(\/page)?\.mdx$/, ''),
    ...post,
  }
}
