import { type Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import { meta } from '@/lib/meta'
import { cn, siteUrl } from '@/lib/utils'

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const fontRoboto = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const blogName = meta.title

export const metadata: Metadata = {
  title: {
    template: `%s - ${blogName}`,
    default: `${blogName} - Ideas, observations, thoughts`,
  },
  description: meta.description,
  alternates: {
    types: {
      'application/rss+xml': `${siteUrl('rss')}`,
    },
  },
  openGraph: {
    title: blogName,
    siteName: blogName,
    url: siteUrl(),
    description: meta.description,
    type: 'website',
  },
  robots: {
    follow: true,
    index: true,
  },
  twitter: {
    title: blogName,
    creator: '@getCos',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full antialiased' suppressHydrationWarning>
      <body
        className={cn(
          'flex h-full bg-zinc-50 font-sans dark:bg-black',
          fontInter.variable,
          fontRoboto.variable,
        )}
      >
        <Providers>
          <div className='flex w-full'>
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Script src='https://scripts.simpleanalyticscdn.com/latest.js' />
      </body>
    </html>
  )
}
