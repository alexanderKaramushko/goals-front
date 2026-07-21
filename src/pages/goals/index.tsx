import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useId } from 'react';
import { useNavigate } from 'react-router';

import { appRoutes, useRouteHandle } from 'app/routes';

import { decline } from 'shared/utils';

import { useGetTargets } from 'entities/api';
import type { Target } from 'entities/api/types';

import { ActivateTarget } from 'features/activate-target';
import { CancelTarget } from 'features/cancel-target';
import { DeleteTarget } from 'features/delete-target';
import { StepProgress } from 'features/step-progress';

const GoalsPage = () => {
  const routeHandle = useRouteHandle();
  const navigate = useNavigate();
  const id = useId();

  const targets = useGetTargets();

  function getTargets(status: Target['status']) {
    return targets.data.filter((target) => target.status === status);
  }

  function renderSkeletons() {
    return (
      <Stack direction="column" spacing={2}>
        <Skeleton height={270} sx={{ borderRadius: 4 }} variant="rectangular" width="100%" />
        <Skeleton height={270} sx={{ borderRadius: 4 }} variant="rectangular" width="100%" />
        <Skeleton height={270} sx={{ borderRadius: 4 }} variant="rectangular" width="100%" />
      </Stack>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function renderTarget({ description, id, shouldBeCompletedAt, status, title }: Target) {
    const deadline = dayjs(shouldBeCompletedAt).startOf('day');
    const today = dayjs().startOf('day');
    const daysLeft = deadline.diff(today, 'day');

    const isOutdated = daysLeft < 0;
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
                <Grid>
                  {status === 'created' && (
                    <>
                      <DeleteTarget onSuccess={() => targets.refetch()} targetId={id} />
                      <ActivateTarget onSuccess={() => targets.refetch()} targetId={id} />
                    </>
                  )}
                  {status === 'active' && (
                    <CancelTarget onSuccess={() => targets.refetch()} targetId={id} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid size={12}>
              <StepProgress targetId={id} targetStatus={status} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  const activeTargets = getTargets('active');
  const createdTargets = getTargets('created');
  const completedTargets = getTargets('completed');
  const cancelledTargets = getTargets('cancelled');

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
        <Accordion
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
          sx={{
            borderRadius: 2,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="body1">Выполняются</Typography>
              <Chip label={activeTargets.length} />
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 4, pt: 0 }}>
            <Stack direction="column" spacing={2}>
              {targets.loading ? renderSkeletons() : activeTargets.map(renderTarget)}
            </Stack>
          </AccordionDetails>
        </Accordion>
        {!!createdTargets.length && (
          <Accordion
            aria-controls={`${id}-panel2-content`}
            id={`${id}-panel2-header`}
            sx={{ mt: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="body1">Новые</Typography>
                <Chip label={createdTargets.length} />
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 4, pt: 0 }}>
              <Stack direction="column" spacing={2}>
                {targets.loading ? renderSkeletons() : createdTargets.map(renderTarget)}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}
        {!!completedTargets.length && (
          <Accordion
            aria-controls={`${id}-panel2-content`}
            id={`${id}-panel2-header`}
            sx={{ mt: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="body1">Завершенные</Typography>
                <Chip label={completedTargets.length} />
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 4, pt: 0 }}>
              <Stack direction="column" spacing={2}>
                {targets.loading ? renderSkeletons() : completedTargets.map(renderTarget)}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}
        {!!cancelledTargets.length && (
          <Accordion
            aria-controls={`${id}-panel2-content`}
            id={`${id}-panel2-header`}
            sx={{ mt: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="body1">Отмененные</Typography>
                <Chip label={cancelledTargets.length} />
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 4, pt: 0 }}>
              <Stack direction="column" spacing={2}>
                {targets.loading ? renderSkeletons() : cancelledTargets.map(renderTarget)}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}
      </Grid>
    </Grid>
  );
};

export default GoalsPage;

