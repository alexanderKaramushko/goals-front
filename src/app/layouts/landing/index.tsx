import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { Background } from 'shared/components';

import { ResponsiveAppBar } from 'widgets/app-bar/app-bar';

export const LandingLayout = () => {
  return (
    <Background showLines>
      <Box
        sx={{
          boxSizing: 'border-box',
          height: '100%',
          margin: '0 auto',
          maxWidth: '90%',
          overflowY: 'auto',
          pb: 4,
          pt: '120px',
        }}
      >
        <ResponsiveAppBar />
        <Outlet />
      </Box>
    </Background>
  );
};
