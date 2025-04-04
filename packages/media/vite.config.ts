import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // FFmpeg WebAssembly 작업을 위한 CORS 헤더 설정
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  build: {
    lib: {
      // 라이브러리 진입점 설정
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VCutMedia',
      fileName: 'vcut-media'
    },
    rollupOptions: {
      // React는 외부 의존성으로 처리
      external: ['react', 'react-dom'],
      output: {
        // 외부 라이브러리에 대한 전역 변수 설정
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
