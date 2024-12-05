/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FINNHUB_API_KEY: string;
  readonly VITE_FINNHUB_API_BASE_URL: string;
  readonly VITE_FINNHUB_WEBSOCKET_BASE_URL: string;
  readonly VITE_LIVE_STOCK_DEBOUNCE_TIME_IN_MILLISECONDS: number;
  readonly VITE_LIVE_STOCK_MAX_ARRAY_SIZE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}