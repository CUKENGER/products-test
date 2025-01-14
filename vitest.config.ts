import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTests.ts',
      // browser: {
      //   enabled: true,
      //   name: 'chromium',
      //   provider: 'playwright',
      // },
    },
  })
)
