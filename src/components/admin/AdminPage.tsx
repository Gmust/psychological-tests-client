import { Button } from '@shared/Button.tsx';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col space-y-5 justify-center items-center mt-10 '>
      <div className='bg-white rounded-md p-4 flex items-center flex-col'>
        <h3 className='text-3xl text-gray-900'>Admin panel</h3>
        <p className='text-2xl text-gray-900'>Which action you would like to perform?</p>
      </div>
      <Button variant='default' size='lg' className='w-72' onClick={() => navigate('create-new-test')}>
        Create new Test
      </Button>
      <Button variant='default' size='lg' className='w-72'>
        Update Test
      </Button>
      <Button variant='default' size='lg' className='w-72'>
        Delete Test
      </Button>
    </div>
  );
};
