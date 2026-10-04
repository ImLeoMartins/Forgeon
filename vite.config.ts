import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path/win32';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Forgeon/",
  resolve: {
  alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
