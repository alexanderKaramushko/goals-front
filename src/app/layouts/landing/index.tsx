import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { Background } from 'shared/components';

import { ThemeChanger } from 'features/theme-changer';

import { ResponsiveAppBar } from 'widgets/app-bar/app-bar';

export const LandingLayout = () => {
  return (
    <Background showLines>
      <Box
        sx={{
          boxSizing: 'border-box',
          height: '100dvh',
          margin: '0 auto',
          maxWidth: '90%',
          pb: 4,
        }}
      >
        <ResponsiveAppBar slots={{ right: <ThemeChanger /> }} />
        <Outlet />
      </Box>
    </Background>
  );
};
