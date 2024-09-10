import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ['./vitest-setup.ts'],
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/e2e/**'],
  },
})
