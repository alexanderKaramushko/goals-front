import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { Background } from 'shared/components';

import { useGetUserProfile } from 'entities/api';

import { ResponsiveAppBar } from 'widgets/app-bar/app-bar';
import { AppBarNavigation } from 'widgets/app-bar-navigation/app-bar-navigation';
import { AppBarProfile } from 'widgets/app-bar-profile/app-bar-profile';

export const AppLayout = () => {
  const userProfile = useGetUserProfile();

  return (
    <Background>
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
        <ResponsiveAppBar
          slots={{
            navigation: <AppBarNavigation loading={userProfile.loading} />,
            profile: <AppBarProfile loading={userProfile.loading} name={userProfile.data?.name} />,
          }}
        />
        <Outlet />
      </Box>
    </Background>
  );
};
