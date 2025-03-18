import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensures React auto-import
  },
  // Start Electron after Vite is ready
  plugins: [
    {
      name: 'electron-start',
      configureServer(server) {
        let electronProcess = null;
        server.httpServer?.on('listening', () => {
          if (!electronProcess) {
            electronProcess = spawn('npx', ['electron', '.'], { stdio: 'inherit' });
          }
        });
      },
    },
  ],
});