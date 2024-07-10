import Parser from 'rss-parser'

const subs = ['https://cosn.io/rss']
const parser = new Parser()

export const GET = async () => {
  const feed = await parser.parseURL(subs[0]!)
  return new Response(feed.title)
}
