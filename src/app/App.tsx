/* eslint-disable @typescript-eslint/no-shadow */
import HelpIcon from '@mui/icons-material/Help';
import { Box, CssBaseline, Tooltip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router';

import { queryClient } from 'shared/libs/query-client';

import './global.css';

import { router } from './routing/router';
import { theme } from './theme';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          autoHideDuration={2000}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <RouterProvider router={router} />
          </LocalizationProvider>
        </SnackbarProvider>
        <Box sx={{ bottom: 24, cursor: 'pointer', position: 'fixed', right: 24 }}>
          <Tooltip placement="left" title={`Версия: ${import.meta.env.VITE_VERSION.slice(0, 7)}`}>
            <HelpIcon sx={{ color: (theme) => theme.palette.grey['600'] }} />
          </Tooltip>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
