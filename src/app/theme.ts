import { createTheme, type Shadows } from '@mui/material';

export const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(18px)',
          borderRadius: '24px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#F8F7F5',
      paper: '#FFF',
    },
    divider: '#E3E5E8',
    mode: 'light',
    primary: {
      contrastText: '#FFF7F8',
      dark: '#7E2A38',
      light: '#D98B96',
      main: '#B85A67',
    },
    secondary: {
      contrastText: '#3A3532',
      dark: 'rgba(214, 205, 199, 0.82)',
      light: 'rgba(255, 252, 249, 0.86)',
      main: 'rgba(243, 238, 235, 0.7)',
    },
    text: {
      primary: '#1C1C1E',
      secondary: '#6E6E73',
    },
    warning: {
      dark: '#7E4216',
      light: '#C27A38',
      main: '#A66124',
    },
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(47, 52, 58, 0.06)', // самых мелких элементов
    '0px 2px 6px rgba(47, 52, 58, 0.08)', // Было 0.05
    '0px 4px 12px rgba(47, 52, 58, 0.10)', // базовые кнопки/поля
    '0px 8px 24px rgba(47, 52, 58, 0.12)', // идеальный уровень для AppBar
    '0px 10px 30px rgba(47, 52, 58, 0.12)', // карточки и выпадающие списки
    '0px 14px 40px rgba(47, 52, 58, 0.14)', // крупные поповеры/меню
    ...Array(18).fill('0px 18px 56px rgba(47, 52, 58, 0.16)'), // модальные окна
  ] as Shadows,
});
