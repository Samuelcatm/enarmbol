import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],  // AGREGA mkcert() PARA HTTPS TRUSTED
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['firebase']
  },
  build: {
    commonjsOptions: {
      exclude: ['firebase']
    }
  },
  server: {
    https: true,  // FUERZA HTTPS DEV TRUSTED
    host: true,   // EXPOSE localhost:5173
    port: 5173
  }
});
