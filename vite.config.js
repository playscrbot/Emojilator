import { defineConfig } from 'vite';
import ViteReact from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteReact()],
  server: {
    host: '0.0.0.0',
  }
})
