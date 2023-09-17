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
      includeAssets: [
        'audio/inhale.mp3',
        'audio/exhale.mp3'],
      manifest: {
        name: 'Ruhe',
        short_name: 'Ruhe',
        theme_color: '#ffffff',
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
