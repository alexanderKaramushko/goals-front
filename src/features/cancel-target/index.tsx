import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';

import { getErrorMessage, useAdaptive } from 'shared/utils';

import { useCancelTarget } from 'entities/api';

interface CancelTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
  sx?: SxProps<Theme>;
}

export const CancelTarget: FC<CancelTargetButtonProps> = ({ onSuccess, sx, targetId }) => {
  const cancelTarget = useCancelTarget();
  const { enqueueSnackbar } = useSnackbar();
  const { isMobile } = useAdaptive();

  async function save() {
    try {
      await cancelTarget.invoke(targetId);
      onSuccess?.();
    } catch (error) {
      enqueueSnackbar({
        message: getErrorMessage(error),
        variant: 'error',
      });
    }
  }

  return (
    <Tooltip
      disableFocusListener={isMobile}
      disableHoverListener={isMobile}
      disableTouchListener={isMobile}
      title="Отменить цель"
    >
      {isMobile ? (
        <Button
          aria-label="Отменить цель"
          color="warning"
          fullWidth
          onClick={save}
          size="large"
          sx={sx}
        >
          <CancelIcon />
        </Button>
      ) : (
        <IconButton aria-label="Отменить цель" color="warning" onClick={save} size="large">
          <CancelIcon />
        </IconButton>
      )}
    </Tooltip>
  );
};
