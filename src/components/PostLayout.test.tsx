import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { PostLayout } from './PostLayout'
import { incrementViews } from '@/api/views'
import { AppContext } from '@/app/providers'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}))

vi.mock('@/api/views', () => ({
  incrementViews: vi.fn(),
}))

describe('PostLayout', () => {
  const post = {
    title: 'Test Post',
    date: '2023-05-30',
    slug: 'test-post',
    description: 'test description',
    published: true,
    views: 7,
  }

  beforeEach(() => {
    cleanup()
    vi.resetAllMocks()

    // @ts-ignore
    useSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue(false),
    })

    // @ts-ignore
    incrementViews.mockResolvedValue(10)
  })

  it('renders the post title and date', () => {
    render(
      <PostLayout post={post}>
        <div>Post content</div>
      </PostLayout>,
    )

    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('May 2023')).toBeInTheDocument()
  })

  it('does not render the back button when previousPathname is not provided', () => {
    // @ts-ignore
    usePathname.mockReturnValue('/blog/test-post')

    render(
      <AppContext.Provider value={{ previousPathname: undefined }}>
        <PostLayout post={post}>
          <div>Post content</div>
        </PostLayout>
      </AppContext.Provider>,
    )

    expect(screen.queryByLabelText('Go back to posts')).not.toBeInTheDocument()
  })

  it('renders the back button when previousPathname is provided', () => {
    // @ts-ignore
    usePathname.mockReturnValue('/blog/test-post')

    render(
      <AppContext.Provider value={{ previousPathname: '/blog' }}>
        <PostLayout post={post}>
          <div>Post content</div>
        </PostLayout>
      </AppContext.Provider>,
    )

    expect(screen.getByLabelText('Go back to posts')).toBeInTheDocument()
  })

  it('navigates back when the back button is clicked', () => {
    const routerMock = { back: vi.fn() }
    // @ts-ignore
    useRouter.mockReturnValue(routerMock)
    // @ts-ignore
    usePathname.mockReturnValue('/blog/test-post')

    render(
      <AppContext.Provider value={{ previousPathname: '/blog' }}>
        <PostLayout post={post}>
          <div>Post content</div>
        </PostLayout>
      </AppContext.Provider>,
    )

    fireEvent.click(screen.getByLabelText('Go back to posts'))
    expect(routerMock.back).toHaveBeenCalledTimes(1)
  })

  it('renders the post content', () => {
    render(
      <PostLayout post={post}>
        <div>Post content</div>
      </PostLayout>,
    )

    expect(screen.getByText('Post content')).toBeInTheDocument()
  })

  it('increments views when the component mounts', () => {
    vi.stubEnv('NODE_ENV', 'production')

    render(
      <PostLayout post={post}>
        <div>Post content</div>
      </PostLayout>,
    )

    expect(incrementViews).toHaveBeenCalledWith('test-post')
  })

  it('does not increment views in development environment', () => {
    vi.stubEnv('NODE_ENV', 'development')

    render(
      <PostLayout post={post}>
        <div>Post content</div>
      </PostLayout>,
    )

    expect(incrementViews).not.toHaveBeenCalled()
  })

  it('renders the view count when showviews query param is true', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    // @ts-ignore
    useSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue('true'),
    })

    render(
      <PostLayout post={post}>
        <div>Post content</div>
      </PostLayout>,
    )

    expect(await screen.findByText('[10 views]')).toBeInTheDocument()
  })

  it('does not render the view count when showviews query param is false or not present', () => {
    vi.stubEnv('NODE_ENV', 'production')
    // @ts-ignore
    useSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue('false'),
    })

    render(
      <PostLayout post={post}>
        <div>Post content</div>
      </PostLayout>,
    )

    expect(screen.queryByText(/views/)).not.toBeInTheDocument()
  })
})
