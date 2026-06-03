import { api } from './client';
import { LoginResponse, RegisterInput, User } from '../types/auth';
import { PasswordRecoveryResponse } from '../services/passwordRecoveryService';
import { createDemoUser } from '../services/userIdentityService';

const demoUser: User = {
  id: 'demo-user',
  name: 'Aluno Cinema',
  email: 'aluno@cinema.com',
  phone: '(11) 99999-9999',
};

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
    return data;
  } catch {
    if (email && password.length >= 6) {
      return {
        accessToken: `demo-jwt-${Date.now()}`,
        refreshToken: `demo-refresh-${Date.now()}`,
        user: createDemoUser(email),
      };
    }

    throw new Error('E-mail ou senha invalidos.');
  }
}

export async function registerApi(input: RegisterInput): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/register', {
    name: input.name,
    email: input.email,
    password: input.password,
    phone: input.phone,
  });
  return data;
}

export async function forgotPasswordApi(email: string): Promise<PasswordRecoveryResponse> {
  const { data } = await api.post<PasswordRecoveryResponse>('/auth/forgot-password', { email });
  return data;
}

export async function resetPasswordApi(input: {
  email: string;
  code: string;
  newPassword: string;
}) {
  const { data } = await api.post<{ message: string }>('/auth/reset-password', input);
  return data;
}

export async function meApi(): Promise<User> {
  try {
    const { data } = await api.get<User>('/auth/me');
    return data;
  } catch {
    return demoUser;
  }
}
