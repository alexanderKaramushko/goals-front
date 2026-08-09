import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { type FC, type PropsWithChildren } from 'react';

import type { RewardTarget as RewardTargetType } from 'entities/api/types';

import { StepProgress } from 'features/step-progress';

type RewardTargetProps = {
  target: RewardTargetType;
};

export const RewardTarget: FC<PropsWithChildren<RewardTargetProps>> = ({ children, target }) => {
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
                <Typography component="div" gutterBottom sx={{ margin: 0 }} variant="h5">
                  {title}
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

