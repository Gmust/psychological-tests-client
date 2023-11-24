import { useAuthStore } from '@context/auth-store.ts';
import { useParams } from 'react-router-dom';

export const UserPage = () => {
  const { id } = useParams();
  console.log(id);
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      {id}
      {user && <div>user</div>}
    </div>
  );
};
