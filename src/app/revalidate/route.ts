import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest } from 'next/server'
import logger from '@/lib/logger'

export const POST = async (req: NextRequest) => {
  const targets: string[] = []

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
