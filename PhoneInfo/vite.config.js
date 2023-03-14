// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        track: resolve(__dirname, 'HTML/track.html'),
        service: resolve(__dirname, 'HTML/service.html'),
        compare: resolve(__dirname, 'HTML/compare.html'),
        signin: resolve(__dirname, 'HTML/signIn.html'),
      },
    },
  },
})
