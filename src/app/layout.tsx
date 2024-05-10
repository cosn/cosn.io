import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

import { meta } from '../lib/meta'

import { SpeedInsights } from "@vercel/speed-insights/next"

const blogName = meta.title

export const metadata: Metadata = {
  title: {
    template: `%s - ${blogName}`,
    default:
      `${blogName} - Ideas, observations, thoughts`,
  },
  description:
    'Observations from building software & companies, plus the occasional random life experiences.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: blogName,
    siteName: blogName,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    description:
      'Observations from building software & companies, plus the occasional random life experiences.',
    type: 'website',
  },
  robots: {
    follow: true,
    index: true,
  },
  twitter: {
    title: blogName,
    creator: '@getCos',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
