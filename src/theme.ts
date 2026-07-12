/* eslint-disable sort-keys */
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7A1F3D',
      light: '#A34A67',
      dark: '#541229',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A7ADB5',
      light: '#D7DBE0',
      dark: '#737A84',
      contrastText: '#1C1C1E',
    },
    background: {
      default: '#F7F7F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1C1E',
      secondary: '#6E6E73',
    },
    divider: '#E3E5E8',
  },
  typography: {
    fontFamily: [
      '"Comic Sans MS"',
      '"Comic Sans"',
      'cursive',
    ].join(','),
  },
});
