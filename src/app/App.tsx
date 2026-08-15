/* eslint-disable @typescript-eslint/no-shadow */
import HelpIcon from '@mui/icons-material/Help';
import { Box, CssBaseline, Tooltip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { queryClient } from 'shared/libs/query-client';

import AppLayout from 'pages/layouts/app';
import NavigationLayout from 'pages/layouts/navigation';

import './global.css';

import { appRoutes, unauthorizedRoutes } from './routes';
import { theme } from './theme';

const router = createBrowserRouter([
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
        path: '/',
      },
      {
        Component: unauthorizedRoutes.login.Component,
        handle: unauthorizedRoutes.login.handle,
        path: unauthorizedRoutes.login.path,
      },
    ],
    Component: NavigationLayout,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          autoHideDuration={2000}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <RouterProvider router={router} />
          </LocalizationProvider>
        </SnackbarProvider>
        <Box sx={{ bottom: 24, cursor: 'pointer', position: 'fixed', right: 24 }}>
          <Tooltip placement="left" title={import.meta.env.VITE_VERSION.slice(0, 7)}>
            <HelpIcon sx={{ color: (theme) => theme.palette.grey['600'] }} />
          </Tooltip>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
