/* Vision Wan Services — Minimal Service Worker
   Purpose: satisfy PWA install criteria without aggressive caching.
   Strategy: network-first for everything. Only caches a tiny shell. */

const CACHE_NAME = 'vision-wan-shell-v1';
const SHELL = ['/', '/manifest.json', '/favicon.ico'];

// Install: pre-cache the shell
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL).catch(() => {}))
    );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: network-first (so content stays fresh), fallback to cache if offline
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Only handle GET requests from same origin
    if (request.method !== 'GET') return;
    if (!request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache successful same-origin GET responses lightly
                if (response && response.status === 200 && response.type === 'basic') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
                }
                return response;
            })
            .catch(() =>
                caches.match(request).then((cached) => cached || caches.match('/'))
            )
    );
});