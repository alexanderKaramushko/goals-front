import { Tooltip as MuiTooltip, type TooltipProps as MuiTooltipProps } from '@mui/material';
import type { FC } from 'react';

import { useAdaptive } from 'shared/utils';

export type TooltipProps = MuiTooltipProps;

export const Tooltip: FC<TooltipProps> = ({ children, ...props }) => {
  const { isMobile } = useAdaptive();

  if (isMobile) {
    return children;
  }

  return <MuiTooltip {...props}>{children}</MuiTooltip>;
};
