import { useAuthStore } from '@context/auth-store.ts';
import { AxiosError } from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from 'types/auth.ts';
import { User } from 'types/index';

import { $authHost, $unAuthHost } from './index.ts';

export const AuthService = {
  async login({ password, email }: LoginRequest) {
    const { data } = await $unAuthHost.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    if (data.status === false) {
      throw new Error('Something went wrong');
    }
    return data;
  },
  async register({ password, email, name }: RegisterRequest) {
    const { data } = await $unAuthHost.post<RegisterResponse>('/auth/register', {
      name,
      email,
      password,
    });
    if (data.status === false) {
      throw new Error('Something went wrong');
    }
    return data;
  },
  async getUserInfo() {
    try {
      const { data } = await $authHost.post<User>('/auth/me');
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          useAuthStore.getState().actions.setIsAuth(false);
        }
      }
    }
  },
};
