import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useColorScheme,
} from '@mui/material';
import { useId } from 'react';
import { useParams } from 'react-router';

import { useRouteHandle } from 'app/routing/routes';

import { useGetUser, useGetUserTargets } from 'entities/api';
import type { Target as TargetType } from 'entities/api/types';

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

  function getTargets(status: TargetType['status']) {
    return targets.data.filter((target) => target.status === status);
  }

  const activeTargets = getTargets('active');
  const completedTargets = getTargets('completed');

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
          Отслеживайте прогресс по целям пользователя и назначайте награды
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
                <AccordionDetails sx={{ p: 4, pt: 0 }}>
                  <Stack direction="column" spacing={2}>
                    {activeTargets.map((target) => (
                      <RewardTarget target={target} />
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
                <AccordionDetails sx={{ p: 4, pt: 0 }}>
                  <Stack direction="column" spacing={2}>
                    {completedTargets.map((target) => (
                      <RewardTarget
                        reward={
                          target.reward && (
                            <Tooltip placement="top" title={target.reward.title}>
                              <Chip
                                avatar={
                                  <WorkspacePremiumIcon
                                    sx={{ fill: (theme) => theme.palette.warning.main }}
                                  />
                                }
                                label={target.reward.title}
                                size="small"
                                sx={{ cursor: 'pointer', maxWidth: '150px' }}
                              />
                            </Tooltip>
                          )
                        }
                        target={target}
                      >
                        {target.canAssignReward && !target.reward && (
                          <CreateReward
                            onSuccess={targets.refetch}
                            slots={{
                              top: target.resultComment && (
                                <Alert
                                  icon={false}
                                  severity="warning"
                                  sx={{
                                    bgcolor: (theme) =>
                                      mode === 'light' ? 'warning.light' : theme.palette.grey[800],
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
                            targetId={target.id}
                          />
                        )}
                      </RewardTarget>
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

