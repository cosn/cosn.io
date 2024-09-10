import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.stubEnv('RAINDROP_TOKEN', 'vitest-setup-token')
vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'vitest-setup-token')
vi.stubEnv('UPSTASH_REDIS_REST_URL', 'http://localhost')
