import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { siteUrl } from './utils'

const originalEnv = process.env

beforeEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost'
})

afterEach(() => {
  process.env = originalEnv
})

describe('siteUrl', () => {
  it('should throw an error if NEXT_PUBLIC_SITE_URL is not defined', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL

    expect(() => siteUrl()).toThrowError(
      'Missing NEXT_PUBLIC_SITE_URL environment variable',
    )
  })

  it('should return the base site URL if no path is provided', () => {
    const url = siteUrl()
    expect(url).toBe('http://localhost/')
  })

  it('should return the full URL with the provided path', () => {
    const url = siteUrl('about')
    expect(url).toBe('http://localhost/about')
  })

  it('should remove the leading slash from the path', () => {
    const url = siteUrl('/about')
    expect(url).toBe('http://localhost/about')
  })

  it('should handle an empty string path correctly', () => {
    const url = siteUrl('')
    expect(url).toBe('http://localhost/')
  })

  it('should handle multiple leading slashes in the path', () => {
    const url = siteUrl('///about')
    expect(url).toBe('http://localhost/about')
  })

  it('should handle paths with query parameters', () => {
    const url = siteUrl('/about?foo=bar')
    expect(url).toBe('http://localhost/about?foo=bar')
  })

  it('should handle paths with hash fragments', () => {
    const url = siteUrl('/about#section1')
    expect(url).toBe('http://localhost/about#section1')
  })

  it('should handle paths with both query parameters and hash fragments', () => {
    const url = siteUrl('/about?foo=bar#section1')
    expect(url).toBe('http://localhost/about?foo=bar#section1')
  })

  it('should return the full URL with multiple paths', () => {
    const url = siteUrl('about', '/hello', 'world')
    expect(url).toBe('http://localhost/about/hello/world')
  })
})
