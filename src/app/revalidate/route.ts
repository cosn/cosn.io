import logger from '@/lib/logger'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
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
