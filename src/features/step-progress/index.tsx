/* eslint-disable react-hooks/refs */
import DoneIcon from '@mui/icons-material/Done';
import { Grid, IconButton, Skeleton, TextField, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { type FC, useMemo, useRef, useState } from 'react';

import { Connector, Popper, StepIcon, Stepper } from 'shared/components';
import { decline } from 'shared/utils';

import { useCompleteStep, useGetSteps } from 'entities/api';
import type { TargetId } from 'entities/api/types';

type CompleteStepData = {
  resultComment: string;
};

type StepProgressProps = {
  targetId: TargetId;
};

const StepSkeleton = () => <Skeleton height={40} variant="circular" width={40} />;

export const StepProgress: FC<StepProgressProps> = ({ targetId }) => {
  const theme = useTheme();

  const steps = useGetSteps(targetId);
  const completeStep = useCompleteStep();

  const [completeStepData, setCompleteStepData] = useState<CompleteStepData>({
    resultComment: '',
  });

  const [editedStepEl, setEditedStepEl] = useState<HTMLElement | null>(null);
  const [editableStepId, setEditableStepId] = useState<number | null>(null);

  const uncompletedStepIndex = useMemo(() => {
    return steps.data.findIndex(
      (step) => !step.completedAt && dayjs(step.shouldBeCompletedAt).isSameOrAfter(dayjs(), 'day'),
    );
  }, [steps.data]);

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

  const connectorColors = useMemo(() => {
    return steps.data.reduce<string[]>((acc, step, index, currentSteps) => {
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
  }, [steps, theme]);

  const stepperItems = steps.data.map(
    ({ completedAt, id, shouldBeCompletedAt, title }, stepIndex) => {
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

      const stepLabelSx: { [key: string]: { color: string } | undefined } = {};

      if (isDeadlineSoon || isToday) {
        stepLabelSx['& .MuiSvgIcon-root'] = { color: theme.palette.warning.main };
      }
      if (isOutdated) {
        stepLabelSx['& .MuiSvgIcon-root.Mui-error'] = { color: theme.palette.error.main };
      }

      return {
        id: id.toString(),
        isSelected: editableStepId === id,
        label: title,
        onClick: (event: React.MouseEvent<HTMLDivElement>) => {
          if (uncompletedStepIndex === stepIndex) {
            openEdit(event.currentTarget, id);
          }
        },
        StepIcon: StepIcon,
        stepLabelProps: {
          optional: (
            <Typography sx={{ color: getStatusColor() }} variant="caption">
              {getStatusLabel()}
            </Typography>
          ),
          sx: stepLabelSx,
        },
      };
    },
  );

  const skeletons = useRef([
    {
      id: nanoid(),
      label: '',
      StepIcon: StepSkeleton,
    },
    {
      id: nanoid(),
      label: '',
      StepIcon: StepSkeleton,
    },
    {
      id: nanoid(),
      label: '',
      StepIcon: StepSkeleton,
    },
    {
      id: nanoid(),
      label: '',
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

