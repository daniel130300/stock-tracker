import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name: "Stock Tracker App",
    short_name:"Stock App",
    description:"I am a simple vite app",
    icons:[{
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
    {
      src: '/android-chrome-512x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable',
    }
  ],
  theme_color:'#171717',
  background_color:'#f0e7db',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
} as Partial<VitePWAOptions>

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
