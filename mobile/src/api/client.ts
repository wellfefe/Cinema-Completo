import axios from 'axios';
import { Platform } from 'react-native';
import { secureStorage } from '../services/secureStorage';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (Platform.OS === 'web' ? 'http://localhost:3000' : 'http://192.168.1.181:3000');

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async config => {
  const token = await secureStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
