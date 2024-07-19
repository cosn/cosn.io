import Parser from 'rss-parser'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { GET } from './route'
import logger from '@/lib/logger'
import raindrop from '@/lib/raindrop'
import redis from '@/lib/redis'

vi.mock('rss-parser', () => {
  const Parser = vi.fn()
  Parser.prototype.parseURL = vi.fn()
  return { default: Parser }
})
vi.mock('@/lib/logger')
vi.mock('@/lib/raindrop')
vi.mock('@/lib/redis')

describe('RSS Parser and Raindrop Integration', () => {
  let mockFeedQueue: any

  beforeEach(() => {
    vi.resetAllMocks()
    vi.useFakeTimers()

    mockFeedQueue = [
      {
        items: [
          {
            link: 'https://test1.com',
            title: 'Test 1',
            pubDate: '2023-01-01T00:00:00Z',
          },
        ],
      },
      {
        items: [
          {
            link: 'https://test2.com',
            title: 'Test 2',
            updated: '2023-01-02T00:00:00Z',
          },
          { link: 'https://test3.com', title: 'Test 3' }, // No date
        ],
      },
    ]

    // @ts-expect-error
    Parser.prototype.parseURL.mockImplementation(() => {
      return Promise.resolve(mockFeedQueue.shift() || { items: [] })
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('init function', () => {
    it('should return existing metadata if available in Redis', async () => {
      const mockContext = { collectionId: 'existingId', lastRunDate: 1000 }
      vi.mocked(redis.hgetall).mockResolvedValue(mockContext)

      await GET()

      expect(redis.hgetall).toHaveBeenCalledWith('cron-raindrop-rss')
      expect(raindrop.getCollectionId).not.toHaveBeenCalled()
      expect(redis.hset).toHaveBeenCalled()
    })

    it('should create new metadata if not available in Redis', async () => {
      vi.mocked(redis.hgetall).mockResolvedValue(null)
      vi.mocked(raindrop.getCollectionId).mockResolvedValue('newId')
      vi.setSystemTime(new Date(2023, 0, 1))

      await GET()

      expect(redis.hgetall).toHaveBeenCalledWith('cron-raindrop-rss')
      expect(raindrop.getCollectionId).toHaveBeenCalledWith('Reader')
      expect(redis.hset).toHaveBeenCalledWith('cron-raindrop-rss', {
        collectionId: 'newId',
        lastRunDate: new Date(2023, 0, 1).getTime(),
      })
    })
  })

  describe('commit function', () => {
    it('should update lastRunDate in Redis', async () => {
      vi.setSystemTime(new Date(2023, 0, 1))

      await GET()

      expect(redis.hset).toHaveBeenCalledWith('cron-raindrop-rss', {
        lastRunDate: new Date(2023, 0, 1).getTime(),
      })
    })
  })

  describe('GET function', () => {
    it('should process RSS feeds and create Raindrops for new entries', async () => {
      const mockContext = { collectionId: 'testId', lastRunDate: 1000 }
      vi.mocked(redis.hgetall).mockResolvedValue(mockContext)

      const result = await GET()

      expect(Parser.prototype.parseURL).toHaveBeenCalledTimes(2) // For each subscription
      expect(raindrop.create).toHaveBeenCalledTimes(2) // For the two items with dates
      expect(logger.warn).toHaveBeenCalledWith('No date found, skipping', {
        item: 'https://test3.com',
      })
      expect(await result.json()).toEqual({ entries: 2 })
    })

    it('should skip entries older than lastRunDate', async () => {
      const mockContext = {
        collectionId: 'testId',
        lastRunDate: Date.parse('2023-01-03T00:00:00Z'),
      }
      vi.mocked(redis.hgetall).mockResolvedValue(mockContext)

      mockFeedQueue = [
        {
          items: [
            {
              link: 'https://test1.com',
              title: 'Test 1',
              pubDate: '2023-01-01T00:00:00Z',
            },
          ],
        },
        {
          items: [
            {
              link: 'https://test2.com',
              title: 'Test 2',
              pubDate: '2023-01-04T00:00:00Z',
            },
          ],
        },
      ]

      const result = await GET()

      expect(raindrop.create).toHaveBeenCalledTimes(1) // Only for the newer item
      expect(await result.json()).toEqual({ entries: 1 })
    })

    it('should handle errors when creating Raindrops', async () => {
      const mockContext = { collectionId: 'testId', lastRunDate: 1000 }
      vi.mocked(redis.hgetall).mockResolvedValue(mockContext)

      const mockFeed = {
        items: [
          {
            link: 'https://test1.com',
            title: 'Test 1',
            pubDate: '2023-01-01T00:00:00Z',
          },
        ],
      }
      vi.mocked(Parser.prototype.parseURL).mockResolvedValue(mockFeed)
      vi.mocked(raindrop.create).mockRejectedValue(new Error('API Error'))

      await GET()

      expect(logger.error).toHaveBeenCalledWith('Failed to create raindrop', {
        item: 'https://test1.com',
        error: new Error('API Error'),
      })
    })

    it('should handle errors when committing metadata', async () => {
      const mockContext = { collectionId: 'testId', lastRunDate: 1000 }
      vi.mocked(redis.hgetall).mockResolvedValue(mockContext)
      vi.mocked(Parser.prototype.parseURL).mockResolvedValue({ items: [] })
      vi.mocked(redis.hset).mockRejectedValue(new Error('Redis Error'))

      await GET()

      expect(logger.error).toHaveBeenCalledWith(
        'Failed to commit cron context',
        {
          error: new Error('Redis Error'),
        },
      )
    })
  })
})
