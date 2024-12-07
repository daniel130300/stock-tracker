importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

self.firebase.initializeApp({
  apiKey: "%%API_KEY%%",
  authDomain: "%%AUTH_DOMAIN%%",
  projectId: "%%PROJECT_ID%%",
  messagingSenderId: "%%MESSAGING_SENDER_ID%%",
  appId: "%%APP_ID%%",
});

const messaging = self.firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  if (payload?.latestPrice >= payload?.priceAlert) return;
  const notificationTitle = 'Price Alert';
  const notificationOptions = {
    body: 'Price Alert',
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'websocket-message') {
    const payload = event.data.payload;
    if (payload?.latestPrice >= payload?.priceAlert) return;
    const notificationTitle = 'Price Alert';
    const notificationOptions = {
      body: 'Price Alert',
    };
    console.log('PAYLOAD', payload);
    self.registration.showNotification(notificationTitle, notificationOptions)
  }
})