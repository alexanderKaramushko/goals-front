import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';

import { getErrorMessage, useAdaptive } from 'shared/utils';

import { useDeleteTarget } from 'entities/api';

interface DeleteTargetButtonProps {
  targetId: number;
  onSuccess?: () => void;
  sx?: SxProps<Theme>;
}

export const DeleteTarget: FC<DeleteTargetButtonProps> = ({ onSuccess, sx, targetId }) => {
  const deleteTarget = useDeleteTarget();
  const { enqueueSnackbar } = useSnackbar();
  const { isMobile } = useAdaptive();

  async function save() {
    try {
      await deleteTarget.invoke(targetId);
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
      title="Удалить цель"
    >
      {isMobile ? (
        <Button
          aria-label="Удалить цель"
          color="error"
          fullWidth
          onClick={save}
          size="large"
          sx={sx}
        >
          <DeleteIcon />
        </Button>
      ) : (
        <IconButton aria-label="Удалить цель" color="error" onClick={save} size="large">
          <DeleteIcon />
        </IconButton>
      )}
    </Tooltip>
  );
};
