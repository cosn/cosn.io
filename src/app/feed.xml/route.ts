import assert from 'assert'
import * as cheerio from 'cheerio'
import { Feed } from 'feed'
import { meta } from '../../lib/meta'

export async function GET(req: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  const feed = new Feed({
    title: meta.title,
    description: 'Your blog description',
    author: {
      name: meta.author,
      email: meta.email,
    },
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  const postIds = require
    .context('../posts', true, /\/page\.mdx$/)
    .keys()
    .filter((key) => key.startsWith('./'))
    .map((key) => key.slice(2).replace(/\/page\.mdx$/, ''))

  for (const id of postIds) {
    const url = String(new URL(`/posts/${id}`, req.url))
    const html = await (await fetch(url)).text()
    const $ = cheerio.load(html)

    const publicUrl = `${siteUrl}/posts/${id}`
    const post = $('article').first()
    const title = post.find('h1').first().text()
    const date = post.find('time').first().attr('datetime')
    const content = post.find('[data-mdx-content]').first().html()

    assert(typeof title === 'string')
    assert(typeof date === 'string')
    assert(typeof content === 'string')

    feed.addItem({
      title,
      id: publicUrl,
      link: publicUrl,
      content,
      date: new Date(date),
    })
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
