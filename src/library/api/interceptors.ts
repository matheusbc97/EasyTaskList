import api from './index';

export const tokenIterceptor = (token: string) =>
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
