import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const adminIndexRedirect = () => ({
  name: 'afrus-admin-index-redirect',
  configureServer(server: { middlewares: { use: (handler: (request: { url?: string }, response: { statusCode: number; setHeader: (name: string, value: string) => void; end: () => void }, next: () => void) => void) => void } }) {
    server.middlewares.use((request, response, next) => {
      if (request.url === '/admin' || request.url === '/admin/') {
        response.statusCode = 302;
        response.setHeader('Location', '/admin/index.html');
        response.end();
        return;
      }
      next();
    });
  }
});

export default defineConfig(() => {
  return {
    plugins: [adminIndexRedirect(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {}
    }
  };
});
