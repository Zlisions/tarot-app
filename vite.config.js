import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // 强制编译为更通用的 ES2015 语法，避免使用过新的 import.meta
    target: 'es2015', 
    // 确保 CSS 也进行兼容性处理
    cssTarget: 'chrome61',
    // 禁用 polyfillDynamicImport（有时它会导致旧版 Safari 报错）
    polyfillDynamicImport: true,
  },
  // 确保 base 路径正确，Vercel 通常使用根路径
  base: '/', 
})