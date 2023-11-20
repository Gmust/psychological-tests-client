import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginUserValidator } from '../../../utils/validation/login-user.ts';

type loginPageInputs = z.infer<typeof loginUserValidator>

export const LoginPage = () => {

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<loginPageInputs>({
    resolver: zodResolver(loginUserValidator)
  });

  const [show, setShow] = useState<boolean>(false);

  const onSubmit = async () => {
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='bg-white p-6 space-y-6'>
        <h1 className='font-bold leading-tight tracking-tight text-gray-900 text-4xl'>
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10'>
          <div className='flex flex-col text-2xl space-y-0.5'>
            <label htmlFor='email'>Your email</label>
            <input id='email' placeholder='email@example.com'  className='' />
          </div>
          <div className='flex flex-col text-2xl space-y-0.5'>
            <label htmlFor='password'>Your password</label>
            <input id='password' type={show ? 'text' : 'password'} placeholder='•••••••••••••' className='' />
          </div>
        </form>
      </div>
    </div>
  );
};

