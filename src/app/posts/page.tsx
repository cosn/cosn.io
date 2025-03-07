import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { type PostWithSlug } from '@/lib/posts'
import { siteUrl } from '@/lib/utils'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      article: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

const Post = ({ post }: { post: PostWithSlug }) => {
  return (
    <article className='md:grid md:grid-cols-4 md:items-baseline'>
      <Card className='md:col-span-3'>
        <Card.Title href={`/posts/${post.slug}`}>{post.title}</Card.Title>
        <Card.Eyebrow
          as='time'
          dateTime={post.date}
          className='md:hidden'
          decorate
        >
          {formatDate(post.date)}
        </Card.Eyebrow>
        <Card.Description>{post.description}</Card.Description>
        <Card.Cta>Read post</Card.Cta>
      </Card>
      <Card.Eyebrow
        as='time'
        dateTime={post.date}
        className='mt-1 hidden md:block'
      >
        {formatDate(post.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Posts',
  description:
    'Long-form thoughts on building, leadership, and arbitrary topics',
}

const PostsIndex = async () => {
  const res = await fetch(siteUrl('api/posts'), { next: { tags: ['posts'] } })
  const data = (await res.json()) as { posts: PostWithSlug[] }
  const posts = data.posts

  return (
    <SimpleLayout
      title={metadata.description!}
      intro="I've generally found written form to be the clearest way to discuss complex subjects."
    >
      <div className='md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40'>
        <div className='flex max-w-3xl flex-col space-y-16'>
          {posts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}

export default PostsIndex
