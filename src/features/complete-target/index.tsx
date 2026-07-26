import DoneIcon from '@mui/icons-material/Done';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { type FC, useState } from 'react';

import { Popper } from 'shared/components';

import { useCompleteTarget } from 'entities/api';

type CompleteTargetData = {
  resultComment: string;
};

interface CompleteTargetButtonProps {
  targetId: number;
  isTargetOutdated: boolean;
  onSuccess?: () => void;
}

export const CompleteTarget: FC<CompleteTargetButtonProps> = ({
  isTargetOutdated,
  onSuccess,
  targetId,
}) => {
  const completeTarget = useCompleteTarget();
  const { enqueueSnackbar } = useSnackbar();

  const [completeTargetData, setCompleteTargetData] = useState<CompleteTargetData>({
    resultComment: '',
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
      onSuccess();
    } catch (error) {
      enqueueSnackbar({
        message: error?.response?.data?.message || error.message || 'Ошибка. Поробуйте еще раз',
        variant: 'error',
      });
    }
  }

  return (
    <>
      <Tooltip title={isTargetOutdated ? 'Завершить' : 'Завершить с комментарием'}>
        <IconButton
          aria-label={isTargetOutdated ? 'Завершить' : 'Завершить с комментарием'}
          color="success"
          onClick={async (event) => {
            if (isTargetOutdated) {
              save('-');
            } else {
              setAnchorEl(event.currentTarget);
            }
          }}
          size="large"
        >
          {isTargetOutdated ? <TaskAltIcon /> : <MarkChatReadIcon />}
        </IconButton>
      </Tooltip>
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
        <Grid container spacing={1}>
          <Grid sx={{ flex: 1 }}>
            <TextField
              autoFocus
              fullWidth
              id="step-title"
              label="Пожелания к награде"
              onChange={(event) => {
                editCompleteTargetData('resultComment', event.currentTarget.value);
              }}
              placeholder=""
              size="small"
              value={completeTargetData.resultComment}
              variant="outlined"
            />
          </Grid>
          <Grid>
            <IconButton
              aria-label="Завершить цель"
              color="success"
              onClick={() => save(completeTargetData.resultComment)}
            >
              <DoneIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Popper>
    </>
  );
};

