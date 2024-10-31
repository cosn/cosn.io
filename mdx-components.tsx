import { type MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'

export const useMDXComponents = (components: MDXComponents) => {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
  }
}
