import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    // Raise the chunk-size warning limit slightly for a portfolio with animations
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor libs into a separate chunk for better caching
        manualChunks: {
          "react-vendor":   ["react", "react-dom"],
          "motion-vendor":  ["framer-motion"],
        },
      },
    },
  },
});
