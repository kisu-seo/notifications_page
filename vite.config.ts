/* === [Vite Config / Vite 빌드 설정] === */
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createReadStream, existsSync } from 'fs'
import { join, extname } from 'path'

/**
 * @function serveRootAssets
 * @description 개발 서버(Dev Server) 작동 시, 프로젝트 루트의 assets/ 폴더 및 favicon 등의 정적 자원을 미들웨어(Middleware)를 거쳐 정적 파일로 올바르게 제공하기 위한 커스텀 Vite 플러그인
 * @returns {Plugin} Vite 플러그인 객체
 */
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
            createReadStream(filePath).pipe(res)
            return
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base: '/notifications_page/',
  plugins: [react(), tailwindcss(), serveRootAssets()],
})
