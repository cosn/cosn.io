import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function siteUrl(path?: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL

  if (!site) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  let url = site

  if (path) {
    if (path.startsWith('/')) {
      path = path.slice(1)
    }

    url = `${site}/${path}`
  }

  return url
}
