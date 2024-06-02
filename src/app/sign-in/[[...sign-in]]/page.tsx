'use client'

import { Container } from "@/components/Container";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function AuthSignIn() {
  const resolvedTheme = useTheme().resolvedTheme
  const clerkAppearance = resolvedTheme === 'dark' ? dark : undefined

  return (
    <Container className="mt-16">
      <div className="flex justify-center">
        <SignIn appearance={{ baseTheme: clerkAppearance }} />
      </div>
    </Container>
  )
}
