import axios from 'axios';
import { useMemo } from 'react';

interface useApiClientProps {
  baseUrl: string;
  fetchToken: () => string | null | undefined;
  requestHook?: () => void;
  unAuthorizedHook?: () => void;
}

export const useApiClient = ({
  baseUrl,
  fetchToken,
  requestHook,
  unAuthorizedHook,
}: useApiClientProps) => {
  const axiosClient = useMemo(() => {
    const client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    client.interceptors.request.use((config) => {
      const token = fetchToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    if (requestHook) {
      client.interceptors.request.use((config) => {
        requestHook();
        return config;
      });
    }

    client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          if (unAuthorizedHook) unAuthorizedHook();
        }
        return Promise.reject(error);
      }
    );

    return client;
  }, [baseUrl]);

  return axiosClient;
};
