import { UserIcon } from '@components/header/UserIcon.tsx';
import { useAuthStore } from '@context/auth-store.ts';
import { AxiosError } from 'axios';
import { BookOpenCheck, Lock } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { AuthService } from '../../services/authService.ts';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const setUser = useAuthStore((state) => state.actions.setUser);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <header>
      <nav className='bg-gradient-to-r from-purple-500 to-blue-400 text-white  px-4 lg:px-6 py-2.5 '>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <div className='flex items-center'>
            <img src='https://flowbite.com/docs/images/logo.svg' className='mr-3 h-6 sm:h-9' alt='Flowbite Logo' />
            <span className='self-center text-xl font-semibold whitespace-nowrap '>Testflow</span>
          </div>
          <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'>
            <Link to='/tests' className='flex items-center text-3xl font-semibold space-x-2  hover:underline'>
              <BookOpenCheck />
              <p>Tests</p>
            </Link>
          </div>
          <div className='relative lg:order-2'>
            <UserIcon userId={user.id} email={user.email} />
          </div>
        </div>
      </nav>
    </header>
  );
};
