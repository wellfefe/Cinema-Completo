import { api } from './client';
import { LoginResponse, RegisterInput, User } from '../types/auth';

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
        user: { ...demoUser, email },
      };
    }

    throw new Error('E-mail ou senha invalidos.');
  }
}

export async function registerApi(input: RegisterInput): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>('/auth/register', {
      name: input.name,
      email: input.email,
      password: input.password,
      phone: input.phone,
    });
    return data;
  } catch {
    return {
      accessToken: `demo-jwt-${Date.now()}`,
      refreshToken: `demo-refresh-${Date.now()}`,
      user: {
        id: `user-${Date.now()}`,
        name: input.name,
        email: input.email,
        phone: input.phone,
      },
    };
  }
}

export async function forgotPasswordApi(email: string) {
  try {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  } catch {
    return {
      message: `Se ${email} estiver cadastrado, enviaremos as instrucoes de recuperacao.`,
    };
  }
}

export async function meApi(): Promise<User> {
  try {
    const { data } = await api.get<User>('/auth/me');
    return data;
  } catch {
    return demoUser;
  }
}
