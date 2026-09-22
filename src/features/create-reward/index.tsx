import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { type FC, type ReactNode, useState } from 'react';

import { Popper, SwipeableDrawer, Tooltip } from 'shared/components';
import { getErrorMessage, useAdaptive } from 'shared/utils';

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
  sx?: SxProps<Theme>;
};

export const CreateReward: FC<CreateRewardProps> = ({ onSuccess, slots, sx, targetId }) => {
  const createReward = useCreateReward();
  const { enqueueSnackbar } = useSnackbar();

  const [rewardData, setRewardData] = useState<RewardData>({
    description: '',
    title: '',
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { isMobile } = useAdaptive();
  const drawerTitleId = `target-${targetId}-create-reward-title`;

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

        setAnchorEl(null);
        onSuccess?.();
      } catch (error) {
        enqueueSnackbar({
          message: getErrorMessage(error),
          variant: 'error',
        });
      }
    }
  }

  const form = (
    <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
      {slots?.top && <Grid size={12}>{slots.top}</Grid>}
      <Grid size={12}>
        <TextField
          autoFocus={Boolean(anchorEl)}
          fullWidth
          id={`target-${targetId}-reward-title`}
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
          id={`target-${targetId}-reward-description`}
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
      <Grid size={{ laptop: 'auto', mobile: 12 }} sx={{ mt: { laptop: 0, mobile: 2 } }}>
        <Button color="primary" fullWidth={isMobile} onClick={save} variant="contained">
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Tooltip title="Назначить награду">
        {isMobile ? (
          <Button
            aria-label="Назначить награду"
            color="success"
            fullWidth
            onClick={(event) => setAnchorEl(event.currentTarget)}
            size="large"
            sx={sx}
          >
            <CardGiftcardIcon />
          </Button>
        ) : (
          <IconButton
            aria-label="Назначить награду"
            color="success"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            size="large"
          >
            <CardGiftcardIcon />
          </IconButton>
        )}
      </Tooltip>
      {isMobile ? (
        <SwipeableDrawer
          onClose={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
          title="Назначение награды"
          titleId={drawerTitleId}
        >
          {form}
        </SwipeableDrawer>
      ) : (
        <Popper
          anchorEl={anchorEl}
          id={anchorEl ? 'edit' : undefined}
          onClickAway={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
          placement="left"
          sx={{ width: '300px' }}
        >
          <Typography component="h2" id={drawerTitleId} sx={{ mb: 2 }} variant="subtitle1">
            Назначение награды
          </Typography>
          {form}
        </Popper>
      )}
    </>
  );
};
