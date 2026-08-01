import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { type FC, type PropsWithChildren } from 'react';

import { decline } from 'shared/utils';

import type { Target as TargetType } from 'entities/api/types';

import { StepProgress } from 'features/step-progress';

type TargetProps = {
  target: TargetType;
};

export const Target: FC<PropsWithChildren<TargetProps>> = ({ children, target }) => {
  const { description, id, isOutdated, shouldBeCompletedAt, status, title } = target;

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
    if (isToday || daysLeft === 1) return 'warning.main';

    return 'text.secondary';
  };

  return (
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
                <Typography component="div" gutterBottom sx={{ margin: 0 }} variant="h5">
                  {title}
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
            <StepProgress targetId={id} targetStatus={status} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

