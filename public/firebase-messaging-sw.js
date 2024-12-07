importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDfiXrYWGyYyML77YdsSc_Zc9NTRkaWNkE",
  authDomain: "push-notif-bc446.firebaseapp.com",
  projectId: "push-notif-bc446",
  storageBucket: "push-notif-bc446.firebasestorage.app",
  messagingSenderId: "1062950402721",
  appId: "1:1062950402721:web:3d7801f38448913495cee0"
}

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'websocket-message') {
    const payload = event.data.payload;
    const notificationTitle = 'Price Under Threshold';
    const notificationOptions = {
      body: payload.latestPrice,
    };
    self.registration.showNotification(notificationTitle, notificationOptions)
  }
})