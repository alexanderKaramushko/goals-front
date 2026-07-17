import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

import { appRoutes, useRouteHandle } from 'app/routes';

import { Connector, Stepper } from 'shared/components';
import { goalsServiceApiClient } from 'shared/libs/api-client';

const GoalWithSteps: FC<{ targetId: number }> = ({ targetId }) => {
  const stepsResult = useQuery({
    queryFn: () =>
      goalsServiceApiClient.get<
        {
          id: number;
          targetId: number;
          title: string;
          description: string;
          shouldBeCompletedAt: string;
          closed_at: string | null;
          created_at: string;
          completed_at: string | null;
        }[]
      >(`/steps/get-all/${targetId}`),
    queryKey: ['targets', targetId],
    refetchOnMount: true,
  });

  const steps = stepsResult.isSuccess ? stepsResult.data.data : [];

  return (
    <Stepper
      connector={<Connector />}
      items={steps.map(({ closed_at, completed_at, id, shouldBeCompletedAt, title }) => ({
        id: id.toString(),
        isComplete: !!closed_at || !!completed_at,
        label: title,
        stepLabelProps: {
          optional: dayjs(shouldBeCompletedAt, 'YYYY-MM-DD').isValid() && (
            <Typography variant="caption">
              Срок: {dayjs(shouldBeCompletedAt, 'YYYY-MM-DD').format('DD-MM-YYYY')}
            </Typography>
          ),
        },
      }))}
      sx={{ mt: 2 }}
    />
  );
};

const GoalsPage = () => {
  const routeHandle = useRouteHandle();
  const navigate = useNavigate();

  const goalsResult = useQuery({
    queryFn: () =>
      goalsServiceApiClient.get<
        {
          description: string;
          id: number;
          isOutdated: boolean;
          shouldBeCompletedAt: string;
          status: string;
          title: string;
          userId: string;
        }[]
      >('/targets/get-all/108266036103493388680'),
    queryKey: ['targets', '108266036103493388680'],
    refetchOnMount: true,
  });

  const goals = goalsResult.isSuccess ? goalsResult.data.data : [];

  return (
    <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid>
        <Typography color="primary" variant="h4">
          {routeHandle.title}
        </Typography>
        <Typography color="text.primary" variant="body1">
          Планируйте, отслеживайте прогресс и достигайте результатов
        </Typography>
      </Grid>
      <Grid>
        <Button
          onClick={() => navigate(appRoutes.createGoal.path)}
          startIcon={<ControlPointIcon />}
          variant="contained"
        >
          Создать цель
        </Button>
      </Grid>
      <Grid size={12}>
        {goals.map(({ description, id, title }) => (
          <Card sx={{ borderRadius: 4, boxShadow: 2, mt: 2 }}>
            <CardContent>
              <Typography component="div" gutterBottom variant="h5">
                {title}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }} variant="body2">
                {description}
              </Typography>
              <GoalWithSteps key={id} targetId={id} />
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default GoalsPage;

