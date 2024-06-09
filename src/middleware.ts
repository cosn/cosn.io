import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import pino from 'pino'

const logger = pino({ name: 'middleware' })

const apiTokenRoute = createRouteMatcher(['/revalidate(.*)'])
const handleApiTokenRoute = (req: NextRequest) => {
  const token = req.headers.get('X-API-TOKEN')

  if (!token || token !== process.env.API_TOKEN) {
    logger.error('Unauthorized', { ip: req.ip, geo: req.geo, token: token })
    return new Response('Unauthorized', { status: 401 })
  }

  return null
}

export default clerkMiddleware((_, req) => {
  if (apiTokenRoute(req)) {
    const res = handleApiTokenRoute(req)
    if (res) return res
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
