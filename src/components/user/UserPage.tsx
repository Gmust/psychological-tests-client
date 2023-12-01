import { UserPassedTests } from '@components/user/UserPassedTests.tsx';
import { useAuthStore } from '@context/auth-store.ts';
import { Button } from '@shared/Button.tsx';
import { useNavigate } from 'react-router-dom';

export const UserPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  return (
    <div className=' h-screen flex items-center justify-center'>
      <div className='flex bg-white space-x-10 p-8 text-2xl rounded-md'>
        <div className='flex flex-col space-y-4'>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          {user.role === 'admin' ? (
            <div>
              <Button variant='default' size='lg' onClick={() => navigate('admin')}>
                Manage tests
              </Button>
            </div>
          ) : null}
        </div>
        <div className='flex flex-col'>
          <h3>Passed tests:</h3>
          {user.passedTests && <UserPassedTests tests={user.passedTests} />}
        </div>
      </div>
    </div>
  );
};
