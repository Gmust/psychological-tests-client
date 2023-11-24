import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFoundPage } from '../components/error/NotFoundPage.tsx';
import { protectedRoutes, routes } from '../utils/routes.tsx';
import Layout from './Layout.tsx';

const CustomRouter = () => {
  const isAuth = true;

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
        <Route element={<Layout />}>
          {isAuth &&
            protectedRoutes.map((route) => (
              <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRouter;
