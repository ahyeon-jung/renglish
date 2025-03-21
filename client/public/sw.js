if (!self.define) {
  let e,
    s = {};
  const t = (t, a) => (
    (t = new URL(t + '.js', a).href),
    s[t] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = t), (e.onload = s), document.head.appendChild(e);
        } else (e = t), importScripts(t), s();
      }).then(() => {
        let e = s[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let c = {};
    const r = (e) => t(e, i),
      o = { module: { uri: i }, exports: c, require: r };
    s[i] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (n(...e), c));
  };
}
define(['./workbox-e9849328'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'b808d4d3cd3f52afb41d46e6a7310a5d' },
        { url: '/_next/static/chunks/317.ced299489435e71c.js', revision: 'ced299489435e71c' },
        { url: '/_next/static/chunks/393-cb7962b886106e98.js', revision: 'tq8FCMTd7jbBbwF6COpmA' },
        { url: '/_next/static/chunks/408-6646681034316a8b.js', revision: 'tq8FCMTd7jbBbwF6COpmA' },
        { url: '/_next/static/chunks/760-32646e9ff15dede9.js', revision: 'tq8FCMTd7jbBbwF6COpmA' },
        { url: '/_next/static/chunks/96.cf6383125d0459ce.js', revision: 'cf6383125d0459ce' },
        {
          url: '/_next/static/chunks/app/_not-found/page-7c23a77e79d6ae95.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/admin/inquiries/page-29d4a1f699fc7a67.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/admin/notices/add/page-eeaf149892e1b985.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/admin/page-3eb9eba7f3d983af.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/admin/scripts/add/page-fea3feaf215ce321.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/admin/users/page-7c77c851e7932859.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-5344b07c4eeefd56.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/auth/logout/page-f473665fed9041f0.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/auth/register/page-f5d28574f2c1abbe.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/introduce/page-21741f80adbe8163.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/layout-ac5b9100d545115d.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/movies/%5Bmovie%5D/%5Bscene%5D/practice/fill/page-4dd668dec332fab4.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/movies/%5Bmovie%5D/%5Bscene%5D/practice/speaking/page-57d2aadaf106400c.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/movies/%5Bmovie%5D/%5Bscene%5D/practice/writing/page-4b079aff60b16c18.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/movies/%5Bmovie%5D/%5Bscene%5D/script/en-ko/page-770fdf5c4e02d853.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/movies/%5Bmovie%5D/%5Bscene%5D/script/en/page-cf67560e12c1d55e.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/movies/%5Bmovie%5D/%5Bscene%5D/script/ko/page-176ee2a8abe9d98b.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/movies/%5Bmovie%5D/page-d9712eaa72edf58e.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/movies/page-70382ba9a6e8d6e1.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/notices/install/page-4accde27a5c4b96d.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/page-d640cc35cbf05b20.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/app/profile/page-11537a1c2251797d.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/f7980e85-223f8a2a32e6dfa2.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/framework-f3f06d660342362f.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        { url: '/_next/static/chunks/main-76edb1a7001cf623.js', revision: 'tq8FCMTd7jbBbwF6COpmA' },
        {
          url: '/_next/static/chunks/main-app-b8abb38cdac796c7.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/pages/_app-0ef8e65000ffd91d.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/pages/_error-26ed8dc8f75d9049.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-3feff5c5289a5efd.js',
          revision: 'tq8FCMTd7jbBbwF6COpmA',
        },
        { url: '/_next/static/css/07e2981a8bd8953a.css', revision: '07e2981a8bd8953a' },
        {
          url: '/_next/static/media/background.bc4a3113.webp',
          revision: '81da1ed02073e1b642f96902e3507098',
        },
        {
          url: '/_next/static/media/install1.4804b0ac.webp',
          revision: '239b329f11052465457070d8356a5788',
        },
        {
          url: '/_next/static/media/install2.58a28557.webp',
          revision: '84e39459268266828e1ce4405a32ec8c',
        },
        {
          url: '/_next/static/media/install3.a3e0021b.webp',
          revision: 'faf3a4d0975c445a3622a49df92c685d',
        },
        {
          url: '/_next/static/media/install4.d4b89466.webp',
          revision: 'b4ce83a24b014c5a96799d50c59bb97f',
        },
        {
          url: '/_next/static/media/logo.e60dcc98.png',
          revision: '51e19122d69fa9ea1b8022ca6ba2614a',
        },
        {
          url: '/_next/static/tq8FCMTd7jbBbwF6COpmA/_buildManifest.js',
          revision: '290e5bfc0acebc2dde6e0a019a33d5d3',
        },
        {
          url: '/_next/static/tq8FCMTd7jbBbwF6COpmA/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/icon.png', revision: '0e5062a913b405d645910f02ea64796d' },
        { url: '/manifest.json', revision: '400a1fccf5df010dc23699adc52bcfc9' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: t, state: a }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
});
