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
