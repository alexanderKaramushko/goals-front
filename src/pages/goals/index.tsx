import CancelIcon from '@mui/icons-material/Cancel';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { type FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { appRoutes, useRouteHandle } from 'app/routes';

import { Connector, Popper, Stepper } from 'shared/components';
import { goalsServiceApiClient } from 'shared/libs/api-client';
import { decline } from 'shared/utils';

type TargetId = number;
type StepId = number;

type CompleteStepData = {
  resultComment: string;
};

const GoalWithSteps: FC<{
  targetId: number;
}> = ({ targetId }) => {
  const theme = useTheme();

  const stepsResult = useQuery({
    enabled: !!targetId,
    queryFn: () =>
      goalsServiceApiClient.get<
        {
          id: number;
          targetId: number;
          title: string;
          description: string;
          shouldBeCompletedAt: string;
          closedAt: string | null;
          createdAt: string;
          completedAt: string | null;
        }[]
      >(`/steps/get-all/${targetId}`),
    queryKey: ['targets', targetId],
    refetchOnMount: true,
  });

  const completeStepMutation = useMutation({
    mutationFn: (data: { stepId: StepId; resultComment: string }) =>
      goalsServiceApiClient.put(`steps/complete/${data.stepId}`, {
        resultComment: data.resultComment,
      }),
  });

  const [completeStepData, setCompleteStepData] = useState<CompleteStepData>({
    resultComment: '',
  });

  const [editedStepEl, setEditedStepEl] = useState<HTMLElement | null>(null);
  const [editableStepId, setEditableStepId] = useState<StepId | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const steps = stepsResult.isSuccess ? stepsResult.data.data : [];

  const uncompletedStepIndex = useMemo(() => {
    return steps.findIndex(
      (step) => !step.completedAt && dayjs(step.shouldBeCompletedAt).isSameOrAfter(dayjs(), 'day'),
    );
  }, [steps]);

  function openEdit(el: HTMLElement, stepId: StepId) {
    setEditedStepEl(el);
    setEditableStepId(stepId);
  }

  function closeEdit() {
    setEditedStepEl(null);
    setEditableStepId(null);
  }

  function editCompleteStepData<Name extends keyof CompleteStepData>(
    name: Name,
    value: CompleteStepData[Name],
  ) {
    setCompleteStepData((prevTargetData) => ({
      ...prevTargetData,
      [name]: value,
    }));
  }

  async function completeStep(stepId: StepId) {
    try {
      await completeStepMutation.mutateAsync({
        ...completeStepData,
        stepId,
      });

      await stepsResult.refetch();
    } catch {
      // TODO Показывать уведомление
    }
  }

  const connectorColors = useMemo(() => {
    return steps.reduce<string[]>((acc, step, index, currentSteps) => {
      const isCurrentStepCompleted = !!step.completedAt;
      const prevStep = currentSteps[index - 1];
      const isPrevStepCompleted = !!prevStep?.completedAt;

      if (isCurrentStepCompleted && isPrevStepCompleted) {
        return [...acc, theme.palette.success.light];
      }

      if (prevStep) {
        const startDate = dayjs(prevStep.shouldBeCompletedAt).startOf('day');
        const endDate = dayjs(step.shouldBeCompletedAt).startOf('day');

        const daysLeft = endDate.diff(startDate, 'day');
        const daysFromStart = dayjs().startOf('day').diff(startDate, 'day');

        if (daysFromStart < 0) {
          return [...acc, theme.palette.grey[400]];
        }

        const daysPassed = ((daysFromStart || 1) / (daysLeft || 1)) * 100;

        return [
          ...acc,
          `linear-gradient(to right, ${theme.palette.info.main} ${daysPassed}%, ${theme.palette.grey[400]} ${daysPassed}%);`,
        ];
      }

      return acc;
    }, []);
  }, [steps, theme]);

  const stepperItems = steps.map(({ completedAt, id, shouldBeCompletedAt, title }, stepIndex) => {
    const deadline = dayjs(shouldBeCompletedAt).startOf('day');
    const today = dayjs().startOf('day');
    const daysLeft = deadline.diff(today, 'day');

    const isOutdated = daysLeft < 0;
    const isToday = daysLeft === 0;
    const isDeadlineSoon = daysLeft === 1;

    const getStatusLabel = () => {
      if (completedAt && dayjs(completedAt).isValid()) {
        return `Завершен: ${dayjs(completedAt).format('DD-MM-YYYY')}`;
      }
      if (!dayjs(shouldBeCompletedAt).isValid()) return null;
      if (isOutdated) return 'Просрочено';
      if (isToday) return 'Ожидает завершения';
      if (isDeadlineSoon) return 'Остался 1 день';

      const verb = decline(daysLeft, ['Осталось', 'Остался', 'Осталось']);
      const days = decline(daysLeft, ['дней', 'день', 'дня']);

      return `${verb} ${daysLeft} ${days}`;
    };

    const getStatusColor = () => {
      if (completedAt) return 'text.secondary';
      if (isOutdated) return theme.palette.error.main;
      if (isToday || isDeadlineSoon) return theme.palette.warning.main;

      return 'text.secondary';
    };

    return {
      id: id.toString(),
      isSelected: editableStepId === id,
      label: title,
      onClick: (event: React.MouseEvent<HTMLElement>) =>
        uncompletedStepIndex === stepIndex && openEdit(event.currentTarget, id),
      stepLabelProps: {
        optional: (
          <Typography sx={{ color: getStatusColor() }} variant="caption">
            {getStatusLabel()}
          </Typography>
        ),
        sx: {
          '& .MuiSvgIcon-root': (isDeadlineSoon || isToday) && {
            color: theme.palette.warning.main,
          },
          '& .MuiSvgIcon-root.Mui-error': isOutdated && {
            color: theme.palette.error.main,
          },
        },
      },
    };
  });

  return (
    <>
      <Stepper
        activeStep={uncompletedStepIndex}
        connector={<Connector colors={connectorColors} />}
        items={stepperItems}
        sx={{ mt: 2 }}
      />
      <Popper
        anchorEl={editedStepEl}
        id={editedStepEl ? 'edit' : undefined}
        onClickAway={closeEdit}
        open={Boolean(editedStepEl)}
        placement="top"
        sx={{
          width: '300px',
        }}
      >
        <Grid container spacing={1}>
          <Grid sx={{ flex: 1 }}>
            <TextField
              autoFocus
              fullWidth
              id="step-title"
              label="Что сделано"
              onChange={(event) => {
                editCompleteStepData('resultComment', event.currentTarget.value);
              }}
              placeholder="Сдал теорию"
              size="small"
              value={completeStepData.resultComment}
              variant="outlined"
            />
          </Grid>
          <Grid>
            <IconButton
              aria-label="Завершить шаг"
              color="success"
              onClick={async () => {
                if (completeStepData.resultComment) {
                  await completeStep(editableStepId);
                  closeEdit();
                }
              }}
            >
              <DoneIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Popper>
    </>
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

  const activateTargetMutation = useMutation({
    mutationFn: (data: { targetId: TargetId }) =>
      goalsServiceApiClient.put(`targets/activate/${data.targetId}`),
  });

  const deleteTargetMutation = useMutation({
    mutationFn: (data: { targetId: TargetId }) =>
      goalsServiceApiClient.delete(`targets/delete/${data.targetId}`),
  });

  const cancelTargetMutation = useMutation({
    mutationFn: (data: { targetId: TargetId }) =>
      goalsServiceApiClient.post(`targets/cancel/${data.targetId}`),
  });

  async function activateTarget(targetId: TargetId) {
    try {
      await activateTargetMutation.mutateAsync({ targetId });
      await goalsResult.refetch();
    } catch {
      // TODO Показывать уведомление
    }
  }

  async function deleteTarget(targetId: TargetId) {
    try {
      await deleteTargetMutation.mutateAsync({ targetId });
      await goalsResult.refetch();
    } catch {
      // TODO Показывать уведомление
    }
  }

  async function cancelTarget(targetId: TargetId) {
    try {
      await cancelTargetMutation.mutateAsync({ targetId });
      await goalsResult.refetch();
    } catch {
      // TODO Показывать уведомление
    }
  }

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
        {goals.map(({ description, id, shouldBeCompletedAt, status, title }) => {
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
                mt: 2,
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
                            <Tooltip title="Удалить цель">
                              <IconButton
                                aria-label="Удалить цель"
                                color="error"
                                onClick={() => deleteTarget(id)}
                                size="large"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Активировать цель">
                              <IconButton
                                aria-label="Активировать цель"
                                color="success"
                                onClick={() => activateTarget(id)}
                                size="large"
                              >
                                <PlayCircleFilledIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        {status === 'active' && (
                          <Tooltip title="Отменить цель">
                            <IconButton
                              aria-label="Отменить цель"
                              color="warning"
                              onClick={() => cancelTarget(id)}
                              size="large"
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    <GoalWithSteps targetId={id} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default GoalsPage;

