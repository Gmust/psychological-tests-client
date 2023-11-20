import { useNavigate } from 'react-router-dom';

import { Button } from '../../shared/Button.tsx';

export const NotFoundPage = () => {

  const navigate = useNavigate();

  return (
    <div className='h-screen flex justify-center items-center flex-col space-y-6 text-gray-100'>
      <h1 className='text-8xl'>404</h1>
      <h2 className='text-6xl'>Page not found</h2>
      <Button variant='default' className='w-40 h-16' onClick={() => navigate(-1)}>Go back</Button>
    </div>
  );
};

