import { forwardRef } from 'react'
import clsx from 'clsx'
import { ClerkProvider } from '@clerk/nextjs'

export const ContainerOuter = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function OuterContainer({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

export const ContainerInner = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function InnerContainer({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

interface ContainerProps extends React.ComponentPropsWithoutRef<typeof ContainerOuter> {
  excludeClerk?: boolean;
}

export const Container = forwardRef<React.ElementRef<typeof ContainerOuter>, ContainerProps>
  (function Container({ children, excludeClerk: excludeClerk, ...props }, ref) {
    const content = (
      <ContainerOuter ref={ref} {...props}>
        <ContainerInner>{children}</ContainerInner>
      </ContainerOuter>
    )

    return excludeClerk ? content : (
      <ClerkProvider>
        {content}
      </ClerkProvider>
    )
  })
