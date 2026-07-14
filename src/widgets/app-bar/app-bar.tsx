import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Box, Menu, MenuItem, Stack, Tab, Tabs, Toolbar, useColorScheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router';

import { appRoutes } from 'app/routes';

import { Switch } from 'shared/components';

function ResponsiveAppBar() {
  const { mode, setMode } = useColorScheme();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

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
            {Object.values(appRoutes).map(({ path, title }) => (
              <MenuItem
                key={title}
                onClick={() => {
                  setAnchorElNav(null);
                  navigate(path);
                }}
                selected={!!matchPath(path, location.pathname)}
              >
                <Typography sx={{ textAlign: 'center' }}>{title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ display: { gap: '14px', md: 'flex', xs: 'none' }, flexGrow: 1, ml: 4 }}>
          <Tabs value={location.pathname}>
            {Object.values(appRoutes).map(({ path, title }) => (
              <Tab
                key={title}
                label={title}
                onClick={(event) => {
                  setAnchorElNav(event.currentTarget);
                  navigate(path);
                }}
                value={path}
              />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ mr: 2 }}>
          <Stack direction="row" spacing={1}>
            <LightModeIcon />
            <Switch
              checked={mode == 'dark'}
              onChange={(_, checked) => {
                setMode(checked ? 'dark' : 'light');
              }}
            />
            <ModeNightIcon />
          </Stack>
        </Box>
        <IconButton sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
