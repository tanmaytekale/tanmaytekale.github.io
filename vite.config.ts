import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/radical-creativity.github.io/",
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