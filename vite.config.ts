import path from 'node:path';
import { defineConfig } from 'vite';
export default defineConfig({
  server: {
    cors: true, // 必须开启，基座才能 fetch 资源
    port: 4202, // 假设 Vue 5173, Angular 4200
  },
  base: 'http://localhost:4202/', // 解决图片等静态资源 404
  build: {
    manifest: true, // 生产环境必须开启，用于基座解析文件名
  },
  resolve: {
    alias: [
      { find: '@core', replacement: path.resolve(__dirname, 'src/app/core') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/app/pages') },
    ],
  },
});
