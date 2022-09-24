import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    checker({
      overlay: false,
      eslint: {
        lintCommand: 'eslint ./src --ext .js',
      },
    }),],
  server: {
    host: true,
    port: 8080,
  },
})
