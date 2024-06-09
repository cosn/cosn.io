
import logger from '@/lib/logger'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  let result = false
  const path = req.nextUrl.searchParams.get('path')
  if (path) {
    logger.verbose('Revalidating posts', { path })
    revalidatePath(path)
    result = true
  }

  return Response.json({ revalidated: result })
}
