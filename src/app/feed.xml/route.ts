import { meta } from '@/lib/meta'
import { siteUrl } from '@/lib/utils'
import assert from 'assert'
import * as cheerio from 'cheerio'
import { Feed } from 'feed'
import fs from 'fs'
import path from 'path'

export async function GET(req: Request) {
  const feed = new Feed({
    title: meta.title,
    description: meta.description,
    author: {
      name: meta.author,
      email: meta.email,
    },
    id: siteUrl(),
    link: siteUrl(),
    image: `${siteUrl('favicon.ico')}`,
    favicon: `${siteUrl('favicon.ico')}`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl('feed.xml')}`,
    },
  })

  const postsDirectory = path.join(process.cwd(), 'src/app/posts')
  const postIds = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  for (const id of postIds) {
    const url = String(new URL(`/posts/${id}`, req.url))
    const html = await (await fetch(url)).text()
    const $ = cheerio.load(html)

    const publicUrl = siteUrl(`/posts/${id}`)
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
