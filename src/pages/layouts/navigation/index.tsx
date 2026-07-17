import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router';

import { unauthorizedRoutes } from 'app/routes';

import { Background } from 'shared/components';

import ResponsiveAppBar from 'widgets/app-bar/app-bar';

const NavigationLayout = () => {
  const location = useLocation();

  return (
    <Background
      showLines={Object.values(unauthorizedRoutes).some(({ path }) => location.pathname === path)}
    >
      <Box sx={{ boxSizing: 'border-box', height: '100%', overflowY: 'auto' }}>
        <ResponsiveAppBar />
        <Outlet />
      </Box>
    </Background>
  );
};

export default NavigationLayout;

