import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { geolocation, ipAddress } from '@vercel/functions'
import { type NextRequest } from 'next/server'
import pino from 'pino'

const logger = pino({ name: 'middleware' })

const apiTokenRoute = createRouteMatcher(['/revalidate(.*)'])
const handleApiTokenRoute = (req: NextRequest) => {
  const token = req.headers.get('X-API-TOKEN')

  if (token !== process.env.API_TOKEN) {
    logger.warn('Unauthorized', {
      ip: ipAddress(req),
      geo: geolocation(req),
      token: token,
    })
    return new Response('Unauthorized', { status: 401 })
  }

  return null
}

const cronTokenRoute = createRouteMatcher(['/cron(.*)'])
const handleCronTokenRoute = (req: NextRequest) => {
  const token = req.headers.get('authorization')

  if (token !== `Bearer ${process.env.CRON_SECRET}`) {
    logger.warn('Unauthorized', {
      ip: ipAddress(req),
      geo: geolocation(req),
      token: token,
    })
    return new Response('Unauthorized', { status: 401 })
  }

  return null
}

export default clerkMiddleware(async (_, req) => {
  if (process.env.NODE_ENV === 'development') return null

  let res
  if (apiTokenRoute(req)) {
    res = handleApiTokenRoute(req)
  } else if (cronTokenRoute(req)) {
    res = handleCronTokenRoute(req)
  }

  if (res) return res
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
