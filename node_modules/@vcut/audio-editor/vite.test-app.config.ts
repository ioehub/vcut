import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'test-app-dist',
  },
  // 테스트 앱을 위한 별도 진입점 설정
  root: path.resolve(__dirname, './'),
  publicDir: 'public',
});
