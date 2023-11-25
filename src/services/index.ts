import axios from 'axios';

export const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// eslint-disable-line no-console
export const $unAuthHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//eslint-disable-next-line
const authInterceptors = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptors);
