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
        'audio/exhale.mp3',
        'icons/*'],
      manifest: {
        name: 'Ruhe',
        short_name: 'Ruhe',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
           src: "icons/icon-48x48.png",
           sizes: "48x48",
           type: "image/png",
           purpose: "maskable any"
           },
           {
           src: "icons/icon-72x72.png",
           sizes: "72x72",
           type: "image/png",
           purpose: "maskable any"
           },
           {
           src: "icons/icon-96x96.png",
           sizes: "96x96",
           type: "image/png",
           purpose: "maskable any"
           },
           {
           src: "icons/icon-128x128.png",
           sizes: "128x128",
           type: "image/png",
           purpose: "maskable any"
           },
           {
           src: "icons/icon-144x144.png",
           sizes: "144x144",
           type: "image/png",
           purpose: "maskable any"
           },
           {
           src: "icons/icon-152x152.png",
           sizes: "152x152",
           type: "image/png",
           purpose: "maskable any"
           },
           {
           src: "icons/icon-192x192.png",
           sizes: "192x192",
           type: "image/png",
           purpose: "maskable any"
           },
           {
           src: "icons/icon-384x384.png",
           sizes: "384x384",
           type: "image/png",
           purpose: "maskable any"
           },
           {
           src: "icons/icon-512x512.png",
           sizes: "512x512",
           type: "image/png",
           purpose: "maskable any"
           }
       ]
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
