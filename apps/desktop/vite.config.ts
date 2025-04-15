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
      '@vcut/mcp-service': path.resolve(__dirname, '../../packages/mcp-service/dist/index.js'),
      '@vcut/ffmpeg-service': path.resolve(__dirname, '../../packages/ffmpeg-service/dist/index.js'),
      '@vcut/preview-player': path.resolve(__dirname, '../../packages/preview-player/dist/index.js'),
      '@vcut/playhead': path.resolve(__dirname, '../../packages/playhead/dist/index.js'),
      '@vcut/audio-editor': path.resolve(__dirname, '../../packages/audio-editor/dist/index.js')
    },
  },
  server: {
    port: 5176,
    open: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [
      '@vcut/editor-page',
      '@vcut/mcp-service',
      '@vcut/ffmpeg-service',
      '@vcut/preview-player',
      '@vcut/playhead',
      '@vcut/audio-editor'
    ]
  }
});
