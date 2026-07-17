import type { JSX } from 'react/jsx-runtime';
import { useMatches } from 'react-router';

import AuthPage from 'pages/auth';
import CreateGoalPage from 'pages/create-goal';
import GoalsPage from 'pages/goals';
import UsersPage from 'pages/users';

type RouteHandle = {
  title?: string;
  /** Не отображать в навигации */
  skip?: boolean;
};

type RouteScheme = Record<
  string,
  {
    Component: () => JSX.Element;
    path: string;
    handle?: RouteHandle;
  }
>;

export const appRoutes: RouteScheme = {
  app: {
    Component: GoalsPage,
    handle: {
      title: 'Цели',
    },
    path: '/app',
  },
  createGoal: {
    Component: CreateGoalPage,
    handle: {
      skip: true,
      title: 'Создать цель',
    },
    path: '/app/create-goal',
  },
  users: {
    Component: UsersPage,
    handle: {
      title: 'Пользователи',
    },
    path: '/users',
  },
};

export const unauthorizedRoutes: RouteScheme = {
  login: {
    Component: AuthPage,
    handle: {
      title: 'Вход',
    },
    path: '/login',
  },
};

export function useRouteHandle() {
  const matches = useMatches();

  const currentMatch = [...matches].reverse().find((match) => {
    const handle = match.handle as RouteHandle | undefined;

    return Boolean(handle);
  });

  const handle = currentMatch?.handle as RouteHandle | undefined;

  return handle;
}

