// src/sw.js
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Notifica';
  const options = {
    body: data.body || '',
    icon: '../assets/image/cripto.png',
    badge: '/assets/icons/cripto.png',
    data: data.data || {},        // per deep-link/click handling
    actions: data.actions || []   // [{action:'open', title:'Apri'}]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(list => {
      // se una tab è già aperta, la porta in primo piano
      for (const client of list) {
        if ('focus' in client) return client.focus();
      }
      // altrimenti apre nuova tab
      return clients.openWindow(url);
    }));
});
