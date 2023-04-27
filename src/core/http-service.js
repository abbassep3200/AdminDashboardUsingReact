import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const httpService = axios.create({
  baseURL: BASE_URL,
});

export const httpInterceptedService = axios.create({
  baseURL: BASE_URL
});

httpInterceptedService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
)

httpInterceptedService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
)
