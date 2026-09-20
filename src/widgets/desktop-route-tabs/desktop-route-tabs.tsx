import { Box, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router';

import { appRoutes } from 'app/routing';

import { useIsActivePath } from 'shared/utils';

const appBarRoutes = Object.values(appRoutes).filter(({ handle }) => !handle.skip);

export const DesktopRouteTabs = () => {
  const navigate = useNavigate();
  const isActivePath = useIsActivePath();
  const activePath = appBarRoutes.find(({ path }) => isActivePath(path))?.path ?? false;

  return (
    <Box sx={{ display: { gap: '14px', md: 'flex', xs: 'none' }, flexGrow: 1, ml: 4 }}>
      <Tabs value={activePath}>
        {appBarRoutes.map(({ handle, path }) => (
          <Tab key={path} label={handle.title} onClick={() => navigate(path)} value={path} />
        ))}
      </Tabs>
    </Box>
  );
};
