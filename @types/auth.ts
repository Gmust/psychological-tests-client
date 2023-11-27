import { User } from './index';

export interface AuthStore {
  token: string | null;
  status: boolean;
  message: string;
  user: User;
  isAuth: boolean;
  actions: {
    setToken: (token: string | null) => void;
    setUser: (user: User) => void;
    setMessage: (user: string) => void;
    setStatus: (status: boolean) => void;
    init: () => void;
    setIsAuth: (isAuth?: boolean) => void;
    //   clearToken: () => void;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  status: boolean;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
}
