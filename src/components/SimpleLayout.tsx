import { Container } from '@/components/Container'
import { ClerkProvider } from '@clerk/nextjs'

export function SimpleLayout({
  title,
  intro,
  excludeClerk: excludeClerk,
  children,
}: {
  title: string
  intro: string
  excludeClerk?: boolean
  children?: React.ReactNode
}) {
  const container = (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-100 font-mono">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )

  return excludeClerk ? container : (
    <ClerkProvider>
      {container}
    </ClerkProvider>
  )
}
