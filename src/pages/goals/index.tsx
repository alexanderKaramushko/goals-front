import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, Button, Card, CardContent, Grid, Skeleton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

import { appRoutes, useRouteHandle } from 'app/routes';

import { decline } from 'shared/utils';

import { useGetTargets } from 'entities/api';

import { ActivateTarget } from 'features/activate-target';
import { CancelTarget } from 'features/cancel-target';
import { DeleteTarget } from 'features/delete-target';
import { StepProgress } from 'features/step-progress';

const GoalsPage = () => {
  const routeHandle = useRouteHandle();
  const navigate = useNavigate();

  const targets = useGetTargets();

  return (
    <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid>
        <Typography color="primary" variant="h4">
          {routeHandle?.title}
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
        <Stack direction="column" spacing={2}>
          {targets.loading ? (
            <>
              <Skeleton height={270} sx={{ borderRadius: 4 }} variant="rectangular" width="100%" />
              <Skeleton height={270} sx={{ borderRadius: 4 }} variant="rectangular" width="100%" />
              <Skeleton height={270} sx={{ borderRadius: 4 }} variant="rectangular" width="100%" />
            </>
          ) : (
            <>
              {targets.data.map(({ description, id, shouldBeCompletedAt, status, title }) => {
                const deadline = dayjs(shouldBeCompletedAt).startOf('day');
                const today = dayjs().startOf('day');
                const daysLeft = deadline.diff(today, 'day');

                const isOutdated = daysLeft < 0;
                const isToday = daysLeft === 0;

                const getStatusText = () => {
                  if (isOutdated) return 'просрочено';
                  if (isToday) return 'сегодня';

                  const verb = decline(daysLeft, ['осталось', 'остался', 'осталось']);
                  const days = decline(daysLeft, ['дней', 'день', 'дня']);

                  return `${verb} ${daysLeft} ${days}`;
                };

                const getStatusColor = () => {
                  if (isOutdated) return 'error.main';
                  if (isToday || daysLeft === 1) return 'warning.main';

                  return 'text.secondary';
                };

                return (
                  <Card
                    key={id}
                    sx={{
                      borderRadius: 4,
                      boxShadow: 2,
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid size={12}>
                          <Grid
                            container
                            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
                          >
                            <Grid>
                              <Typography
                                component="div"
                                gutterBottom
                                sx={{ margin: 0 }}
                                variant="h5"
                              >
                                {title}
                              </Typography>
                              {['active', 'created'].includes(status) && (
                                <Typography
                                  sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}
                                  variant="caption"
                                >
                                  Дедлайн:{' '}
                                  <Box
                                    component="span"
                                    sx={{ color: getStatusColor(), fontWeight: 500 }}
                                  >
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
                            <Grid>
                              {status === 'created' && (
                                <>
                                  <DeleteTarget onSuccess={() => targets.refetch()} targetId={id} />
                                  <ActivateTarget
                                    onSuccess={() => targets.refetch()}
                                    targetId={id}
                                  />
                                </>
                              )}
                              {status === 'active' && (
                                <CancelTarget onSuccess={() => targets.refetch()} targetId={id} />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid size={12}>
                          <StepProgress targetId={id} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default GoalsPage;

