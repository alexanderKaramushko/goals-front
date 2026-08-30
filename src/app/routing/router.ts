import { createBrowserRouter } from 'react-router';

import { AppLayout } from 'app/layouts/app';
import { LandingLayout } from 'app/layouts/landing';

import { ProtectedRoute } from './ProtectedRoute';
import { appRoutes, unauthorizedRoutes } from './routes';

export const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          {
            children: [
              {
                Component: appRoutes.app.Component,
                handle: appRoutes.app.handle,
                path: appRoutes.app.path,
              },
              {
                Component: appRoutes.users.Component,
                handle: appRoutes.users.handle,
                path: appRoutes.users.path,
              },
              {
                Component: appRoutes.createGoal.Component,
                handle: appRoutes.createGoal.handle,
                path: appRoutes.createGoal.path,
              },
              {
                Component: appRoutes.userTargets.Component,
                handle: appRoutes.userTargets.handle,
                path: appRoutes.userTargets.path,
              },
            ],
            Component: AppLayout,
          },
        ],
        Component: ProtectedRoute,
      },
      {
        children: [
          {
            Component: unauthorizedRoutes.login.Component,
            handle: unauthorizedRoutes.login.handle,
            path: unauthorizedRoutes.login.path,
          },
        ],
        Component: LandingLayout,
      },
    ],
  },
]);

