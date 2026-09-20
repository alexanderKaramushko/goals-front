import { Box, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';

type ResponsiveAppBarProps = {
  slots?: {
    navigation?: ReactNode;
    right?: ReactNode;
  };
};

export const ResponsiveAppBar: FC<ResponsiveAppBarProps> = ({ slots }) => {
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
        <Box sx={{ mr: 1 }}>
          <img src="/logo.png" width="40px" />
        </Box>
        <Typography noWrap sx={{ fontWeight: 500 }} variant="body1">
          Melkor Apps
        </Typography>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>{slots?.navigation}</Box>
        {slots?.right}
      </Toolbar>
    </AppBar>
  );
};
