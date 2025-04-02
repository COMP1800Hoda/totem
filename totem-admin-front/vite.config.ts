import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'node:crypto': require.resolve('crypto-browserify'),
      'node:assert': require.resolve('browser-assert'),
      'node:url': require.resolve('url'),
      'node:path': require.resolve('path-browserify'),
    },
  },
});