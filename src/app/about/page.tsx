import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    "Hello!",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-100">
            Cosmin Nicolaescu
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I'm an engineer, operator, and entrepreneur.
            </p>
            <p>
              Most recently I was the CTO of <span className="font-bold">Brex</span>, where I scaled the company from 40 to over 1,000 employees and hundreds of millions in annual revenue. I've also worked at <span className="font-bold">Stripe</span> as an early engineer and manager, building core global payments infrastructure, and launching the Stripe Terminal product. I started my career at <span className="font-bold">Microsoft</span>, working on the early versions of Azure and Office365.
            </p>
            <p>
              Moving places has helped me embrace changes of varying magnitudes. I've so far lived in the following cities:
            </p>
            <ul className="list-disc ml-8">
              <li>Born in Bucharest, Romania</li>
              <li>Exchange student in Deatsville, AL</li>
              <li>University in Philadelphia, PA</li>
              <li>Vancouver, BC</li>
              <li>Seattle, WA</li>
              <li>San Francisco, CA</li>
              <li>Los Angeles, CA</li>
            </ul>
          </div>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>Some opinions and beliefs I've formed over time:</p>
            <ul className="list-disc ml-8">
              <li><span className="italic">Everything compounds</span>
                <ul className="list-disc ml-4">
                  <li>Investing in something, and then letting it grow, leads to surprising moats</li>
                  <li>Conversely, a series of poor decisions or constant <a href="https://en.wikipedia.org/wiki/Tacking_(sailing)" target="_blank" className="underline">tacking</a> is tremendously difficult to recover from</li>
                </ul>
              </li>
              <li className="mt-2"><span className="italic">Time is our most precious resource</span>
                <ul className="list-disc ml-4">
                  <li>At least for now, you can't buy more, nor manipulate</li>
                  <li>Memories are more valuable than vast majority of material goods</li>
                </ul>
              </li>
              <li className="mt-2"><span className="italic">Speed matters</span>
                <ul className="list-disc ml-4">
                  <li>In a multi-step problem, reduce the long-pole, recursively</li>
                  <li>Everything can move faster, though you should focus on accelerating the things that move the needle</li>
                  <li>How fast you act and respond is a signal to others</li>
                </ul>
              </li>
              <li className="mt-2"><span className="italic">Smaller teams are better</span>
                <ul className="list-disc ml-4">
                  <li>There's less overhead, leads to faster decisions, and is more fun for everyone involved</li>
                  <li>Scarcity of resources increases focus and leads to better prioritization</li>
                  <li>The failure modes of under-staffing tend to be much less severe than those of over-hiring</li>
                </ul>
              </li>
              <li className="mt-2"><span className="italic">Extreme positions often lead to suboptimal outcomes</span>
                <ul className="list-disc ml-4">
                  <li>Most often you're simply balancing multiple variables, which leads to various tradeoffs</li>
                  <li>People tend to over-simplify problems (also people, i.e. "person X is good/bad")</li>
                  <li>In conflict, the truth is somewhere in the middle</li>
                  <li>Few situations are zero-sum, and you should strive to avoid them</li>
                </ul>
              </li>
              <li className="mt-2"><span className="italic">EQ tends to be underrated</span>
                <ul className="list-disc ml-4">
                  <li>Individuals have unique reactions, so no matter how great one is at pattern-matching, outcomes are highly dependent on the mix of individuals involved</li>
                  <li>Being able to read the room can give you a significant advantage, especially in tech</li>
                  <li>Learn to trust your instincts, and constantly fine-tune them with new experiences</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://twitter.com/getCos" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="https://github.com/cosn" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/cosminn" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:blog@cosn.io"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              Send email
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container >
  )
}
