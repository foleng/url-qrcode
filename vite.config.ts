import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import tranferManifest from './plugins/rollup-plugin-transfer-manifest'

export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`
        }
      ]
    }),
    tranferManifest({
      contentScript: {
        entry: path.resolve(__dirname, 'content.html')
      }
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    }
  },
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
