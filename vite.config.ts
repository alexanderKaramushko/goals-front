import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

const aliasRoots = ['app', 'entities', 'features', 'pages', 'shared', 'widgets'] as const;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
        },
      }),
      VitePWA({
        devOptions: {
          enabled: true,
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        injectRegister: 'auto',
        manifest: false,
        srcDir: 'src',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        },
      }),
    ],
    resolve: {
      alias: aliasRoots.flatMap((alias) => [
        {
          find: new RegExp(`^${alias}$`),
          replacement: path.resolve(__dirname, `./src/${alias}`),
        },
        {
          find: new RegExp(`^${alias}/(.*)$`),
          replacement: path.resolve(__dirname, `./src/${alias}/$1`),
        },
      ]),
    },
    server: {
      proxy: {
        '/api': {
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
          secure: false,
          target: env.VITE_GOALS_SERVICE_API,
        },
        '/auth': {
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/auth/, ''),
          secure: false,
          target: env.VITE_GOALS_AUTH_API,
        },
      },
    },
  };
});
