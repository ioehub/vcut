import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'playhead',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 외부 라이브러리로 처리할 패키지들
      external: ['react', 'react-dom'],
      output: {
        // 전역 변수로 외부 라이브러리 제공
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

