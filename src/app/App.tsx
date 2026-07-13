import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { queryClient } from 'shared/libs/query-client';

import AuthPage from 'pages/auth';

import ResponsiveAppBar from 'widgets/app-bar/app-bar';

import { theme } from './theme';

const router = createBrowserRouter([
  {
    Component: AuthPage,
    path: '/login',
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
