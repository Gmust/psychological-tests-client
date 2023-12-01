import { AdminPage } from '@components/admin/AdminPage.tsx';
import { CreateNewTest } from '@components/admin/new-test/CreateNewTest.tsx';
import { TestsPage } from '@components/tests/TestsPage.tsx';
import { RouteObject } from 'react-router-dom';

import { LoginPage } from '../components/auth/login/LoginPage.tsx';
import { RegistrationPage } from '../components/auth/registration/RegistrationPage.tsx';
import { HomePage } from '../components/home/HomePage.tsx';
import { TestPage } from '../components/test/TestPage.tsx';
import { UserPage } from '../components/user/UserPage.tsx';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegistrationPage />,
  },
];

export const protectedRoutes: RouteObject[] = [
  {
    path: 'tests/test/:id',
    element: <TestPage />,
  },
  {
    path: 'user/:id',
    element: <UserPage />,
  },
  {
    path: 'tests',
    element: <TestsPage />,
  },
];

export const adminRoutes: RouteObject[] = [
  {
    path: 'user/:id/admin',
    element: <AdminPage />,
  },
  {
    path: 'user/:id/admin/create-new-test',
    element: <CreateNewTest />,
  },
];
