import { useState, useEffect } from 'react';
import { messaging } from '@/firebaseConfig';
import { getToken } from 'firebase/messaging';
import { useToast } from './useToast';
import { genericErrorToast } from '@/lib/utils';

const useRequestPermission = () => {
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_KEY,
          });

          if (token) {
            setToken(token);
            console.log('TOKEN', token);
          } else {
            toast(genericErrorToast({description: 'No token received'}))
          }
        } else {
          toast(genericErrorToast({description: 'Notification permission denied'}))
        }
      } catch (err) {
        toast(genericErrorToast({description: `Error requesting permission: ${(err as Error)?.message}`}))
      }
    };

    requestPermission();
  }, []);

  return { token };
};

export default useRequestPermission;
