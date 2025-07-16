# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Next.js 15, TypeScript, and Tailwind CSS. The blog uses MDX for content and includes features like authentication (Clerk), view tracking (Redis), and external integrations (Raindrop RSS).

## Common Commands

### Development

- `pnpm dev` - Start development server with turbo
- `pnpm build` - Build for production with turbo
- `pnpm start` - Start production server

### Testing

- `pnpm test` - Run unit tests (Vitest)
- `pnpm test:unit` - Run unit tests in watch mode
- `pnpm test:e2e` - Run end-to-end tests (Playwright)

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - TypeScript type checking

## Architecture

### Core Structure

- **App Router**: Uses Next.js 15 App Router in `src/app/`
- **Posts**: MDX blog posts in `src/app/posts/[slug]/page.mdx` with metadata exported as `post` object
- **Components**: Reusable UI components in `src/components/`
- **Lib**: Utilities and shared logic in `src/lib/`

### Key Files

- `src/lib/posts.ts` - Post discovery and metadata handling using fast-glob
- `src/middleware.ts` - API token authentication and CRON protection
- `src/app/layout.tsx` - Root layout with fonts (Inter, Roboto Mono) and providers
- `src/components/Layout.tsx` - Main layout wrapper with Clerk authentication

### MDX Integration

- Posts use MDX with `rehype-prism-plus` for syntax highlighting
- `remark-gfm` for GitHub Flavored Markdown support
- Each post exports a `post` object with `title`, `description`, `date`, `published`, and `views`

### Authentication & Security

- Clerk for user authentication
- API routes protected with `X-API-TOKEN` header
- CRON routes protected with `CRON_SECRET` bearer token
- Middleware handles geolocation and IP logging for unauthorized access

### Styling

- Tailwind CSS with custom typography configuration
- Dark mode support with `selector` strategy
- Custom font variables for Inter and Roboto Mono

### Testing Setup

- **Unit Tests**: Vitest with React Testing Library and jsdom
- **E2E Tests**: Playwright with Chromium, WebKit, and mobile browsers
- Setup file: `vitest-setup.ts`

### External Integrations

- **Redis**: Upstash Redis for view tracking
- **Raindrop**: RSS feed integration for bookmarks
- **Analytics**: Simple Analytics script
- **Vercel Functions**: Used for geolocation and IP detection

## Development Notes

### TypeScript Configuration

- Uses `@cosn/tsc` shared configuration
- Path alias `@/*` points to `src/*`
- Extends `@cosn/tsc/tsconfig-web`

### Code Quality Tools

- ESLint config extends `@cosn/tsc/eslint`
- Prettier config from `@cosn/tsc/prettier`
- Commitlint with conventional commits
- Husky + lint-staged for pre-commit hooks

### Build Configuration

- Uses Turbo for faster builds
- Webpack override for security (`>=5.94.0`)
- MDX experimental Rust support enabled
