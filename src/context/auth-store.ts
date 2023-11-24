import { AuthStore } from 'types/auth.ts';
import { User } from 'types/index';
import { create } from 'zustand';

// const authStore = createStore<AuthStore>()(
//   devtools(
//     (set, get) => ({
//       token: null,
//       message: '',
//       status: false,
//       user: {} as User,
//       actions: {
//         setUser: (user: User) =>
//           set({
//             user,
//           }),
//         setToken: (token: string | null) =>
//           set({
//             token,
//           }),
//         setMessage: (message: string) =>
//           set({
//             message,
//           }),
//         setStatus: (status: boolean) =>
//           set({
//             status,
//           }),
//         clearToken: () =>
//           set({
//             token: null,
//           }),
//         init: () => {
//           const { setToken } = get().actions;
//           setToken(localStorage.getItem('token'));
//         },
//       },
//     }),
//     {
//       name: 'auth-store',
//       enabled: !import.meta.env.PROD,
//     },
//   ),
// );

export const useAuthStore = create<AuthStore>((set) => ({
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
    setIsAuth: (isAuth: boolean) =>
      set({
        isAuth,
      }),
  },
}));
