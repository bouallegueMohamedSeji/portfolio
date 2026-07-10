import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Builds to a stable, non-hashed filename so the parent static site
// (../index.html) can reference it without regenerating on every rebuild.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      output: {
        entryFileNames: 'ascii-hero.js',
        chunkFileNames: 'ascii-hero-[name].js',
        assetFileNames: 'ascii-hero.[ext]',
        manualChunks: undefined,
      },
    },
  },
})
