import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from 'types/auth.ts';

import { $unAuthHost } from './index.ts';

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
};
