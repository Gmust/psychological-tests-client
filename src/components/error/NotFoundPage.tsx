import { Button } from '@shared/Button.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/user/1');
    }
  }, []);

  return (
    <div className='h-screen flex justify-center items-center flex-col space-y-6 text-gray-100'>
      <h1 className='text-8xl'>404</h1>
      <h2 className='text-6xl'>Page not found</h2>
      <Button variant='default' className='w-40 h-16' onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
};
