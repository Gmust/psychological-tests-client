import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/Button.tsx';
import { Input } from '@shared/Input.tsx';
import { Message } from '@shared/Message.tsx';
import { registerUserValidator } from '@utils/validation/register-user.ts';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

type registerUserInputs = z.infer<typeof registerUserValidator>;

export const RegistrationPage = () => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<registerUserInputs>({
    resolver: zodResolver(registerUserValidator),
    mode: 'onBlur',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const onSubmit = ({ username, email, password, confirmPassword }: registerUserInputs) => {
    setIsLoading(true);
    try {
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='bg-white p-8 space-y-6 rounded-md'>
        <h1 className='text-4xl font-bold text-gray-900 leading-tight tracking-tight'>
          Create a New Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10' role='form'>
          <div className='flex flex-col text-3xl space-y-0.5'>
            <label htmlFor='email'>Email</label>
            <Input
              id='email'
              type='email'
              formNoValidate
              inputSize='default'
              {...register('email', { required: true })}
            />
            {errors.email && <Message message={errors.email.message!} variant='error' />}
          </div>
          <div className='flex flex-col text-3xl space-y-0.5'>
            <label htmlFor='username'>Username</label>
            <Input
              id='username'
              autoComplete='username'
              inputSize='default'
              {...register('username', { required: true })}
            />
            {errors.username && <Message message={errors.username.message!} variant='error' />}
          </div>
          <div className='flex flex-col text-3xl space-y-0.5'>
            <label htmlFor='password'>Password</label>
            <div className='flex relative items-center'>
              <Input
                id='password'
                inputSize='default'
                type={show ? 'text' : 'password'}
                className='w-full'
                autoComplete='new-password'
                {...register('password', {
                  required: true,
                })}
              />
              <div className='absolute right-0 cursor-pointer mr-2'>
                {show ? (
                  <EyeOff size='35' onClick={() => setShow(false)} />
                ) : (
                  <Eye size='35' onClick={() => setShow(true)} />
                )}
              </div>
            </div>
            {errors.password && <Message message={errors.password.message!} variant='error' />}
          </div>
          <div className='flex flex-col text-3xl space-y-0.5'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <Input
              id='confirmPassword'
              inputSize='default'
              type='password'
              {...register('confirmPassword', { required: true })}
            />
            {errors.confirmPassword && (
              <Message message={errors.confirmPassword.message!} variant='error' />
            )}
          </div>
          <div className='flex space-x-10 justify-between items-center'>
            <h3 className='text-2xl'>
              Already have an account?{' '}
              <Link to='/login' className='font-medium text-amber-500 hover:underline'>
                Login
              </Link>
            </h3>
            <Button variant='default' size='lg' isLoading={isLoading}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

//^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$
