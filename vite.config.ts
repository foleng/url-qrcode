import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'
import tranferManifest from './plugins/rollup-plugin-transfer-manifest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: './manifest.json', dest: 'dist' }
      ],
      hook: "writeBundle"
    }),
    tranferManifest({
      contentScript: {
        entry: path.resolve(__dirname, 'popup.html')
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        background: path.resolve(__dirname, 'background.html'),
        popup: path.resolve(__dirname, 'popup.html'),
        content: path.resolve(__dirname, 'content.html')
      },
    },
  }
})
