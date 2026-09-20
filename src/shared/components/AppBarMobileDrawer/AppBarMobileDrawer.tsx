import MenuIcon from '@mui/icons-material/Menu';
import { SwipeableDrawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { type FC, type PropsWithChildren, useState } from 'react';

export const AppBarMobileDrawer: FC<PropsWithChildren> = ({ children }) => {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);

  return (
    <>
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
      <SwipeableDrawer
        onClose={() => setAnchorElNav(null)}
        onOpen={() => {}}
        open={!!anchorElNav}
        slotProps={{
          paper: {
            sx: {
              width: 208,
            },
          },
        }}
      >
        {children}
      </SwipeableDrawer>
    </>
  );
};
