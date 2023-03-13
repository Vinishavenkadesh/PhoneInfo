// vite.config.js
const { resolve } = require('path')

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        track: resolve(__dirname, 'HTML/track.html'),
        compare : resolve(__dirname, 'HTML/compare.html'),
        service : resolve(__dirname, 'HTML/service.html'),
      }
    }
  }
}