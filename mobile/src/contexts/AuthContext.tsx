import React, { createContext, useEffect, useState } from 'react';
import { loginApi, meApi, registerApi } from '../api/auth.api';
import { secureStorage } from '../services/secureStorage';
import { RegisterInput, User } from '../types/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: RegisterInput) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function persistSession(accessToken: string, refreshToken: string | undefined, userData: User) {
    await secureStorage.setItem('accessToken', accessToken);
    await secureStorage.setItem('user', JSON.stringify(userData));

    if (refreshToken) {
      await secureStorage.setItem('refreshToken', refreshToken);
    }

    setUser(userData);
  }

  async function signIn(email: string, password: string) {
    const response = await loginApi(email, password);
    await persistSession(response.accessToken, response.refreshToken, response.user);
  }

  async function signUp(input: RegisterInput) {
    const response = await registerApi(input);
    await persistSession(response.accessToken, response.refreshToken, response.user);
  }

  async function signOut() {
    await secureStorage.deleteItem('accessToken');
    await secureStorage.deleteItem('refreshToken');
    await secureStorage.deleteItem('user');
    setUser(null);
  }

  useEffect(() => {
    async function restoreSession() {
      try {
        const token = await secureStorage.getItem('accessToken');
        const savedUser = await secureStorage.getItem('user');

        if (!token) return;

        if (savedUser) {
          setUser(JSON.parse(savedUser));
          return;
        }

        setUser(await meApi());
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
