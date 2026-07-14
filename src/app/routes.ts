import AuthPage from 'pages/auth';
import GoalsPage from 'pages/goals';

export const appRoutes = {
  app: {
    Component: GoalsPage,
    path: '/app',
    title: 'Цели',
  },
  users: {
    Component: GoalsPage,
    path: '/users',
    title: 'Пользователи',
  },
};

export const techRoutes = {
  login: {
    Component: AuthPage,
    path: '/login',
    title: 'Вход',
  },
};

