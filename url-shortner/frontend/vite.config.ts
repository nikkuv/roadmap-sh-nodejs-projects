import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
const backendTarget = 'http://localhost:3000'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // API calls from the frontend (e.g. POST /api/shorten)
      '/api': { target: backendTarget, changeOrigin: true },
      // Short links opened in the browser (e.g. GET /r/xyz) when shortUrl uses this dev server’s origin
      '/r': { target: backendTarget, changeOrigin: true },
    },
  },
})
