'use client'

import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { Container } from '@/components/Container'

export default function AuthSignUp() {
  const resolvedTheme = useTheme().resolvedTheme
  const clerkAppearance = resolvedTheme === 'dark' ? dark : undefined

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="flex justify-center">
        <SignUp appearance={{ baseTheme: clerkAppearance }} />
      </div>
    </Container>
  )
}
