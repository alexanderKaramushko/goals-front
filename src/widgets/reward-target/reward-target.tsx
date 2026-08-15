import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { type FC, type PropsWithChildren, type ReactNode } from 'react';

import type { RewardTarget as RewardTargetType } from 'entities/api/types';

import { StepProgress } from 'features/step-progress';

type RewardTargetProps = {
  target: RewardTargetType;
  reward?: ReactNode;
};

export const RewardTarget: FC<PropsWithChildren<RewardTargetProps>> = ({
  children,
  reward,
  target,
}) => {
  const { description, id, status, title } = target;

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
                <Typography
                  component="span"
                  gutterBottom
                  sx={{ margin: 0, position: 'relative' }}
                  variant="h5"
                >
                  {title}
                  {reward && (
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '0',
                        top: '-15px',
                        transform: 'translateX(105%)',
                      }}
                    >
                      {reward}
                    </Box>
                  )}
                </Typography>
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
            <StepProgress readOnly steps={target.steps} targetId={id} targetStatus={status} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

