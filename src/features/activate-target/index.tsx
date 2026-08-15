import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';

import { getErrorMessage } from 'shared/utils';

import { useActivateTarget } from 'entities/api';

interface ActivateTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
}

export const ActivateTarget: FC<ActivateTargetButtonProps> = ({ onSuccess, targetId }) => {
  const activateTarget = useActivateTarget();
  const { enqueueSnackbar } = useSnackbar();

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
    <Tooltip title="Начать выполнение">
      <IconButton aria-label="Начать выполнение" color="success" onClick={save} size="large">
        <PlayCircleFilledIcon />
      </IconButton>
    </Tooltip>
  );
};
