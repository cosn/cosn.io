import * as cheerio from 'cheerio'
import fs from 'fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET } from './route'

const url = 'http://localhost'
const req = new Request(url)

const ma = `
  <article>
    <h1>Test Title</h1>
    <time datetime="2023-01-01T00:00:00Z"></time>
    <div data-mdx-content>Test Content</div>
  </article>
`

vi.mock('cheerio')
vi.mock('feed')
vi.mock('fs')
vi.mock('path')

const mfs = vi.fn()
const mr = { text: vi.fn() }
const mfai = vi.fn()

mfs.mockResolvedValue(mr)
mr.text.mockResolvedValue(ma)
vi.stubGlobal('fetch', mfs)
// @ts-ignore
fs.readdirSync = vi.fn(() => [
  { name: 'post1', isDirectory: () => true },
  { name: 'post2', isDirectory: () => true },
])

// @ts-ignore
vi.spyOn(cheerio, 'load').mockImplementation(() => {
  const $ = vi.fn().mockReturnValue({
    first: vi.fn().mockReturnThis(),
    text: vi.fn().mockReturnValue('Test Title'),
    attr: vi.fn().mockReturnValue('2023-01-01T00:00:00Z'),
    html: vi.fn().mockReturnValue('Test Content'),
    find: vi.fn().mockReturnThis(),
  })
  return $
})

vi.mock('feed', () => {
  return {
    Feed: vi.fn().mockImplementation(() => ({
      addItem: mfai,
      rss2: vi.fn().mockReturnValue('<rss>Mocked RSS feed</rss>'),
    })),
  }
})

describe('GET', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_SITE_URL = url
  })

  it('throws an error if NEXT_PUBLIC_SITE_URL is not set', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    await expect(GET(req)).rejects.toThrow(
      'Missing NEXT_PUBLIC_SITE_URL environment variable',
    )
  })

  it('generates a feed with the correct structure', async () => {
    const response = await GET(req)
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/xml')
    expect(response.headers.get('cache-control')).toBe('s-maxage=31556952')

    const responseBody = await response.text()
    expect(responseBody).toEqual('<rss>Mocked RSS feed</rss>')
  })

  it('correctly processes post data', async () => {
    await GET(req)

    expect(mfai).toHaveBeenCalledWith({
      title: 'Test Title',
      id: `${url}/posts/post1`,
      link: `${url}/posts/post1`,
      content: 'Test Content',
      date: new Date('2023-01-01T00:00:00Z'),
    })

    expect(mfai).toHaveBeenCalledWith({
      title: 'Test Title',
      id: `${url}/posts/post2`,
      link: `${url}/posts/post2`,
      content: 'Test Content',
      date: new Date('2023-01-01T00:00:00Z'),
    })
  })

  it('handles missing article data gracefully', async () => {
    mr.text.mockResolvedValue(`<article></article>`)

    const response = await GET(req)
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/xml')
    expect(response.headers.get('cache-control')).toBe('s-maxage=31556952')

    const responseBody = await response.text()
    expect(responseBody).toEqual('<rss>Mocked RSS feed</rss>')
  })
})
