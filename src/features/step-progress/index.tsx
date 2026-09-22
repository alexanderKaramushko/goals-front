import DoneIcon from '@mui/icons-material/Done';
import { Button, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { type FC, useMemo, useState } from 'react';

import { Connector, Popper, StepIcon, Stepper, SwipeableDrawer } from 'shared/components';
import { decline, getErrorMessage, useAdaptive } from 'shared/utils';

import { useCompleteStep } from 'entities/api';
import type { Target, TargetId } from 'entities/api/types';

type CompleteStepData = {
  resultComment: string;
};

type StepProgressProps = {
  targetId: TargetId;
  targetStatus?: Target['status'];
  steps?: Target['steps'];
  onStepComplete?: () => void;
  readOnly?: boolean;
};

export const StepProgress: FC<StepProgressProps> = ({
  onStepComplete,
  readOnly,
  steps = [],
  targetStatus,
}) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { isMobile } = useAdaptive();

  // TODO возвращать с бэка поле createdAt и сортировать по нему
  const sortedSteps = [...steps].sort((stepA, stepB) =>
    dayjs(stepA.shouldBeCompletedAt).diff(stepB.shouldBeCompletedAt),
  );

  const completeStep = useCompleteStep();

  const [completeStepData, setCompleteStepData] = useState<CompleteStepData>({
    resultComment: '',
  });

  const [editedStepEl, setEditedStepEl] = useState<HTMLElement | null>(null);
  const [editableStepId, setEditableStepId] = useState<number | null>(null);

  const uncompletedStepIndex = useMemo(() => {
    const completedIndex = sortedSteps.findLastIndex((step) => {
      const deadline = dayjs(step.shouldBeCompletedAt).startOf('day');
      const today = dayjs().startOf('day');
      const daysLeft = deadline.diff(today, 'day');

      const isOutdated = daysLeft < 0;

      return isOutdated || !!step.completedAt;
    });

    return targetStatus !== 'active' || readOnly
      ? -1
      : // Считаем, что за последним завершенным шагом
        // может быть либо незавершенный шаг, либо пустота
        completedIndex + 1;
  }, [sortedSteps, targetStatus, readOnly]);

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
    try {
      await completeStep.invoke({
        ...completeStepData,
        stepId,
      });

      onStepComplete?.();
    } catch (error) {
      enqueueSnackbar({
        message: getErrorMessage(error),
        variant: 'error',
      });
    }
  }

  async function saveCompleteStep() {
    if (completeStepData.resultComment && editableStepId !== null) {
      await handleCompleteStep(editableStepId);
      closeEdit();
    }
  }

  const isTargetActive = targetStatus === 'active';
  const drawerTitleId = `step-${editableStepId ?? 'unknown'}-complete-title`;

  const connectorColors = useMemo(() => {
    return sortedSteps.reduce<string[]>((acc, step, index, currentSteps) => {
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
  }, [sortedSteps, theme, isTargetActive]);

  const stepperItems = sortedSteps.map(
    ({ completedAt, id, shouldBeCompletedAt, title }, stepIndex) => {
      const deadline = dayjs(shouldBeCompletedAt).startOf('day');
      const today = dayjs().startOf('day');
      const daysLeft = deadline.diff(today, 'day');

      const isOutdated = daysLeft < 0;
      const isToday = daysLeft === 0;
      const isDeadlineSoon = daysLeft === 1;

      const isCompleted = Boolean(completedAt && dayjs(completedAt).isValid());
      const isActive = uncompletedStepIndex === stepIndex;

      const getStatusLabel = () => {
        if (!isTargetActive) return `Срок:\u00A0${dayjs(shouldBeCompletedAt).format('DD-MM-YYYY')}`;
        if (isCompleted) {
          return `Завершен:\u00A0${dayjs(completedAt).format('DD-MM-YYYY')}`;
        }
        if (!dayjs(shouldBeCompletedAt).isValid()) return null;
        if (isOutdated) return 'Просрочено';
        if (isToday) return 'Ожидает завершения';
        if (isDeadlineSoon) return 'Остался 1\u00A0день';

        const verb = decline(daysLeft, ['Осталось', 'Остался', 'Осталось']);
        const days = decline(daysLeft, ['дней', 'день', 'дня']);

        return `${verb}\u00A0${daysLeft}\u00A0${days}`;
      };

      const getStepLabelColor = () => {
        if (!isTargetActive) return 'text.secondary';
        if (isCompleted || !isTargetActive) return theme.palette.grey[600];
        if (isDeadlineSoon || isToday) return 'warning.dark';
        if (isOutdated) return 'error.main';
        if (isActive) return 'text.primary';

        return theme.palette.grey[600];
      };

      const getStatusColor = () => {
        if (!isTargetActive) return 'text.secondary';
        if (isCompleted) return theme.palette.grey[600];
        if (isToday || isDeadlineSoon) return 'warning.dark';
        if (isOutdated) return 'error.main';
        if (isActive) return 'text.primary';

        return theme.palette.grey[400];
      };

      const getStepIconColor = () => {
        if (!isTargetActive) return 'text.secondary';
        if (isCompleted) return 'success.main';
        if (isToday || isDeadlineSoon) return 'warning.dark';
        if (isOutdated) return 'error.main';
        if (isActive) return 'primary.main';

        return theme.palette.grey[400];
      };

      return {
        id: id.toString(),
        isSelected: editableStepId === id,
        label: title,
        onClick: isActive
          ? (event: React.MouseEvent<HTMLDivElement>) => {
              openEdit(event.currentTarget, id);
            }
          : undefined,
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

  const form = (
    <Grid container spacing={1}>
      <Grid size={{ laptop: 'grow', mobile: 12 }}>
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
      {isMobile ? (
        <Grid size={12} sx={{ mt: 3 }}>
          <Button color="success" fullWidth onClick={saveCompleteStep} variant="contained">
            Сохранить
          </Button>
        </Grid>
      ) : (
        <Grid>
          <IconButton aria-label="Завершить шаг" color="success" onClick={saveCompleteStep}>
            <DoneIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );

  return (
    <>
      <Stepper
        activeStep={uncompletedStepIndex}
        connector={<Connector colors={connectorColors} />}
        items={stepperItems}
        sx={{ mt: 2 }}
      />
      {isMobile ? (
        <SwipeableDrawer
          onClose={closeEdit}
          open={Boolean(editedStepEl)}
          title="Завершение шага"
          titleId={drawerTitleId}
        >
          {form}
        </SwipeableDrawer>
      ) : (
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
          {form}
        </Popper>
      )}
    </>
  );
};
