'use client'

import { Container } from "@/components/Container";
import { ClerkProvider, SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Auth() {
  const resolvedTheme = useTheme().resolvedTheme
  const clerkAppearance = resolvedTheme === 'dark' ? dark : undefined

  return (
    <ClerkProvider>
      <Container className="mt-16">
        <div className="flex justify-center">
          <SignUp appearance={{ baseTheme: clerkAppearance }} />
        </div>
      </Container>
    </ClerkProvider>
  )
}