import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist"
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true
  },
  plugins: [
    react(),
    tailwindcss()
  ]
});