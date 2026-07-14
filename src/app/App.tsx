import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { queryClient } from 'shared/libs/query-client';

import NavigationLayout from 'pages/layouts/navigation';

import { appRoutes, techRoutes } from './routes';
import { theme } from './theme';

const router = createBrowserRouter([
  {
    children: [
      {
        Component: appRoutes.app.Component,
        path: appRoutes.app.path,
      },
      {
        Component: appRoutes.users.Component,
        path: appRoutes.users.path,
      },
      {
        Component: techRoutes.login.Component,
        path: techRoutes.login.path,
      },
    ],
    Component: NavigationLayout,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
