import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Grid, Stack, useColorScheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Switch } from 'shared/components';

function ResponsiveAppBar() {
  const { mode, setMode } = useColorScheme();

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
      <Grid
        container
        sx={{ alignItems: 'center', justifyContent: 'space-between', py: 2, width: '100%' }}
      >
        <Grid>
          <Typography noWrap sx={{ fontWeight: 500 }} variant="body1">
            Melkor Apps
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid>
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
          </Grid>
          <Grid>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default ResponsiveAppBar;
