import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // LAN内からアクセス可能にする
    port: 3000,       // 好きなポート番号
    allowedHosts: ["1547cb9643f4.ngrok-free.app"],
  },
  plugins: [react(), svgr()],
})
