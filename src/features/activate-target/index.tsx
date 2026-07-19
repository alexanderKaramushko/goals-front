import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { IconButton, Tooltip } from '@mui/material';
import type { FC } from 'react';

import { useActivateTarget } from 'entities/api';

interface ActivateTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
}

export const ActivateTarget: FC<ActivateTargetButtonProps> = ({ onSuccess, targetId }) => {
  const activateTarget = useActivateTarget();

  return (
    <Tooltip title="Активировать цель">
      <IconButton
        aria-label="Активировать цель"
        color="success"
        onClick={async () => {
          await activateTarget.invoke(targetId);
          onSuccess?.();
        }}
        size="large"
      >
        <PlayCircleFilledIcon />
      </IconButton>
    </Tooltip>
  );
};

