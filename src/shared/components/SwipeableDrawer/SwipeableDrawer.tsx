import { Box, SwipeableDrawer as MuiSwipeableDrawer, Typography } from '@mui/material';
import type { FC, PropsWithChildren, ReactNode } from 'react';

type SwipeableDrawerProps = {
  onClose: () => void;
  open: boolean;
  title: ReactNode;
  titleId: string;
};

export const SwipeableDrawer: FC<PropsWithChildren<SwipeableDrawerProps>> = ({
  children,
  onClose,
  open,
  title,
  titleId,
}) => (
  <MuiSwipeableDrawer
    anchor="bottom"
    onClose={onClose}
    onOpen={() => {}}
    open={open}
    slotProps={{
      paper: {
        'aria-labelledby': titleId,
        sx: {
          borderRadius: '16px 16px 0 0',
          maxHeight: '80dvh',
          overflowY: 'auto',
          pb: 'max(16px, env(safe-area-inset-bottom))',
          pt: 1,
          px: 2,
        },
      },
    }}
  >
    <Box
      aria-hidden
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        mt: -1,
      }}
    >
      <Box sx={{ bgcolor: 'divider', borderRadius: 2, height: 4, width: 36 }} />
    </Box>
    <Typography component="h2" id={titleId} sx={{ mb: 2 }} variant="h6">
      {title}
    </Typography>
    {children}
  </MuiSwipeableDrawer>
);
