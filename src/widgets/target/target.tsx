/* eslint-disable @typescript-eslint/no-shadow */
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { type FC, type PropsWithChildren, useState } from 'react';

import { Popper } from 'shared/components';
import { decline } from 'shared/utils';

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
};

export const Target: FC<PropsWithChildren<TargetProps>> = ({
  children,
  onStepComplete,
  rewards = [],
  target,
}) => {
  const { description, id, isOutdated, shouldBeCompletedAt, status, title } = target;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const deadline = dayjs(shouldBeCompletedAt).startOf('day');
  const today = dayjs().startOf('day');
  const daysLeft = deadline.diff(today, 'day');

  const isToday = daysLeft === 0;
  const isActive = status === 'active';

  const getStatusText = () => {
    if (!isActive) return `${dayjs(shouldBeCompletedAt).format('DD-MM-YYYY')}`;
    if (isOutdated) return 'просрочено';
    if (isToday) return 'сегодня';

    const verb = decline(daysLeft, ['осталось', 'остался', 'осталось']);
    const days = decline(daysLeft, ['дней', 'день', 'дня']);

    return `${verb} ${daysLeft} ${days}`;
  };

  const getStatusColor = () => {
    if (!isActive) return 'text.secondary';
    if (isOutdated) return 'error.main';
    if (isToday || daysLeft === 1) return 'warning.dark';

    return 'text.secondary';
  };

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
                <Grid>
                  <Typography
                    component="span"
                    gutterBottom
                    sx={{ margin: 0, position: 'relative' }}
                    variant="h5"
                  >
                    {title}
                    {!!rewards.length && (
                      <Box
                        sx={{
                          position: 'absolute',
                          right: '0',
                          top: '-15px',
                          transform: 'translateX(100%)',
                        }}
                      >
                        <Tooltip placement="top" title="Ваши награды">
                          <Badge
                            badgeContent={rewards.length}
                            color="secondary"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            sx={{ cursor: 'pointer' }}
                          >
                            <WorkspacePremiumIcon
                              sx={{ fill: (theme) => theme.palette.warning.main }}
                            />
                          </Badge>
                        </Tooltip>
                      </Box>
                    )}
                  </Typography>
                  {['active', 'created'].includes(status) && (
                    <Typography
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}
                      variant="caption"
                    >
                      Дедлайн:{' '}
                      <Box component="span" sx={{ color: getStatusColor(), fontWeight: 500 }}>
                        {getStatusText()}
                      </Box>
                    </Typography>
                  )}
                  <Box sx={{ mt: 1.5 }}>
                    <Typography sx={{ color: 'text.secondary' }} variant="body2">
                      {description}
                    </Typography>
                  </Box>
                </Grid>
                <Grid>{children}</Grid>
              </Grid>
            </Grid>
            <Grid size={12}>
              <StepProgress
                onStepComplete={onStepComplete}
                steps={target.steps}
                targetId={id}
                targetStatus={status}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* {!!rewards.length && ( */}
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
        <List disablePadding>
          {rewards.map(({ description, title }) => (
            <>
              <ListItem disableGutters key={title}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#FDF2E2' }}>
                    <CardGiftcardIcon sx={{ fill: (theme) => theme.palette.warning.main }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={title} secondary={description} />
              </ListItem>
              <Divider component="li" variant="inset" />
            </>
          ))}
        </List>
      </Popper>
      {/* )} */}
    </>
  );
};

