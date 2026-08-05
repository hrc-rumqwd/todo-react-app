import type { AxiosRequestConfig } from 'axios';
import type { ResultWithData } from './types/result';
import { api } from './api';

export const httpClient = {
  get: async function <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.get<ResultWithData<T>>(url, config);
    return unwrapEnvelop(response.data);
  },

  post: async function <TRequest, TResponse>(
    url: string,
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response = await api.post<ResultWithData<TResponse>>(
      url,
      data,
      config
    );
    return unwrapEnvelop(response.data);
  },

  patch: async function <TRequest, TResponse>(
    url: string,
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response = await api.patch<ResultWithData<TResponse>>(
      url,
      data,
      config
    );
    return unwrapEnvelop(response.data);
  },

  put: async function <TRequest, TResponse>(
    url: string,
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response = await api.put<ResultWithData<TResponse>>(
      url,
      data,
      config
    );
    return unwrapEnvelop(response.data);
  },

  delete: async function <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.delete<ResultWithData<T>>(url, config);
    return unwrapEnvelop(response.data);
  },
};

function unwrapEnvelop<T>(response: ResultWithData<T>): T {
  if (!response.isSuccess) {
    // Tạo một Custom Error chứa thông điệp hoặc danh sách lỗi từ .NET
    const errorMessage = response.message || 'ActionFailed';
    const error = new Error(errorMessage);
    (error as any).errors = response.errors;

    throw error; // Ném lỗi để Promise chuyển sang trạng thái Rejected
  }

  return response.data; // Trả về T thuần túy
}
