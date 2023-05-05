import { defineConfig, splitVendorChunkPlugin } from 'vite';
import preact from '@preact/preset-vite';
import compress from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    preact(),
    splitVendorChunkPlugin(),
    compress()
  ],
  root: 'src',
  resolve: {
    alias: {
      react: 'preact/compat'
    }
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/endpoint': {
        target: 'http://localhost:4000',
        secure: false,
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'esnext',
    emptyOutDir: true,
    outDir: '../build',
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js'
  }
});
