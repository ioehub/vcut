import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VCutEffects',
      fileName: 'vcut-effects'
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
