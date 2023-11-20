import { RouteObject } from 'react-router-dom';

import { LoginPage } from '../components/auth/login/LoginPage.tsx';
import { RegistrationPage } from '../components/auth/registration/RegistrationPage.tsx';
import { HomePage } from '../components/home/HomePage.tsx';
import { TestPage } from '../components/test/TestPage.tsx';
import { UserPage } from '../components/user/UserPage.tsx';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegistrationPage />
  }
];

export const protectedRoutes: RouteObject[] = [
  {
    path: 'test/:id',
    element: <TestPage />
  },
  {
    path: 'user/:id',
    element: <UserPage />
  }
];
