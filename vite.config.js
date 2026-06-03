import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'frontend',
  publicDir: '../public',
  css: {
    postcss: __dirname,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'frontend/index.html'),
        learn: resolve(__dirname, 'frontend/learn.html'),
        terms: resolve(__dirname, 'frontend/terms.html'),
        privacy: resolve(__dirname, 'frontend/privacy.html'),
      },
    },
  },
});
