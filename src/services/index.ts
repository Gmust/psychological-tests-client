import { useAuthStore } from '@context/auth-store.ts';
import axios from 'axios';

export const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export const $unAuthHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//eslint-disable-next-line
const authInterceptors = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptors);

$authHost.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const setIsAuth = useAuthStore.getState().actions.setIsAuth;

    if (error.response.status === 401) {
      try {
        const response = await $unAuthHost.post('/auth/refresh', { token, username });
        localStorage.setItem('token', response.data.access_token);
        return $authHost.request(originalRequest);
        //eslint-disable-next-line
      } catch (e: any) {
        localStorage.removeItem('token');
        setIsAuth(false);
      }
    }
  },
);
