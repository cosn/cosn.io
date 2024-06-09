import logger from '@/lib/logger'
import { revalidatePath, revalidateTag } from 'next/cache'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const token = headers().get('X-API-TOKEN')
  if (!token || token !== process.env.API_TOKEN) {
    logger.error('Unauthorized', { ip: req.ip, geo: req.geo, token: token })

    return new Response('Unauthorized', { status: 401 })
  }

  let targets: string[] = []

  const revalidate = (param: string, revalidateFn: (item: string) => void) => {
    const key = req.nextUrl.searchParams.get(param)
    if (key) {
      key.split(',').forEach((item) => {
        logger.verbose(`Revalidating ${param.slice(0, -1)}`, { item })
        revalidateFn(item)
        targets.push(item)
      })
    }
  }

  revalidate('paths', revalidatePath)
  revalidate('tags', revalidateTag)

  return Response.json({ revalidated: targets })
}
