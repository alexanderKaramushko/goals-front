import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router';

import { Background } from 'shared/components';
import { useAdaptive } from 'shared/utils';

import { ThemeChanger } from 'features/theme-changer';

import { ResponsiveAppBar } from 'widgets/app-bar/app-bar';
import { AppBarPanel } from 'widgets/app-bar-panel/app-bar-panel';
import { AppBarProfile } from 'widgets/app-bar-profile/app-bar-profile';
import { DesktopRouteTabs } from 'widgets/desktop-route-tabs/desktop-route-tabs';

export const AppLayout = () => {
  const { isMobile } = useAdaptive();

  return (
    <Background>
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          boxSizing: 'border-box',
          height: '100%',
          margin: '0 auto',
          maxWidth: '90%',
          overflowY: 'auto',
          pb: 4,

          pt: '120px',
        }}
      >
        <ResponsiveAppBar
          slots={{
            navigation: isMobile ? <AppBarPanel /> : <DesktopRouteTabs />,
            right: isMobile ? undefined : (
              <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                <ThemeChanger />
                <AppBarProfile />
              </Stack>
            ),
          }}
        />
        <Outlet />
      </Box>
    </Background>
  );
};
