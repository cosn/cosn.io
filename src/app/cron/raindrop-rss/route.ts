import Parser from 'rss-parser'
import logger from '@/lib/logger'
import raindrop from '@/lib/raindrop'
import redis from '@/lib/redis'

const subs = [
  'https://lethain.com/feeds.xml',
  'https://www.industrialempathy.com/feed/feed.xml',
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

type Metadata = {
  collectionId: string
  lastRunDate: number
}

const redisKey = 'cron-raindrop-rss'

const init = async () => {
  // if this fails, let it bubble up, so we don't automatically re-run the job
  let metadata = (await redis.hgetall(redisKey)) as Metadata

  if (!metadata) {
    const cid = await raindrop.getCollectionId('Reader')
    const lastRunDate = new Date().getTime()

    metadata = {
      collectionId: cid,
      lastRunDate: lastRunDate,
    }

    redis.hset(redisKey, metadata)
  }

  return metadata
}

const commit = async (metadata: Metadata) => {
  type CommitMetadata = Pick<Metadata, 'lastRunDate'>
  const commitMetadata: CommitMetadata = {
    ...metadata,
  }
  commitMetadata.lastRunDate = new Date().getTime()

  await redis.hset(redisKey, commitMetadata)
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

  try {
    await commit(metadata)
  } catch (error) {
    logger.error('Failed to commit cron metadata', { error: error })
  }

  return Response.json({ entries: entries })
}
