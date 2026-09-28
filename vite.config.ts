import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base 用相对路径 './'：构建产物里全部资源引用都是相对的，
// 部署在根路径或任何子路径（页面与资源同目录）都能直接跑，不预设托管平台。
export default defineConfig({
  base: './',
  plugins: [vue()],
})
