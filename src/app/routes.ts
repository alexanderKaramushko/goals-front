import AuthPage from 'pages/auth';
import GoalsPage from 'pages/goals';
import UsersPage from 'pages/users';

export const appRoutes = {
  app: {
    Component: GoalsPage,
    path: '/app',
    title: 'Цели',
  },
  users: {
    Component: UsersPage,
    path: '/users',
    title: 'Пользователи',
  },
};

export const unauthorizedRoutes = {
  login: {
    Component: AuthPage,
    path: '/login',
    title: 'Вход',
  },
};

