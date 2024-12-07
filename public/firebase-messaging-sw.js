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
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'websocket-message') {
    const payload = event.data.payload;
    // Crear una notificación a partir del mensaje del WebSocket
    const notificationTitle = payload.title || 'Mensaje recibido';
    const notificationOptions = {
      body: payload.body || 'Tienes un nuevo mensaje',
      icon: payload.icon || '/default-icon.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
})