import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        'dist-electron/',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Critical files require higher coverage
        'src/stores/**/*.ts': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/router/**/*.ts': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },
    },
    // Security-focused test configuration
    include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}', 'tests/**/*.{test,spec}.{ts,tsx,js,jsx}'],
    exclude: [
      'node_modules/',
      'dist/',
      'dist-electron/',
      '**/*.d.ts',
    ],
    // Performance and reliability
    testTimeout: 10000,
    hookTimeout: 10000,
    isolate: true,
    singleThread: false,
    // Fail on unhandled rejections
    onUnhandledRejection: 'error',
  },
  // Security scanning during tests
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
  },
})
