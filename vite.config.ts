import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa'
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  base: './',
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    VitePWA({
      mode: 'development',
      registerType: 'autoUpdate',
      base: '/',
      manifest: {
        name: 'Ruhe',
        short_name: 'Ruhe'
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
