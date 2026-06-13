/* === [Vite Config / Vite 빌드 설정] === */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/notifications_page/',
  plugins: [react(), tailwindcss()],
})
