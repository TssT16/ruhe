/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-ab7aa862'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/index-a36337d1.css",
    "revision": null
  }, {
    "url": "assets/index-bf6516b0.js",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "674dd0739e8b981b49dd5426710e7e6f"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "audio/4-6_1min.mp3",
    "revision": "ff78c262a573441e0683420090a4ce80"
  }, {
    "url": "audio/4-6_5min.mp3",
    "revision": "be3db73ee0e3d2d54f0dc85ded2f3460"
  }, {
    "url": "audio/4-6_10min.mp3",
    "revision": "723835c8f166523d53f8722e380405eb"
  }, {
    "url": "audio/water.mp3",
    "revision": "afac31a45c1269b7adeab3bd59a6568d"
  }, {
    "url": "icons/icon-48x48.png",
    "revision": "4b9cf11faa6ffa2e6961714de767cde3"
  }, {
    "url": "icons/favicon.ico",
    "revision": "715e85a3c65fd229a318ae9e89ae209f"
  }, {
    "url": "icons/icon-128x128.png",
    "revision": "dbd017369ed1395c9c056ed92811fe1a"
  }, {
    "url": "icons/icon-144x144.png",
    "revision": "b110df2add395479494e38e7cf7a7319"
  }, {
    "url": "icons/icon-152x152.png",
    "revision": "06bd90950a303457f1a35c03a2ef9e68"
  }, {
    "url": "icons/icon-192x192.png",
    "revision": "5f7c886101482b44248cb545178c6bd2"
  }, {
    "url": "icons/icon-384x384.png",
    "revision": "79b1a8f3872ce121b48040c602188b6d"
  }, {
    "url": "icons/icon-512x512.png",
    "revision": "50b52da5e7f02810761a32bcc5099d08"
  }, {
    "url": "icons/icon-72x72.png",
    "revision": "44aa4bc784f84467ac06e222cc2da581"
  }, {
    "url": "icons/icon-96x96.png",
    "revision": "88ce0a601df3b26f8bb10f22078f143c"
  }, {
    "url": "manifest.webmanifest",
    "revision": "442c97dbdff8bd5eb6b513ac0da5ab6a"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
