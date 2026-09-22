import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  useColorScheme,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useId } from 'react';
import { useParams } from 'react-router';

import { useRouteHandle } from 'app/routing/routes';

import { useGetUser, useGetUserTargets } from 'entities/api';
import type { RewardTarget as RewardTargetType } from 'entities/api/types';

import { CreateReward } from 'features/create-reward';

import { RewardTarget } from 'widgets/reward-target/reward-target';

import { Skeletons } from './skeletons';

const UserTargetsPage = () => {
  const routeHandle = useRouteHandle();
  const params = useParams();
  const id = useId();
  const { mode } = useColorScheme();

  const user = useGetUser(params.userId);
  const targets = useGetUserTargets(params.userId);

  function getTargets(status: RewardTargetType['status']) {
    return targets.data.filter((target) => target.status === status);
  }

  const activeTargets = getTargets('active');
  const completedTargets = getTargets('completed');

  const mobileActionSx = {
    background: (theme) => theme.palette.success.main,
    borderRadius: 0,
    color: (theme) => theme.palette.common.white,
    pb: '8px',
  } satisfies SxProps<Theme>;

  const actionWrapperSx = {
    flex: { laptop: '0 0 auto', mobile: 1 },
    margin: { laptop: 0, mobile: '0 -8px -8px' },
  } satisfies SxProps<Theme>;

  return (
    <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid>
        <Typography color="primary" variant="h4">
          {routeHandle?.title?.replace(
            /%{userName}/,
            user.data?.fullName ? `"${user.data?.fullName}"` : '',
          )}
        </Typography>
        <Typography color="text.primary" variant="body1">
          Отслеживайте прогресс по&nbsp;целям пользователя и&nbsp;назначайте награды
        </Typography>
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
                      <RewardTarget key={target.id} target={target} />
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
                      <RewardTarget
                        actions={
                          target.canAssignReward && !target.reward ? (
                            <Stack
                              direction="row"
                              sx={{ width: { laptop: 'auto', mobile: '100%' } }}
                            >
                              <Box sx={actionWrapperSx}>
                                <CreateReward
                                  onSuccess={targets.refetch}
                                  slots={{
                                    top: target.resultComment && (
                                      <Alert
                                        icon={false}
                                        severity="warning"
                                        sx={{
                                          bgcolor: (theme) =>
                                            mode === 'light'
                                              ? 'warning.light'
                                              : theme.palette.grey[800],
                                        }}
                                      >
                                        <Typography variant="subtitle2">
                                          Пожелание пользователя
                                        </Typography>
                                        <Typography sx={{ fontStyle: 'italic' }} variant="body2">
                                          {target.resultComment}
                                        </Typography>
                                      </Alert>
                                    ),
                                  }}
                                  sx={mobileActionSx}
                                  targetId={target.id}
                                />
                              </Box>
                            </Stack>
                          ) : undefined
                        }
                        key={target.id}
                        target={target}
                      />
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

export default UserTargetsPage;
