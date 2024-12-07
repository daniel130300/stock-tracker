/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FINNHUB_API_KEY: string;
  readonly VITE_FINNHUB_API_BASE_URL: string;
  readonly VITE_FINNHUB_WEBSOCKET_BASE_URL: string;
  readonly VITE_LIVE_STOCK_DEBOUNCE_TIME_IN_MILLISECONDS: number;
  readonly VITE_LIVE_STOCK_MAX_ARRAY_SIZE: number;
  readonly VITE_VAPID_KEY: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGINGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}