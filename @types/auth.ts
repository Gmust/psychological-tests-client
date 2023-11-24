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
    //   init: () => void;
    //   clearToken: () => void;
  };
}
