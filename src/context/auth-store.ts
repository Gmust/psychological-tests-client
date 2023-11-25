import { AuthStore } from 'types/auth.ts';
import { User } from 'types/index';
import { create } from 'zustand';

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: null,
  status: false,
  message: '',
  user: {} as User,
  isAuth: true,
  actions: {
    setUser: (user: User) =>
      set({
        user,
      }),
    setToken: (token: string | null) =>
      set({
        token,
      }),
    setMessage: (message: string) =>
      set({
        message,
      }),
    setStatus: (status: boolean) =>
      set({
        status,
      }),
    setIsAuth: () =>
      set((state) => ({
        isAuth: !!state.token,
      })),
    init: () => {
      const { setToken, setIsAuth } = get().actions;
      setToken(localStorage.getItem('token'));
      setIsAuth();
    },
  },
}));
