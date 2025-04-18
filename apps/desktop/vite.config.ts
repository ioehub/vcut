import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@vcut/editor-page': path.resolve(__dirname, '../../packages/editor-page/dist/index.es.js'),
      '@vcut/mcp-service': path.resolve(__dirname, '../../packages/mcp-service/dist/index.es.js'),
      '@vcut/ffmpeg-service': path.resolve(__dirname, '../../packages/ffmpeg-service/dist/index.es.js'),
      '@vcut/preview-player': path.resolve(__dirname, '../../packages/preview-player/dist/index.es.js'),
      '@vcut/playhead': path.resolve(__dirname, '../../packages/playhead/dist/index.es.js'),
      '@vcut/audio-editor': path.resolve(__dirname, '../../packages/audio-editor/dist/index.es.js'),
      '@vcut/timeline': path.resolve(__dirname, '../../packages/timeline/dist/index.es.js'),
      '@vcut/effects': path.resolve(__dirname, '../../packages/effects/dist/index.es.js'),
      '@vcut/media': path.resolve(__dirname, '../../packages/media/dist/index.es.js'),
      '@vcut/rendering': path.resolve(__dirname, '../../packages/rendering/dist/index.es.js')
    },
  },
  server: {
    port: 5176,
    open: true,
    hmr: {
      overlay: true // HMR 오류 오버레이 활성화
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [
      '@vcut/editor-page',
      '@vcut/mcp-service',
      '@vcut/ffmpeg-service',
      '@vcut/preview-player',
      '@vcut/playhead',
      '@vcut/audio-editor',
      '@vcut/timeline',
      '@vcut/effects',
      '@vcut/media',
      '@vcut/rendering'
    ]
  }
});
