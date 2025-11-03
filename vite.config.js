// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // ← YA LO TENÍAS, PERFECTO
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'firebase'],
          ui: ['lucide-react', 'react-hot-toast']
        }
      }
    }
  },
  server: {
    watch: {
      usePolling: false,
    },
    hmr: {
      overlay: false, // Quita el overlay molesto
    }
  }
});
