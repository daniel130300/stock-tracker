
import { messaging } from './firebaseConfig';
import { getToken } from 'firebase/messaging';

export const requestPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });

    if (token) {
      console.log('Token:', token);
    } else {
      console.warn('No token received. Ensure you have VAPID key configured.');
    }
  } else {
    console.warn('Notification permission denied.');
  }
};
