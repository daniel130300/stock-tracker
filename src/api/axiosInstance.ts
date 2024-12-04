import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_FINNHUB_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to append the token to each request
axiosInstance.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
  const token = apiKey ? `&token=${apiKey}` : '';
  if (config.url) {
    config.url = `${config.url}${config.url.includes('?') ? '' : '?'}${token}`;
  }
  return config;
});

export default axiosInstance;
