import { Switch as MUISwitch, type SwitchProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { forwardRef } from 'react';

const iosSwitchSx = (theme: Theme) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '& + .MuiSwitch-track': {
        backgroundColor: '#E9E9EA',
        border: 0,
        opacity: 1,
        ...theme.applyStyles('dark', {
          backgroundColor: '#E9E9EA',
        }),
      },
      color: '#fff',
      transform: 'translateX(16px)',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      border: '6px solid #fff',
      color: '#33cf4d',
    },
    margin: '2px !important',
    padding: 0,
    transitionDuration: '300ms',
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    height: 22,
    width: 22,
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#E9E9EA',
    borderRadius: 26 / 2,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
  height: 26,
  padding: 0,
  width: 42,
});

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function IOSSwitchComponent(
  { sx, ...props },
  ref,
) {
  return (
    <MUISwitch
      disableRipple
      focusVisibleClassName=".Mui-focusVisible"
      ref={ref}
      sx={Array.isArray(sx) ? [iosSwitchSx, ...sx] : sx ? [iosSwitchSx, sx] : [iosSwitchSx]}
      {...props}
    />
  );
});
