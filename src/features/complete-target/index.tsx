import DoneIcon from '@mui/icons-material/Done';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { type FC, type MouseEvent, useState } from 'react';

import { Popper, SwipeableDrawer } from 'shared/components';
import { getErrorMessage, useAdaptive } from 'shared/utils';

import { useCompleteTarget } from 'entities/api';

type CompleteTargetData = {
  resultComment: string;
};

interface CompleteTargetButtonProps {
  targetId: number;
  isTargetOutdated: boolean;
  onSuccess?: () => void;
  sx?: SxProps<Theme>;
}

export const CompleteTarget: FC<CompleteTargetButtonProps> = ({
  isTargetOutdated,
  onSuccess,
  sx,
  targetId,
}) => {
  const completeTarget = useCompleteTarget();
  const { enqueueSnackbar } = useSnackbar();

  const [completeTargetData, setCompleteTargetData] = useState<CompleteTargetData>({
    resultComment: '',
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { isMobile } = useAdaptive();

  const label = isTargetOutdated ? 'Завершить' : 'Завершить с\u00A0комментарием';
  const icon = isTargetOutdated ? <TaskAltIcon /> : <MarkChatReadIcon />;
  const drawerTitleId = `target-${targetId}-complete-title`;

  function editCompleteTargetData<Name extends keyof CompleteTargetData>(
    name: Name,
    value: CompleteTargetData[Name],
  ) {
    setCompleteTargetData((prevTargetData) => ({
      ...prevTargetData,
      [name]: value,
    }));
  }

  async function save(resultComment: string) {
    try {
      await completeTarget.invoke(targetId, resultComment);
      setAnchorEl(null);
      onSuccess?.();
    } catch (error) {
      enqueueSnackbar({
        message: getErrorMessage(error),
        variant: 'error',
      });
    }
  }

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (isTargetOutdated) {
      await save('-');
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleSave = () => save(completeTargetData.resultComment);

  const form = (
    <Grid container spacing={1}>
      <Grid size={{ laptop: 'grow', mobile: 12 }}>
        <TextField
          autoFocus
          fullWidth
          id="step-title"
          label={'Пожелания к\u00A0награде'}
          onChange={(event) => {
            editCompleteTargetData('resultComment', event.currentTarget.value);
          }}
          placeholder=""
          size="small"
          value={completeTargetData.resultComment}
          variant="outlined"
        />
      </Grid>
      {isMobile ? (
        <Grid size={12} sx={{ mt: 3 }}>
          <Button color="success" fullWidth onClick={handleSave} variant="contained">
            Сохранить
          </Button>
        </Grid>
      ) : (
        <Grid>
          <IconButton aria-label="Завершить цель" color="success" onClick={handleSave}>
            <DoneIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );

  return (
    <>
      <Tooltip
        disableFocusListener={isMobile}
        disableHoverListener={isMobile}
        disableTouchListener={isMobile}
        title={label}
      >
        {isMobile ? (
          <Button
            aria-label={label}
            color="success"
            fullWidth
            onClick={handleClick}
            size="large"
            sx={sx}
          >
            {icon}
          </Button>
        ) : (
          <IconButton aria-label={label} color="success" onClick={handleClick} size="large">
            {icon}
          </IconButton>
        )}
      </Tooltip>
      {isMobile ? (
        <SwipeableDrawer
          onClose={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
          title="Завершение цели"
          titleId={drawerTitleId}
        >
          {form}
        </SwipeableDrawer>
      ) : (
        <Popper
          anchorEl={anchorEl}
          id={anchorEl ? 'complete' : undefined}
          onClickAway={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
          placement="top"
          sx={{
            width: '300px',
          }}
        >
          {form}
        </Popper>
      )}
    </>
  );
};
