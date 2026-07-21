/* eslint-disable react-hooks/refs */
import DoneIcon from '@mui/icons-material/Done';
import { Grid, IconButton, Skeleton, TextField, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { type FC, useMemo, useRef, useState } from 'react';

import { Connector, Popper, StepIcon, Stepper } from 'shared/components';
import { decline } from 'shared/utils';

import { useCompleteStep, useGetSteps } from 'entities/api';
import type { Target, TargetId } from 'entities/api/types';

type CompleteStepData = {
  resultComment: string;
};

type StepProgressProps = {
  targetId: TargetId;
  targetStatus?: Target['status'];
};

const StepSkeleton = () => <Skeleton height={40} variant="circular" width={40} />;

export const StepProgress: FC<StepProgressProps> = ({ targetId, targetStatus }) => {
  const theme = useTheme();

  const steps = useGetSteps(targetId);
  const completeStep = useCompleteStep();

  const [completeStepData, setCompleteStepData] = useState<CompleteStepData>({
    resultComment: '',
  });

  const [editedStepEl, setEditedStepEl] = useState<HTMLElement | null>(null);
  const [editableStepId, setEditableStepId] = useState<number | null>(null);

  const uncompletedStepIndex = useMemo(() => {
    const completedIndex = steps.data.findLastIndex((step) => !!step.completedAt);

    return ['created', 'completed'].includes(targetStatus)
      ? -1
      : // Считаем, что за последним завершенным шагом
        // может быть либо незавершенный шаг, либо пустота
        completedIndex + 1;
  }, [steps.data, targetStatus]);

  function openEdit(el: HTMLElement, stepId: number) {
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

  async function handleCompleteStep(stepId: number) {
    await completeStep.invoke({
      ...completeStepData,
      stepId,
    });

    await steps.refetch();
  }

  const isTargetActive = targetStatus === 'active';

  const connectorColors = useMemo(() => {
    return steps.data.reduce<string[]>((acc, step, index, currentSteps) => {
      if (!isTargetActive) {
        return [...acc, theme.palette.grey[400]];
      }

      const isCurrentStepCompleted = !!step.completedAt;
      const prevStep = currentSteps[index - 1];
      const isPrevStepCompleted = !!prevStep?.completedAt;

      if (isCurrentStepCompleted && isPrevStepCompleted) {
        return [...acc, theme.palette.success.light];
      }

      if (prevStep) {
        const startDate = dayjs(prevStep.completedAt || prevStep.shouldBeCompletedAt).startOf(
          'day',
        );
        const endDate = dayjs(step.shouldBeCompletedAt).startOf('day');

        const daysLeft = endDate.diff(startDate, 'day');
        const daysFromStart = dayjs().startOf('day').diff(startDate, 'day');

        if (daysFromStart < 0) {
          return [...acc, theme.palette.grey[400]];
        }

        const daysPassed = ((daysFromStart || 1) / (daysLeft || 1)) * 100;

        return [
          ...acc,
          `linear-gradient(to right, ${theme.palette.primary.main} ${daysPassed}%, ${theme.palette.grey[400]} ${daysPassed}%);`,
        ];
      }

      return acc;
    }, []);
  }, [steps, theme, isTargetActive]);

  const stepperItems = steps.data.map(
    ({ completedAt, id, shouldBeCompletedAt, title }, stepIndex) => {
      const deadline = dayjs(shouldBeCompletedAt).startOf('day');
      const today = dayjs().startOf('day');
      const daysLeft = deadline.diff(today, 'day');

      const isOutdated = daysLeft < 0;
      const isToday = daysLeft === 0;
      const isDeadlineSoon = daysLeft === 1;

      const isCompleted = completedAt && dayjs(completedAt).isValid();
      const isActive = uncompletedStepIndex === stepIndex;

      const getStatusLabel = () => {
        if (!isTargetActive) return `Срок: ${dayjs(shouldBeCompletedAt).format('DD-MM-YYYY')}`;
        if (isCompleted) {
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

      const getStepLabelColor = () => {
        if (!isTargetActive) return 'text.secondary';
        if (isCompleted || !isTargetActive) return theme.palette.grey[400];
        if (isDeadlineSoon || isToday) return 'warning.main';
        if (isOutdated) return 'error.main';
        if (isActive) return 'text.primary';

        return theme.palette.grey[400];
      };

      const getStatusColor = () => {
        if (!isTargetActive) return 'text.secondary';
        if (isCompleted) return theme.palette.grey[400];
        if (isDeadlineSoon || isToday) return 'warning.main';
        if (isOutdated) return 'error.main';
        if (isActive) return 'text.primary';

        return theme.palette.grey[400];
      };

      const getStepIconColor = () => {
        if (!isTargetActive) return 'text.secondary';
        if (isCompleted) return 'success.main';
        if (isToday || isDeadlineSoon) return 'warning.main';
        if (isOutdated) return 'error.main';
        if (isActive) return 'primary.main';

        return theme.palette.grey[400];
      };

      return {
        id: id.toString(),
        isSelected: editableStepId === id,
        label: title,
        onClick: (event: React.MouseEvent<HTMLDivElement>) => {
          if (isActive) {
            openEdit(event.currentTarget, id);
          }
        },
        StepIcon: StepIcon,
        stepIconProps: {
          isCompleted,
        },
        stepLabelProps: {
          optional: (
            <Typography sx={{ color: getStatusColor() }} variant="caption">
              {getStatusLabel()}
            </Typography>
          ),
          sx: {
            '& .MuiStepLabel-label': { color: getStepLabelColor() },
            '& .MuiSvgIcon-root': { color: getStepIconColor() },
          },
        },
      };
    },
  );

  const skeletons = useRef([
    {
      id: nanoid(),
      label: (
        <Skeleton height={20} sx={{ display: 'inline-block' }} variant="rectangular" width={80} />
      ),
      StepIcon: StepSkeleton,
    },
    {
      id: nanoid(),
      label: (
        <Skeleton height={20} sx={{ display: 'inline-block' }} variant="rectangular" width={80} />
      ),
      StepIcon: StepSkeleton,
    },
    {
      id: nanoid(),
      label: (
        <Skeleton height={20} sx={{ display: 'inline-block' }} variant="rectangular" width={80} />
      ),
      StepIcon: StepSkeleton,
    },
    {
      id: nanoid(),
      label: (
        <Skeleton height={20} sx={{ display: 'inline-block' }} variant="rectangular" width={80} />
      ),
      StepIcon: StepSkeleton,
    },
  ]);

  const skeletonsDividerColors = useRef(
    Array.from<string>({ length: skeletons.current.length }).fill(theme.palette.grey['200']),
  );

  return (
    <>
      <Stepper
        activeStep={uncompletedStepIndex}
        connector={
          <Connector colors={steps.loading ? skeletonsDividerColors.current : connectorColors} />
        }
        items={steps.loading ? skeletons.current : stepperItems}
        sx={{ mt: 2, ...(steps.loading && { overflow: 'hidden' }) }}
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
                if (completeStepData.resultComment && editableStepId !== null) {
                  await handleCompleteStep(editableStepId);
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

