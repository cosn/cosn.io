import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  const now = new Date('2024-06-01T13:00:00Z').getTime()

  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(now)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should format the date correctly in the "en-US" format', () => {
    const date = '2023-05-15'
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('May 2023')
  })

  it('should return "Earlier today" for a date earlier today', () => {
    const date = new Date(now - 60 * 60 * 1000).toISOString()
    const formattedDate = formatDate(date, true)
    expect(formattedDate).toBe('Earlier today')
  })

  it('should return "Yesterday" for a date that is one day ago', () => {
    const date = new Date(now - 24 * 60 * 60 * 1000).toISOString()
    const formattedDate = formatDate(date, true)
    expect(formattedDate).toBe('Yesterday')
  })

  it('should return "X days ago" for dates within the last week', () => {
    const date = new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString()
    const formattedDate = formatDate(date, true)
    expect(formattedDate).toBe('5 days ago')
  })

  it('should return "X weeks ago" for dates within the last two weeks', () => {
    const date = new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString()
    const formattedDate = formatDate(date, true)
    expect(formattedDate).toBe('1 weeks ago')
  })

  it('should return "This month" for dates within the current month but more than two weeks ago', () => {
    const date = new Date(now - 20 * 24 * 60 * 60 * 1000).toISOString()
    const formattedDate = formatDate(date, true)
    expect(formattedDate).toBe('This month')
  })

  it('should return "Last month" for dates within the last month but not this month', () => {
    const date = new Date(now - 40 * 24 * 60 * 60 * 1000).toISOString()
    const formattedDate = formatDate(date, true)
    expect(formattedDate).toBe('Last month')
  })

  it('should return the formatted date for dates older than a month', () => {
    const date = new Date(now - 60 * 24 * 60 * 60 * 1000).toISOString()
    const formattedDate = formatDate(date, true)
    expect(formattedDate).toBe('April 2024')
  })
})
