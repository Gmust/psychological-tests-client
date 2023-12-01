import { useAuthStore } from '@context/auth-store.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFoundPage } from '../components/error/NotFoundPage.tsx';
import { adminRoutes, protectedRoutes, routes } from '../utils/routes.tsx';
import Layout from './Layout.tsx';

const CustomRouter = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
        <Route element={<Layout />}>
          {isAuth &&
            protectedRoutes.map((route) => <Route path={route.path} element={route.element} key={route.path} />)}
          {user.role === 'admin' &&
            adminRoutes.map((route) => <Route path={route.path} element={route.element} key={route.path} />)}
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRouter;
