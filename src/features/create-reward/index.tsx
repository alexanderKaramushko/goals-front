import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Button, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { type FC, type ReactNode, useState } from 'react';

import { Popper } from 'shared/components';

import { useCreateReward } from 'entities/api/rewards';
import type { TargetId } from 'entities/api/types';

type RewardData = {
  title: string;
  description: string;
};

type CreateRewardProps = {
  targetId: TargetId;
  onSuccess?: () => void;
  slots?: {
    top: ReactNode;
  };
};

export const CreateReward: FC<CreateRewardProps> = ({ onSuccess, slots, targetId }) => {
  const createReward = useCreateReward();
  const { enqueueSnackbar } = useSnackbar();

  const [rewardData, setRewardData] = useState<RewardData>({
    description: '',
    title: '',
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function editRewardData<Name extends keyof RewardData>(name: Name, value: RewardData[Name]) {
    setRewardData((prevRewardData) => ({
      ...prevRewardData,
      [name]: value,
    }));
  }

  function isFormFilled() {
    return rewardData.title && rewardData.description;
  }

  async function save() {
    if (isFormFilled()) {
      try {
        await createReward.invoke({
          targetId,
          ...rewardData,
        });

        onSuccess?.();
      } catch (error) {
        enqueueSnackbar({
          message: error?.response?.data?.message || error.message || 'Ошибка. Поробуйте еще раз',
          variant: 'error',
        });
      }
    }
  }

  return (
    <>
      <Tooltip title="Назначить награду">
        <IconButton
          aria-label="Назначить награду"
          color="success"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          size="large"
        >
          <CardGiftcardIcon />
        </IconButton>
      </Tooltip>
      <Popper
        anchorEl={anchorEl}
        id={anchorEl ? 'edit' : undefined}
        onClickAway={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        placement="left"
        sx={{
          width: '300px',
        }}
      >
        <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Grid size={12}>
            <Typography component="h2" variant="subtitle1">
              Назначение награды
            </Typography>
          </Grid>
          {slots.top && <Grid size={12}>{slots.top}</Grid>}
          <Grid size={12}>
            <TextField
              autoFocus
              fullWidth
              id="reward-title"
              label="Название"
              onChange={(event) => {
                editRewardData('title', event.currentTarget.value);
              }}
              placeholder="Заголовок"
              size="small"
              value={rewardData.title}
              variant="outlined"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="reward-description"
              label="Описание"
              minRows={2}
              multiline
              onChange={(event) => {
                editRewardData('description', event.currentTarget.value);
              }}
              placeholder="Описание"
              size="small"
              value={rewardData.description}
            />
          </Grid>
          <Grid>
            <Button color="primary" onClick={save} variant="contained">
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Popper>
    </>
  );
};

