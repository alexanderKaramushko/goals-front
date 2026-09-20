import { Box, CircularProgress } from '@mui/material';
import { Navigate, Outlet } from 'react-router';

import { useAuth } from 'app/auth';

import { Background } from 'shared/components';

import { unauthorizedRoutes } from './routes';

export const ProtectedRoute = () => {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <Background>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            maxWidth: '90%',
            minHeight: '100dvh',
          }}
        >
          <CircularProgress aria-label="Loading…" />
        </Box>
      </Background>
    );
  }

  if (auth.isAuthorized) {
    return <Outlet />;
  }

  return <Navigate replace to={unauthorizedRoutes.login.path} />;
};
