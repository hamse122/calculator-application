import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration for the calculator application
 * Includes React plugin and Vitest test configuration
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  // @ts-ignore - Vitest types
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})

