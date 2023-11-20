import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '../../../shared/Input.tsx';
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
      <div className='bg-white p-8 space-y-6 rounded-md'>
        <h1 className='font-bold leading-tight tracking-tight text-gray-900 text-4xl'>
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10'>
          <div className='flex flex-col text-3xl space-y-0.5'>
            <label htmlFor='email'>Your email:</label>
            <Input type='email' formNoValidate id='email' variant='default' inputSize='large' />
          </div>
          <div className='flex flex-col text-3xl space-y-0.5'>
            <label htmlFor='password'>Your password:</label>
            <div className='flex items-center  relative'>
              <Input id='password' autoComplete='password' variant='default' inputSize='large'
                     type={show ? 'text' : 'password'} className='w-full'
              />
              <div className='absolute right-0 cursor-pointer mr-2'>
                {
                  show ? <EyeOff size='35' onClick={() => setShow(false)} /> :
                    <Eye size='35' onClick={() => setShow(true)} />
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

