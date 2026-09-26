import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.jsx',
    globals: true,
  },
})