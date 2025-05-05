import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({  // ←  GitHub Pages
  plugins: [react()],
  base: '/it-support-utbildning',
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7266', // ← backend-url
        changeOrigin: true,
        secure: false
      }
    }
  }
})
