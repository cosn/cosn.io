import { type Metadata } from 'next'
import Image, { type StaticImageData } from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import logoArc from '@/images/logos/arc.svg'
import logoAtoB from '@/images/logos/atob.svg'
import logoBend from '@/images/logos/bend.svg'
import logoBridge from '@/images/logos/bridge.svg'
import logoBuk from '@/images/logos/buk.svg'
import logoChai from '@/images/logos/chai.png'
import logoCoverbase from '@/images/logos/coverbase.svg'
import logoDidero from '@/images/logos/didero.png'
import logoDosu from '@/images/logos/dosu.svg'
import logoDuna from '@/images/logos/duna.svg'
import logoEarthly from '@/images/logos/earthly.svg'
import logoFragment from '@/images/logos/fragment.png'
import logoLassie from '@/images/logos/lassie.jpg'
import logoLorikeet from '@/images/logos/lorikeet.svg'
import logoMobyTrade from '@/images/logos/mobytrade.png'
import logoModernLoop from '@/images/logos/modernloop.svg'
import logoNerve from '@/images/logos/nerve.png'
import logoOpine from '@/images/logos/opine.svg'
import logoParcha from '@/images/logos/parcha.svg'
import logoFallback from '@/images/logos/portfolio.svg'
import logoRepool from '@/images/logos/repool.svg'
import logoRunloop from '@/images/logos/runloop.svg'
import logoSavvy from '@/images/logos/savvy.svg'
import logoSdsa from '@/images/logos/sdsa.jpg'
import logoSpark from '@/images/logos/spark.png'
import logoStandardFleet from '@/images/logos/standardfleet.png'
import logoWholesail from '@/images/logos/wholesail.svg'
import logoXflow from '@/images/logos/xflow.svg'

type Investment = {
  name: string
  description: string
  link: `https://${string}`
  logo: StaticImageData
}

const investments: Investment[] = [
  {
    name: 'Arc',
    description: 'Empowering startups with modern financial products.',
    link: 'https://joinarc.com',
    logo: logoArc,
  },
  {
    name: 'Savvy',
    description:
      'Striving to build a leading team of financial advisors and technologists to create the modern, all-in-one RIA and wealth management platform.',
    link: 'https://savvywealth.com',
    logo: logoSavvy,
  },
  {
    name: 'Repool',
    description: 'Building the future of hedge fund solutions.',
    link: 'https://repool.com',
    logo: logoRepool,
  },
  {
    name: 'AtoB',
    description: 'Helping fleets manage their costs.',
    link: 'https://atob.com',
    logo: logoAtoB,
  },
  {
    name: 'Wholesail',
    description: 'Modernizing B2B Trade.',
    link: 'https://paywholesail.com',
    logo: logoWholesail,
  },
  {
    name: 'Fragment',
    description: 'The database for money.',
    link: 'https://fragment.dev',
    logo: logoFragment,
  },
  {
    name: 'StandardFleet',
    description: 'Effortless EV fleet management.',
    link: 'https://standardfleet.com',
    logo: logoStandardFleet,
  },
  {
    name: 'Bend',
    description:
      'Bend enriches spend and business activity data with comprehensive emissions estimates, delivering exceptionally accurate, industry-standard scope 3 goods & services reporting.',
    link: 'https://bend.green',
    logo: logoBend,
  },
  {
    name: 'Opine',
    description:
      'Enabling pre-sales teams to deliver white-glove POCs/pilots at scale while increasing win rates, lowering customer acquisition costs, and reducing time-to-value.',
    link: 'https://tryopine.com',
    logo: logoOpine,
  },
  {
    name: 'Coverbase',
    description: 'Fully flexible risk assessment workflows.',
    link: 'https://coverbase.ai',
    logo: logoCoverbase,
  },
  {
    name: 'Lassie',
    description:
      'Helping doctors to achieve independence by making it easier to start and manage their businesses.',
    link: 'https://golassie.com',
    logo: logoLassie,
  },
  {
    name: 'Duna',
    description: 'Rethinking business identity.',
    link: 'https://duna.io',
    logo: logoDuna,
  },
  {
    name: 'Dosu',
    description:
      'Dosu is an AI teammate that lives in your GitHub repo, helping you respond to issues, triage bugs, and build better documentation.',
    link: 'https://dosu.dev',
    logo: logoDosu,
  },
  {
    name: 'Lorikeet',
    description: 'AI customer support so powerful it feels human.',
    link: 'https://www.lorikeetcx.ai',
    logo: logoLorikeet,
  },
  {
    name: 'ModernLoop',
    description: 'Efficiently transform your candidate experience.',
    link: 'https://modernloop.com',
    logo: logoModernLoop,
  },
  {
    name: 'Xflow',
    description: 'Powering international payments for businesses.',
    link: 'https://xflowpay.com',
    logo: logoXflow,
  },
  {
    name: 'Buk',
    description:
      'A People Management Software for all the needs of your collaborators.',
    link: 'https://buk.cl',
    logo: logoBuk,
  },
  {
    name: 'Bridge',
    description: 'Stablecoin API for developers.',
    link: 'https://bridge.xyz',
    logo: logoBridge,
  },
  {
    name: 'Didero',
    description: 'Supply Chain x AI.',
    link: 'https://didero.ai',
    logo: logoDidero,
  },
  {
    name: 'Runloop',
    description: 'The Ultimate Python Workflow Engine for AI.',
    link: 'https://runloop.ai',
    logo: logoRunloop,
  },
  {
    name: 'Parcha',
    description:
      'Accelerate financial innovation by empowering cutting-edge banks and fintechs to efficiently onboard more customers faster with stronger compliance.',
    link: 'https://parcha.com',
    logo: logoParcha,
  },
  {
    name: 'Spark',
    description: 'AI workflows for utility and community solar projects.',
    link: 'https://sparkhq.ai',
    logo: logoSpark,
  },
  {
    name: 'MobyTrade',
    description: 'Take back control of your supply chain.',
    link: 'https://mobytrade.com',
    logo: logoMobyTrade,
  },
  {
    name: 'Earthly',
    description: 'Simple, Fast, Consistent Builds.',
    link: 'https://earthly.dev',
    logo: logoEarthly,
  },
  {
    name: 'Nerve',
    description: 'The AI home page for your work.',
    link: 'https://www.usenerve.com',
    logo: logoNerve,
  },
  {
    name: 'Chai Discovery',
    description: 'Transform biology from science into engineering.',
    link: 'https://www.chaidiscovery.com',
    logo: logoChai,
  },
  {
    name: '/dev/agents',
    description: 'The next-gen operating system for AI agents.',
    link: 'https://sdsa.com',
    logo: logoSdsa,
  },
]

const LinkIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' {...props}>
      <path
        d='M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Porfolio',
  description: 'Angel investments',
}

const Portfolio = () => {
  return (
    <SimpleLayout
      title={metadata.description!}
      intro="As an angel investor and Sequoia scout, I invest in a handful of seed and pre-seed startups each year. I'm motivated by supporting the community and learning from the process. If you're an early-stage founder and believe I could be helpful, feel free to email me your pitch deck, and we can take it from there. Below are some of my previous investments."
    >
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3'
      >
        {investments
          .sort((a, z) =>
            a.name.toLowerCase() > z.name.toLowerCase() ? 1 : -1,
          )
          .map((investment) => (
            <Card as='li' key={investment.name}>
              <div className='relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0'>
                <Image
                  src={investment.logo ?? logoFallback}
                  alt=''
                  className='h-8 w-8'
                />
              </div>
              <h2 className='mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100'>
                <Card.Link href={investment.link} target='_blank'>
                  {investment.name}
                </Card.Link>
              </h2>
              <Card.Description>{investment.description}</Card.Description>
              <p className='relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200'>
                <LinkIcon className='h-6 w-6 flex-none' />
                <span className='ml-2'>{investment.link.slice(8)}</span>
              </p>
            </Card>
          ))}
      </ul>
    </SimpleLayout>
  )
}

export default Portfolio
