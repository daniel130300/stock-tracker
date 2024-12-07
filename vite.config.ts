import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Stock Tracker App',
        short_name: 'StockTracker',
        description: 'A Progressive Web App using Vite and React',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes:'192x192',
            type:'image/png',
            purpose:'favicon'
          },
          {
            src:'/android-chrome-512x512.png',
            sizes:'512x512',
            type:'image/png',
            purpose:'favicon'
          },
          {
            src: '/apple-touch-icon.png',
            sizes:'180x180',
            type:'image/png',
            purpose:'apple touch icon',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
