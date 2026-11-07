const SW_VERSION = 'aspiquest-sw-20261018-debugfix1';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('push', event => {
  let payload = { title: 'Aspiquest', body: 'Ada pembaruan baru.', url: 'admin.html' };
  try { if (event.data) payload = { ...payload, ...event.data.json() }; } catch (_) {}
  event.waitUntil(self.registration.showNotification(payload.title || 'Aspiquest', {
    body: payload.body || 'Ada permintaan redeem baru.',
    icon: 'assets/serviam-logo.png',
    badge: 'assets/serviam-logo.png',
    data: { url: payload.url || 'admin.html' },
    tag: payload.tag || 'aspiquest-update',
    renotify: true
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || 'admin.html', self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const client of list) if ('focus' in client) { client.navigate(target); return client.focus(); }
    return self.clients.openWindow(target);
  }));
});

/* ASPIQUEST_CONTROL_ROOM_PWA: cache shell/static files only; never cache Supabase/API requests. */
const PWA_CACHE = 'aspiquest-control-room-shell-v1';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(PWA_CACHE).then(cache => cache.addAll([
    './admin.html',
    './app.js',
    './control-room.webmanifest',
    './assets/aspiquest-control-192.png',
    './assets/aspiquest-control-512.png',
    './assets/serviam-logo.png'
  ])).catch(()=>{}));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('aspiquest-control-room-shell-') && k !== PWA_CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;
  if(url.pathname.includes('/rest/v1/') || url.pathname.includes('/auth/v1/') || url.pathname.includes('/functions/v1/') || url.pathname.includes('/realtime/')) return;
  const isShell = /\/(admin\.html|app\.js|control-room\.webmanifest)$/.test(url.pathname) || /\/assets\/(aspiquest-control-(192|512)\.png|serviam-logo\.png)$/.test(url.pathname);
  if(!isShell) return;
  event.respondWith(fetch(req).then(res=>{
    if(res && res.ok){const copy=res.clone();caches.open(PWA_CACHE).then(cache=>cache.put(req,copy));}
    return res;
  }).catch(()=>caches.match(req).then(hit=>hit || Response.error())));
});
