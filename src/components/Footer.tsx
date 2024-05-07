import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from '@/components/SocialIcons'

import { meta } from '../lib/meta'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" target="_blank" {...props}>
      <Icon className="h-6 w-6 fill-zinc-400 transition hover:fill-teal-500 dark:fill-zinc-500 dark:hover:fill-teal-400" />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium">
                <SocialLink href="https://twitter.com/getCos" icon={XIcon}>
                  Follow on X
                </SocialLink>
                <SocialLink href="https://github.com/cosn" icon={GitHubIcon}>
                  Follow on GitHub
                </SocialLink>
                <SocialLink href="https://linkedin.com/in/cosminn" icon={LinkedInIcon}>
                  Follow on LinkedIn
                </SocialLink>
                <SocialLink href="mailto:blog@cosn.io" icon={MailIcon}>
                  Send email
                </SocialLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} {meta.author}. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
