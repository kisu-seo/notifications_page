/* === Vite Config / Vite 설정 === */
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createReadStream, existsSync } from 'fs'
import { join, extname } from 'path'

// --- Plugin: 프로젝트 루트의 assets/ 폴더를 dev 서버에서 정적으로 제공 ---
function serveRootAssets(): Plugin {
  return {
    name: 'serve-root-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url
        if (!url) return next()

        if (url.startsWith('/assets/') || url.startsWith('/favicon')) {
          const filePath = join(process.cwd(), url.split('?')[0])
          if (existsSync(filePath)) {
            const mimeTypes: Record<string, string> = {
              '.webp': 'image/webp',
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.ttf': 'font/ttf',
              '.txt': 'text/plain',
            }
            const contentType = mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream'
            res.setHeader('Content-Type', contentType)
            createReadStream(filePath).pipe(res as any)
            return
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveRootAssets()],
})
