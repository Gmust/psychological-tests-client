import { useAuthStore } from '@context/auth-store.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/Button.tsx';
import { Input } from '@shared/Input.tsx';
import { Message } from '@shared/Message.tsx';
import { loginUserValidator } from '@utils/validation/login-user.ts';
import { AxiosError } from 'axios';
import { Eye, EyeOff, Frown, Laugh } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { AuthService } from '../../../services/authService.ts';

type loginPageInputs = z.infer<typeof loginUserValidator>;

export const LoginPage = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<loginPageInputs>({
    resolver: zodResolver(loginUserValidator),
    mode: 'onBlur',
  });

  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const setIsAuth = useAuthStore((state) => state.actions.setIsAuth);
  const setToken = useAuthStore((state) => state.actions.setToken);
  const setUser = useAuthStore((state) => state.actions.setUser);
  const setMessage = useAuthStore((state) => state.actions.setMessage);
  const message = useAuthStore((state) => state.message);

  const onSubmit = async ({ password, email }: loginPageInputs) => {
    if (!password) {
      setError('password', {
        message: 'Enter Password',
        type: 'required',
      });
    }
    if (!email) {
      setError('email', {
        message: 'Enter email',
        type: 'required',
      });
    }
    setIsLoading(true);

    try {
      const response = await AuthService.login({
        email,
        password,
      });
      toast.success('User successfully logged in!', {
        icon: <Laugh className='text-emerald-700' />,
      });
      setToken(response.access_token);
      setUser(response.user);
      setIsAuth();
      navigate(`/user/${response.user.id}`);
      //eslint-disable-next-line
    } catch (e: any) {
      if (e instanceof AxiosError) {
        setMessage(e.response?.data.message);
      } else {
        toast.error('Something gonna wrong!', {
          icon: <Frown className='text-red-700' />,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='bg-white p-8 space-y-6 rounded-md '>
        <h1 className='font-bold leading-tight tracking-tight text-gray-900 text-4xl'>Sign in to your account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10'>
          <div className='flex flex-col text-3xl space-y-0.5'>
            <label htmlFor='email'>Your email:</label>
            <Input
              type='email'
              formNoValidate
              id='email'
              variant='default'
              inputSize='default'
              {...register('email')}
            />
            {errors.email && <Message message={errors.email.message!} variant='error' heading='Email error' />}
          </div>
          <div className='flex flex-col text-3xl space-y-0.5'>
            <label htmlFor='password'>Your password:</label>
            <div className='flex items-center  relative'>
              <Input
                id='password'
                autoComplete='password'
                variant='default'
                inputSize='default'
                type={show ? 'text' : 'password'}
                className='w-full'
                {...register('password')}
              />
              <div className='absolute right-0 cursor-pointer mr-2'>
                {show ? (
                  <EyeOff size='35' onClick={() => setShow(false)} />
                ) : (
                  <Eye size='35' onClick={() => setShow(true)} />
                )}
              </div>
            </div>
            {errors.password && <Message message={errors.password.message!} variant='error' heading='Password error' />}
          </div>
          <div className='flex justify-between items-center space-x-5'>
            <div className='space-x-2'>
              <input
                id='rememberMe'
                type='checkbox'
                className='w-5 h-5 text-purple-600 bg-gray-100 accent-amber-500 border-gray-300 rounded focus:ring-amber-400 focus:ring-2 '
              />
              <label htmlFor='rememberMe' className='text-2xl'>
                Remember me
              </label>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button type='submit' variant='default' size='lg' isLoading={isLoading}>
              Login
            </Button>
            <div className='text-2xl'>
              Don`t have an account?{' '}
              <Link to='/register' className='font-medium text-amber-500  hover:underline'>
                {' '}
                Create it!
              </Link>
            </div>
          </div>
          <div>{message && <Message message={message} variant='error' />}</div>
        </form>
      </div>
    </div>
  );
};
