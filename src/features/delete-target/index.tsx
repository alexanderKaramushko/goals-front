import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';

import { useDeleteTarget } from 'entities/api';

interface DeleteTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
}

export const DeleteTarget: FC<DeleteTargetButtonProps> = ({ onSuccess, targetId }) => {
  const deleteTarget = useDeleteTarget();
  const { enqueueSnackbar } = useSnackbar();

  async function save() {
    try {
      await deleteTarget.invoke(targetId);
      onSuccess?.();
    } catch (error) {
      enqueueSnackbar({
        message: error?.response?.data?.message || error.message || 'Ошибка. Поробуйте еще раз',
        variant: 'error',
      });
    }
  }

  return (
    <Tooltip title="Удалить цель">
      <IconButton aria-label="Удалить цель" color="error" onClick={save} size="large">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

