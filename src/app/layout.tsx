import { SpeedInsights } from "@vercel/speed-insights/next"
import { type Metadata } from 'next'
import Script from 'next/script'

import { Providers } from '@/app/providers'
import { ClerkProvider } from '@clerk/nextjs'
import { Layout } from '@/components/Layout'

import '@/styles/globals.css'
import { Inter, Roboto_Mono } from 'next/font/google'

import { meta } from '@/lib/meta'
import { cn } from '@/lib/utils'

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
    default:
      `${blogName} - Ideas, observations, thoughts`,
  },
  description: meta.description,
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: blogName,
    siteName: blogName,
    url: process.env.NEXT_PUBLIC_SITE_URL,
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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <body className={cn(
          "flex h-full bg-zinc-50 dark:bg-black font-sans",
          fontInter.variable, fontRoboto.variable
          )}>
          <Providers>
            <div className="flex w-full">
              <Layout>{children}</Layout>
            </div>
          </Providers>
          <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
