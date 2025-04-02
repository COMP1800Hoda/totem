import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'node:crypto': fileURLToPath(new URL('./node_modules/crypto-browserify', import.meta.url)),
      'node:assert': fileURLToPath(new URL('./node_modules/browser-assert', import.meta.url)),
      'node:url': fileURLToPath(new URL('./node_modules/url', import.meta.url)),
      'node:path': fileURLToPath(new URL('./node_modules/path-browserify', import.meta.url)),
    },
  },
});