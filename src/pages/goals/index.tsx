import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useId } from 'react';
import { useNavigate } from 'react-router';

import { appRoutes, useRouteHandle } from 'app/routing/routes';

import { useGetOwnTargets } from 'entities/api';
import type { Target as TargetType } from 'entities/api/types';

import { ActivateTarget } from 'features/activate-target';
import { CancelTarget } from 'features/cancel-target';
import { CompleteTarget } from 'features/complete-target';
import { DeleteTarget } from 'features/delete-target';

import { Target } from 'widgets/target/target';

import { Skeletons } from './skeletons';

const GoalsPage = () => {
  const routeHandle = useRouteHandle();
  const navigate = useNavigate();
  const id = useId();

  const targets = useGetOwnTargets();

  function getTargets(status: TargetType['status']) {
    return targets.data.filter((target) => target.status === status);
  }

  const activeTargets = getTargets('active');
  const createdTargets = getTargets('created');
  const completedTargets = getTargets('completed');
  const cancelledTargets = getTargets('cancelled');

  const mobileActionSx = {
    borderRadius: 0,
    color: (theme) => theme.palette.common.white,
    pb: '8px',
  } satisfies SxProps<Theme>;

  const firstActionWrapperSx = {
    flex: { laptop: '0 0 auto', mobile: 1 },
    margin: { laptop: 0, mobile: '0 0 -8px -8px' },
  } satisfies SxProps<Theme>;

  const lastActionWrapperSx = {
    flex: { laptop: '0 0 auto', mobile: 1 },
    margin: { laptop: 0, mobile: '0 -8px -8px' },
  } satisfies SxProps<Theme>;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderActions = ({ id, isOutdated, status }: TargetType) => (
    <Stack direction="row" sx={{ width: { laptop: 'auto', mobile: '100%' } }}>
      {status === 'created' && (
        <>
          <Box sx={firstActionWrapperSx}>
            <DeleteTarget
              onSuccess={() => targets.refetch()}
              sx={{ ...mobileActionSx, background: (theme) => theme.palette.error.main }}
              targetId={id}
            />
          </Box>
          <Box sx={lastActionWrapperSx}>
            <ActivateTarget
              onSuccess={() => targets.refetch()}
              sx={{ ...mobileActionSx, background: (theme) => theme.palette.success.main }}
              targetId={id}
            />
          </Box>
        </>
      )}
      {status === 'active' && (
        <>
          <Box sx={firstActionWrapperSx}>
            <CancelTarget
              onSuccess={() => targets.refetch()}
              sx={{ ...mobileActionSx, background: (theme) => theme.palette.warning.main }}
              targetId={id}
            />
          </Box>
          <Box sx={lastActionWrapperSx}>
            <CompleteTarget
              isTargetOutdated={isOutdated}
              onSuccess={() => targets.refetch()}
              sx={{ ...mobileActionSx, background: (theme) => theme.palette.success.main }}
              targetId={id}
            />
          </Box>
        </>
      )}
    </Stack>
  );

  function refetchTargets() {
    targets.refetch();
  }

  return (
    <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid>
        <Typography color="primary" variant="h4">
          {routeHandle?.title}
        </Typography>
        <Typography color="text.primary" variant="body1">
          Планируйте, отслеживайте прогресс и&nbsp;достигайте результатов
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
        {targets.loading ? (
          <Skeletons />
        ) : (
          <>
            {!!activeTargets.length && (
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
                <AccordionDetails sx={{ p: { laptop: 4, mobile: 2 }, pt: 0 }}>
                  <Stack direction="column" spacing={2}>
                    {activeTargets.map((target) => (
                      <Target
                        actions={renderActions(target)}
                        onStepComplete={refetchTargets}
                        target={target}
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )}
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
                <AccordionDetails sx={{ p: { laptop: 4, mobile: 2 }, pt: 0 }}>
                  <Stack direction="column" spacing={2}>
                    {createdTargets.map((target) => (
                      <Target
                        actions={renderActions(target)}
                        onStepComplete={refetchTargets}
                        target={target}
                      />
                    ))}
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
                <AccordionDetails sx={{ p: { laptop: 4, mobile: 2 }, pt: 0 }}>
                  <Stack direction="column" spacing={2}>
                    {completedTargets.map((target) => (
                      <Target
                        onStepComplete={refetchTargets}
                        rewards={target.rewards}
                        target={target}
                      />
                    ))}
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
                <AccordionDetails sx={{ p: { laptop: 4, mobile: 2 }, pt: 0 }}>
                  <Stack direction="column" spacing={2}>
                    {cancelledTargets.map((target) => (
                      <Target onStepComplete={refetchTargets} target={target} />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default GoalsPage;
