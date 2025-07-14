import Parser from 'rss-parser'
import logger from '@/lib/logger'
import raindrop from '@/lib/raindrop'
import redis from '@/lib/redis'

const subs = [
  'https://lethain.com/feeds.xml',
  'https://www.industrialempathy.com/feed/feed.xml',
  'https://github.com/nvim-lua/kickstart.nvim/commits/main.atom',
  'https://github.com/workos/authkit-remix/commits/main.atom',
]

type ParserCustomFeed = {}
type ParserCustomItem = {
  updated?: string
}

const parser: Parser<ParserCustomFeed, ParserCustomItem> = new Parser({
  customFields: {
    item: ['updated'],
  },
})

type Context = {
  collectionId: string
  lastRunDate: number
}

const redisKey = 'cron-raindrop-rss'

const init = async () => {
  // if this fails, let it bubble up, so we don't automatically re-run the job
  let ctx = (await redis.hgetall(redisKey)) as Context

  if (!ctx) {
    const cid = await raindrop.getCollectionId('Reader')
    const lastRunDate = new Date().getTime()

    ctx = {
      collectionId: cid,
      lastRunDate: lastRunDate,
    }

    redis.hset(redisKey, ctx)
  }

  return ctx
}

const commit = async (context: Context) => {
  type CommitMetadata = Pick<Context, 'lastRunDate'>
  const commitMetadata: CommitMetadata = {
    ...context,
  }
  commitMetadata.lastRunDate = new Date().getTime()

  try {
    await redis.hset(redisKey, commitMetadata)
  } catch (error) {
    logger.error('Failed to commit cron context', { error: error })
  }
}

export const GET = async () => {
  const metadata = await init()

  let entries = 0

  for (const sub of subs) {
    const feed = await parser.parseURL(sub)
    for (const item of feed.items) {
      const date = item.pubDate || item.updated
      if (!date) {
        logger.warn('No date found, skipping', { item: item.link })
        continue
      }

      if (Date.parse(date) > metadata.lastRunDate) {
        logger.info('New RSS entry', { item: item.link })

        try {
          await raindrop.create(item.link!, metadata.collectionId, item.title)
        } catch (error) {
          logger.error('Failed to create raindrop', {
            item: item.link,
            error: error,
          })
        }

        entries += 1
      }
    }
  }

  await commit(metadata)

  logger.info('Raindrop RSS cron executed successfully', { entries: entries })
  return Response.json({ entries: entries })
}
