import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: { clientPort: 3000 },
    allowedHosts: true, // ✅ This is critical for allowing any subdomain like clinic1.lvh.me

    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      });
    },
  },
});
