import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/it-support-utbildning/',  // ←  GitHub Pages
  plugins: [react()],
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
