import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/firebase-messaging-sw.js';
    navigator.serviceWorker
      .register(swUrl)
      .catch((error) => {
        console.log('Error registering service worker:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
