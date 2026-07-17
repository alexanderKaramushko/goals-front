import {
  Box,
  ClickAwayListener,
  Paper,
  type PaperProps,
  Popper as MuiPopper,
  type PopperProps as MuiPopperProps,
  type SxProps,
  type Theme,
  useTheme,
} from '@mui/material';
import cn from 'classnames';
import { type FC, type ReactNode, useState } from 'react';

import styles from './styles.module.css';

type PopperProps = Omit<MuiPopperProps, 'children'> & {
  children: ReactNode;
  onClickAway: (event: MouseEvent | TouchEvent) => void;
  paperProps?: PaperProps;
};

export const Popper: FC<PopperProps> = ({
  children,
  className,
  modifiers,
  onClickAway,
  paperProps,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  const { className: paperClassName, sx: paperSx, ...restPaperProps } = paperProps ?? {};

  const popperSx: SxProps<Theme> = [
    {
      '--shared-popper-arrow-background': theme.palette.background.paper,
      '--shared-popper-arrow-shadow': theme.shadows[2],
      '--shared-popper-paper-background': theme.palette.background.paper,
      '--shared-popper-paper-padding': theme.spacing(2),
      '--shared-popper-shadow': theme.shadows[5],
    },
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ];

  return (
    <MuiPopper
      className={cn(styles.root, className)}
      modifiers={[
        {
          enabled: true,
          name: 'arrow',
          options: {
            element: arrowRef,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 15],
          },
        },
        ...(modifiers ?? []),
      ]}
      sx={popperSx}
      {...props}
    >
      <ClickAwayListener onClickAway={onClickAway}>
        <Paper
          {...restPaperProps}
          className={cn(styles.paper, paperClassName)}
          sx={paperSx}
        >
          <Box className={styles.arrow} component="span" ref={setArrowRef} />
          {children}
        </Paper>
      </ClickAwayListener>
    </MuiPopper>
  );
};
