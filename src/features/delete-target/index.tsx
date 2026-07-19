import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import type { FC } from 'react';

import { useDeleteTarget } from 'entities/api';

interface DeleteTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
}

export const DeleteTarget: FC<DeleteTargetButtonProps> = ({ onSuccess, targetId }) => {
  const deleteTarget = useDeleteTarget();

  return (
    <Tooltip title="Удалить цель">
      <IconButton
        aria-label="Удалить цель"
        color="error"
        onClick={async () => {
          await deleteTarget.invoke(targetId);
          onSuccess?.();
        }}
        size="large"
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

