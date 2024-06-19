import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest } from 'next/server'
import logger from '@/lib/logger'

export async function GET(req: NextRequest) {
  const targets: string[] = []

  /* eslint-disable no-unused-vars */
  const revalidate = (param: string, revalidateFn: (_item: string) => void) => {
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
