// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  base: '/',  // ← AGREGADO: importante para Vercel (assets se sirven desde raíz)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['firebase'],  // bien para Firebase modular
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,  // útil para debug en Vercel
    commonjsOptions: {
      exclude: ['firebase'],
    },
    rollupOptions: {
      output: {
        // Asegura que los chunks CSS/JS se nombren bien
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    https: true,
    host: true,
    port: 5173,
  },
});
