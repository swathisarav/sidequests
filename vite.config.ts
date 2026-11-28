import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/sidequests/",   // 👈 MUST match your GitHub repo name
  build: {
    outDir: "docs",        // GitHub Pages serves the site from docs/
    emptyOutDir: true,     // clear old builds out of docs/ first
  },
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  // Dev speed: three.js is only imported lazily (the Basecamp scene), so Vite would otherwise
  // discover it mid-session, re-bundle and reload the page. Bundle it up front instead.
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'motion/react', 'react-dom/client'],
  },
  server: {
    // Compile the app's own files as soon as the dev server starts, not on the first page load.
    warmup: {
      clientFiles: ['./src/main.tsx', './src/app/App.tsx', './src/app/components/*.tsx', './src/app/components/basecamp/*.tsx'],
    },
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})
