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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const moduleId = id.replace(/\\/g, '/');
            if (moduleId.includes('/src/i18n/locales/') || moduleId.includes('/src/content/translations/') || moduleId.endsWith('/src/content/inline-translations.json')) {
              return 'translations';
            }
            if (!moduleId.includes('/node_modules/')) return undefined;
            if (moduleId.includes('/motion/')) return 'motion';
            if (moduleId.includes('/swiper/')) return 'swiper';
            if (moduleId.includes('/lucide-react/')) return 'icons';
            if (moduleId.includes('/i18next/') || moduleId.includes('/react-i18next/')) return 'i18n';
            if (moduleId.includes('/react/') || moduleId.includes('/react-dom/') || moduleId.includes('/react-router')) return 'react';
            return undefined;
          }
        }
      }
    },
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
