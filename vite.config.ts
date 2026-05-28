import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Trigger build to clear custom domain cache
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', 'gsap/all', '@gsap/react'],
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    minify: 'esbuild',
    cssMinify: true
  }
})
