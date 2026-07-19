import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Stack, useColorScheme } from '@mui/material';

import { Switch } from 'shared/components';

export const ThemeChanger = () => {
  const { mode, setMode } = useColorScheme();

  return (
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
  );
};

