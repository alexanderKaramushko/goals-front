import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, Tooltip } from '@mui/material';
import type { FC } from 'react';

import { useCancelTarget } from 'entities/api';

interface CancelTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
}

export const CancelTarget: FC<CancelTargetButtonProps> = ({ onSuccess, targetId }) => {
  const cancelTarget = useCancelTarget();

  return (
    <Tooltip title="Отменить цель">
      <IconButton
        aria-label="Отменить цель"
        color="warning"
        onClick={async () => {
          await cancelTarget.invoke(targetId);
          onSuccess?.();
        }}
        size="large"
      >
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};

