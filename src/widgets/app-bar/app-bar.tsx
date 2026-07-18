import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Box, Menu, MenuItem, Stack, Tab, Tabs, Toolbar, useColorScheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router';

import { appRoutes, unauthorizedRoutes } from 'app/routes';

import { Switch } from 'shared/components';
import { goalsAuthApiClient } from 'shared/libs/api-client';

const appBarRoutes = Object.values(appRoutes).filter(({ handle }) => !handle.skip);

function ResponsiveAppBar() {
  const { mode, setMode } = useColorScheme();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const activePath = appBarRoutes.find(({ path }) =>
    matchPath(`${path}/*`, location.pathname),
  )?.path;

  const userResult = useQuery({
    queryFn: () => goalsAuthApiClient.get<{ name: string }[]>('users/profile'),
    queryKey: ['profile'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const name = userResult.isSuccess ? (userResult.data.data[0]?.name ?? '') : '';
  const letters = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('');

  useEffect(() => {
    if (axios.isAxiosError(userResult.error) && userResult.error.status === 401) {
      navigate(unauthorizedRoutes.login.path);
    }
  }, [userResult.error, navigate]);

  return (
    <AppBar
      color="secondary"
      elevation={4}
      position="fixed"
      sx={{
        left: '50%',
        padding: '0 24px',
        top: '14px',
        transform: 'translateX(-50%)',
        width: '95%',
      }}
    >
      <Toolbar disableGutters>
        <Typography
          noWrap
          sx={{ display: { md: 'block', xs: 'none' }, fontWeight: 500 }}
          variant="body1"
        >
          Melkor Apps
        </Typography>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {userResult.isSuccess && (
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
                      onClick={(event) => {
                        setAnchorElNav(event.currentTarget);
                        navigate(path);
                      }}
                      value={path}
                    />
                  ))}
                </Tabs>
              </Box>
            </>
          )}
        </Box>
        <Box sx={{ mr: 2 }}>
          <Stack direction="row" spacing={1}>
            <LightModeIcon
              sx={{
                color: (theme) =>
                  mode === 'dark'
                    ? theme.darken(theme.palette.text.secondary, 0.4)
                    : theme.darken(theme.palette.primary.light, 0.25),
              }}
            />
            <Switch
              checked={mode == 'dark'}
              onChange={(_, checked) => {
                setMode(checked ? 'dark' : 'light');
              }}
            />
            <ModeNightIcon
              sx={{
                color: (theme) =>
                  mode === 'dark'
                    ? theme.lighten(theme.palette.text.secondary, 0.9)
                    : theme.darken(theme.palette.secondary.main, 0.4),
              }}
            />
          </Stack>
        </Box>
        <IconButton sx={{ p: 0 }}>
          <Avatar>{letters}</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
