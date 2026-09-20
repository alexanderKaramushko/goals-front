import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Button, IconButton, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';

import { getErrorMessage, useAdaptive } from 'shared/utils';

import { useActivateTarget } from 'entities/api';

interface ActivateTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
  sx?: SxProps<Theme>;
}

export const ActivateTarget: FC<ActivateTargetButtonProps> = ({ onSuccess, sx, targetId }) => {
  const activateTarget = useActivateTarget();
  const { enqueueSnackbar } = useSnackbar();
  const { isMobile } = useAdaptive();

  async function save() {
    try {
      await activateTarget.invoke(targetId);
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
      title="Начать выполнение"
    >
      {isMobile ? (
        <Button
          aria-label="Начать выполнение"
          color="success"
          fullWidth
          onClick={save}
          size="large"
          sx={sx}
        >
          <PlayCircleFilledIcon />
        </Button>
      ) : (
        <IconButton aria-label="Начать выполнение" color="success" onClick={save} size="large">
          <PlayCircleFilledIcon />
        </IconButton>
      )}
    </Tooltip>
  );
};
