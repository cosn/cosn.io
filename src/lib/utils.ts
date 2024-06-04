import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function siteUrl(...paths: string[]) {
  const site = process.env.NEXT_PUBLIC_SITE_URL

  if (!site) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  let url = site

  if (paths.length > 0) {
    const cleanPaths = paths.map((path) => {
      while (path.startsWith('/')) {
        path = path.slice(1)
      }
      return path
    })

    url = `${site}/${cleanPaths.join('/')}`
  }

  return url
}
