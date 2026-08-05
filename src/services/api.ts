import axios from 'axios';
import {
  AccessTokenKey,
  IdentitySessionQueryKey,
} from '../features/auth/types/identity-query-keys';
import { queryClient } from './query-client';
import { resetIdentitySpace } from '../features/auth/api/auth-api';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://localhost.com/7076',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(AccessTokenKey);
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      resetIdentitySpace();
      queryClient.invalidateQueries({ queryKey: [IdentitySessionQueryKey] });
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error(error.message);
    }
    return Promise.reject(error);
  }
);
