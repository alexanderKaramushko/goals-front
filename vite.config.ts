import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

const aliasRoots = ['app', 'entities', 'features', 'pages', 'shared', 'widgets'] as const;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: aliasRoots.flatMap((alias) => ([
        {
          find: new RegExp(`^${alias}$`),
          replacement: path.resolve(__dirname, `./src/${alias}`),
        },
        {
          find: new RegExp(`^${alias}/(.*)$`),
          replacement: path.resolve(__dirname, `./src/${alias}/$1`),
        },
      ])),
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
    }
  };
});
