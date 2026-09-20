import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SwipeableDrawer,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { type FC, Fragment, type ReactNode, useState } from 'react';

import { Popper } from 'shared/components';
import { decline, useAdaptive } from 'shared/utils';

import type { Target as TargetType } from 'entities/api/types';

import { StepProgress } from 'features/step-progress';

type Reward = {
  title: string;
  description: string;
};

type TargetProps = {
  target: TargetType;
  onStepComplete: () => void;
  rewards?: Reward[];
  actions?: ReactNode;
};

export const Target: FC<TargetProps> = ({ actions, onStepComplete, rewards = [], target }) => {
  const { description, id, isOutdated, shouldBeCompletedAt, status, title } = target;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const deadline = dayjs(shouldBeCompletedAt).startOf('day');
  const today = dayjs().startOf('day');
  const daysLeft = deadline.diff(today, 'day');

  const isToday = daysLeft === 0;
  const isActive = status === 'active';
  const rewardsDrawerTitleId = `target-${id}-rewards-title`;

  const { isMobile } = useAdaptive();

  const getStatusText = () => {
    if (!isActive) return `${dayjs(shouldBeCompletedAt).format('DD-MM-YYYY')}`;
    if (isOutdated) return 'просрочено';
    if (isToday) return 'сегодня';

    const verb = decline(daysLeft, ['осталось', 'остался', 'осталось']);
    const days = decline(daysLeft, ['дней', 'день', 'дня']);

    return `${verb}\u00A0${daysLeft}\u00A0${days}`;
  };

  const getStatusColor = () => {
    if (!isActive) return 'text.secondary';
    if (isOutdated) return 'error.main';
    if (isToday || daysLeft === 1) return 'warning.dark';

    return 'text.secondary';
  };

  const rewardsList = (
    <List disablePadding>
      {rewards.map(({ description: rewardDescription, title: rewardTitle }, index) => (
        <Fragment key={`${rewardTitle}-${index}`}>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#FDF2E2' }}>
                <CardGiftcardIcon sx={{ fill: (theme) => theme.palette.warning.main }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={rewardTitle} secondary={rewardDescription} />
          </ListItem>
          {index !== rewards.length - 1 && <Divider component="li" variant="fullWidth" />}
        </Fragment>
      ))}
    </List>
  );

  return (
    <>
      <Card
        key={id}
        sx={{
          borderRadius: 4,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Grid container sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Grid sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      alignItems: 'flex-start',
                      display: 'flex',
                      maxWidth: '100%',
                      width: 'fit-content',
                    }}
                  >
                    <Typography
                      component="h3"
                      gutterBottom
                      noWrap
                      sx={{
                        margin: 0,
                        minWidth: 0,
                      }}
                      variant={isMobile ? 'h6' : 'h5'}
                    >
                      {title}
                    </Typography>
                    {!!rewards.length && (
                      <Tooltip placement="top" title="Ваши награды">
                        <Badge
                          badgeContent={rewards.length}
                          color="secondary"
                          onClick={(event) => setAnchorEl(event.currentTarget)}
                          sx={{ cursor: 'pointer', flexShrink: 0, ml: 0.5, mr: 1, mt: '-5px' }}
                        >
                          <WorkspacePremiumIcon
                            sx={{ fill: (theme) => theme.palette.warning.main }}
                          />
                        </Badge>
                      </Tooltip>
                    )}
                  </Box>
                  {['active', 'created'].includes(status) && (
                    <Typography
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}
                      variant="caption"
                    >
                      Дедлайн:&nbsp;
                      <Box component="span" sx={{ color: getStatusColor(), fontWeight: 500 }}>
                        {getStatusText()}
                      </Box>
                    </Typography>
                  )}
                  <Box sx={{ mt: ['active', 'created'].includes(status) ? 1.5 : 0 }}>
                    <Typography sx={{ color: 'text.secondary' }} variant="body2">
                      {description}
                    </Typography>
                  </Box>
                </Grid>
                {!isMobile && actions && <Grid>{actions}</Grid>}
              </Grid>
            </Grid>
            {!!target.steps.length && (
              <Grid size={12}>
                <StepProgress
                  onStepComplete={onStepComplete}
                  steps={target.steps}
                  targetId={id}
                  targetStatus={status}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
        {isMobile && actions && <CardActions disableSpacing>{actions}</CardActions>}
      </Card>
      {!!rewards.length &&
        (isMobile ? (
          <SwipeableDrawer
            anchor="bottom"
            onClose={() => setAnchorEl(null)}
            onOpen={() => {}}
            open={Boolean(anchorEl)}
            slotProps={{
              paper: {
                'aria-labelledby': rewardsDrawerTitleId,
                sx: {
                  borderRadius: '16px 16px 0 0',
                  maxHeight: '80dvh',
                  overflowY: 'auto',
                  pb: 'max(16px, env(safe-area-inset-bottom))',
                  pt: 1,
                  px: 2,
                },
              },
            }}
          >
            <Box
              aria-hidden
              sx={{
                alignItems: 'center',
                display: 'flex',
                height: 40,
                justifyContent: 'center',
                mt: -1,
              }}
            >
              <Box sx={{ bgcolor: 'divider', borderRadius: 2, height: 4, width: 36 }} />
            </Box>
            <Typography component="h2" id={rewardsDrawerTitleId} variant="h6">
              Награды
            </Typography>
            {rewardsList}
          </SwipeableDrawer>
        ) : (
          <Popper
            anchorEl={anchorEl}
            id={anchorEl ? 'edit' : undefined}
            onClickAway={() => setAnchorEl(null)}
            open={Boolean(anchorEl)}
            placement="right"
            sx={{
              width: '300px',
            }}
          >
            {rewardsList}
          </Popper>
        ))}
    </>
  );
};
