import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';

import { getErrorMessage } from 'shared/utils';

import { useCancelTarget } from 'entities/api';

interface CancelTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
}

export const CancelTarget: FC<CancelTargetButtonProps> = ({ onSuccess, targetId }) => {
  const cancelTarget = useCancelTarget();
  const { enqueueSnackbar } = useSnackbar();

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
    <Tooltip title="Отменить цель">
      <IconButton aria-label="Отменить цель" color="warning" onClick={save} size="large">
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};
