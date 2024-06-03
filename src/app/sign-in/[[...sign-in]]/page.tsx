'use client'

import { Container } from "@/components/Container";
import { ClerkProvider, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function AuthSignIn() {
  const resolvedTheme = useTheme().resolvedTheme
  const clerkAppearance = resolvedTheme === 'dark' ? dark : undefined

  return (
    <ClerkProvider>
      <Container className="mt-16 sm:mt-32">
        <div className="flex justify-center">
          <SignIn appearance={{ baseTheme: clerkAppearance }} />
        </div>
      </Container>
    </ClerkProvider>
  )
}
