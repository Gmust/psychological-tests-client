import { useAuthStore } from '@context/auth-store.ts';
import { AxiosError } from 'axios';
import { Lock } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AuthService } from '../../services/authService.ts';

export const UserPage = () => {
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);
  const setUser = useAuthStore((state) => state.actions.setUser);

  useEffect(() => {
    console.log(isAuth);

    if (!isAuth) {
      toast.error('Unauthenticated.', { icon: <Lock className='text-red-700' /> });
      navigate('/');
    }

    const getUserInfo = async () => {
      try {
        const res = await AuthService.getUserInfo();
        if (res) {
          console.log(res);
          setUser(res);
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.status === 401) {
            toast.error('Unauthenticated.', { icon: <Lock className='text-red-700' /> });
            navigate('/');
          }
        }
      }
    };
    getUserInfo();
  }, [isAuth]);

  const user = useAuthStore((state) => state.user);

  return <div>{user && <div>{user.email}</div>}</div>;
};
