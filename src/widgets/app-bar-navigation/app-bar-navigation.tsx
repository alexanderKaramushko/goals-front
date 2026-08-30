import MenuIcon from '@mui/icons-material/Menu';
import { Box, Menu, MenuItem, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { type FC, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router';

import { appRoutes } from 'app/routing/routes';

const appBarRoutes = Object.values(appRoutes).filter(({ handle }) => !handle.skip);

type AppBarNavigationProps = {
  loading: boolean;
};

export const AppBarNavigation: FC<AppBarNavigationProps> = ({ loading }) => {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const activePath = appBarRoutes.find(({ path }) =>
    matchPath(`${path}/*`, location.pathname),
  )?.path;

  if (loading) {
    return (
      <Stack direction="row" spacing={4} sx={{ display: { md: 'flex', sx: 'none' }, ml: '48px' }}>
        <Skeleton height={24} variant="rectangular" width={58} />
        <Skeleton height={24} variant="rectangular" width={114} />
      </Stack>
    );
  }

  return (
    <>
      <Box sx={{ display: { md: 'none', xs: 'flex' }, flexGrow: 1 }}>
        <IconButton
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={(event) => {
            setAnchorElNav(event.currentTarget);
          }}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElNav}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          id="menu-appbar"
          keepMounted
          onClick={() => {
            setAnchorElNav(null);
          }}
          open={Boolean(anchorElNav)}
          sx={{ display: { md: 'none', xs: 'block' } }}
          transformOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
        >
          {appBarRoutes.map(({ handle, path }) => (
            <MenuItem
              key={handle.title}
              onClick={() => {
                setAnchorElNav(null);
                navigate(path);
              }}
              selected={!!activePath}
            >
              <Typography sx={{ textAlign: 'center' }}>{handle.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ display: { gap: '14px', md: 'flex', xs: 'none' }, flexGrow: 1, ml: 4 }}>
        <Tabs value={activePath}>
          {appBarRoutes.map(({ handle, path }) => (
            <Tab
              key={handle.title}
              label={handle.title}
              onClick={() => {
                navigate(path);
              }}
              value={path}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};
