import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SaveIcon from '@mui/icons-material/Save';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { type FC, useState } from 'react';

import { ConnectorWithInterButton, Popper, Stepper } from 'shared/components';

import { useCreateStep, useCreateTarget } from 'entities/api';

type StepId = string;

type StepData = {
  date: string;
  description: string;
  id: StepId;
  title: string;
};

type TargetData = {
  description: string;
  shouldBeCompletedAt: string;
  title: string;
};

type CreateTargetProps = {
  onSuccess?: () => void;
};

export const CreateTarget: FC<CreateTargetProps> = ({ onSuccess }) => {
  const createTarget = useCreateTarget();
  const stepCreation = useCreateStep();

  const [targetData, setTargetData] = useState<TargetData>({
    description: '',
    shouldBeCompletedAt: '',
    title: '',
  });

  const [stepsData, setStepsDate] = useState<StepData[]>([
    {
      date: '',
      description: '',
      id: nanoid(),
      title: 'Новый шаг',
    },
  ]);

  const [editedStepEl, setEditedStepEl] = useState<HTMLElement | null>(null);
  const [editableStepId, setEditableStepId] = useState<string | null>(null);

  function closeEdit() {
    setEditedStepEl(null);
    setEditableStepId(null);
  }

  function openEdit(el: HTMLElement, stepId: StepId) {
    setEditedStepEl(el);
    setEditableStepId(stepId);
  }

  function editStep<Name extends keyof StepData>(
    stepId: StepId,
    name: Name,
    value: StepData[Name],
  ) {
    const newSteps = stepsData.map((step) => {
      if (step.id === stepId) {
        return {
          ...step,
          [name]: value,
        };
      }

      return step;
    });

    setStepsDate(newSteps);
  }

  function getStepFieldValue(stepId: StepId, name: keyof StepData) {
    return stepsData.find((step) => step.id === stepId)[name];
  }

  function addInterStep(stepIndex: number) {
    const stepsBefore = stepsData.slice(0, stepIndex);
    const stepsAfter = stepsData.slice(stepIndex);

    setStepsDate(() => [
      ...stepsBefore,
      {
        date: '',
        description: '',
        id: nanoid(),
        title: 'Новый шаг',
      },
      ...stepsAfter,
    ]);
  }

  function isComplete(stepId: StepId) {
    return Object.values(stepsData.find((step) => step.id === stepId)).every((value) => !!value);
  }

  function editTargetData<Name extends keyof TargetData>(name: Name, value: TargetData[Name]) {
    setTargetData((prevTargetData) => ({
      ...prevTargetData,
      [name]: value,
    }));
  }

  function isFormFilled() {
    return (
      targetData.title && targetData.description && stepsData.every(({ id }) => isComplete(id))
    );
  }

  async function save() {
    if (isFormFilled()) {
      try {
        const createdTarget = await createTarget.invoke(targetData);

        for (const step of stepsData) {
          await stepCreation.invoke({
            ...step,
            shouldBeCompletedAt: step.date,
            targetId: createdTarget.data[0].id,
          });
        }

        onSuccess?.();
      } catch {
        // TODO Показывать уведомление
      }
    }
  }

  return (
    <>
      <Paper sx={{ borderRadius: 5, boxShadow: 4, pb: 2, pt: 4, px: 4 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'flex-end' }}>
          <Grid size={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="goal-title" sx={{ fontWeight: 500 }}>
                Название цели
              </FormLabel>
              <OutlinedInput
                autoFocus
                id="goal-title"
                onChange={(event) => {
                  editTargetData('title', event.currentTarget.value);
                }}
                placeholder="Например: Подготовиться к собеседованию"
                size="small"
                sx={{ borderRadius: 2, mt: 1 }}
                value={targetData.title}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="goal-end-date" sx={{ fontWeight: 500 }}>
                Дата завершения цели
              </FormLabel>
              <DatePicker
                disablePast
                format="DD • MM"
                onChange={(value) => {
                  if (value.isValid()) {
                    editTargetData('shouldBeCompletedAt', value.format('YYYY-MM-DD'));
                  }
                }}
                slotProps={{
                  field: {
                    id: 'goal-end-date',
                    readOnly: true,
                  },
                  textField: {
                    fullWidth: true,
                    size: 'small',
                    variant: 'outlined',
                  },
                }}
                sx={{ '& .MuiPickersInputBase-root': { borderRadius: 2 }, mt: 1 }}
                value={
                  targetData.shouldBeCompletedAt ? dayjs(targetData.shouldBeCompletedAt) : null
                }
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="goal-description" sx={{ fontWeight: 500 }}>
                Описание цели
              </FormLabel>
              <OutlinedInput
                id="goal-description"
                minRows={4}
                multiline
                onChange={(event) => {
                  editTargetData('description', event.currentTarget.value);
                }}
                placeholder="Например: Чтобы получать деньги"
                size="small"
                sx={{ borderRadius: 2, mt: 1 }}
                value={targetData.description}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Typography sx={{ fontWeigh: 500 }} variant="body1">
              Шаги цели
            </Typography>
            <Stepper
              connector={<ConnectorWithInterButton onConnectorClick={addInterStep} />}
              items={stepsData.map(({ date, id, title }) => ({
                id,
                isCompleted: isComplete(id),
                isSelected: editableStepId === id,
                label: title,
                onClick: (event) => openEdit(event.currentTarget, id),
                onDeleteClick: () => {
                  setStepsDate(stepsData.filter((step) => step.id !== id));
                },
                stepLabelProps: {
                  optional: dayjs(date).isValid() && (
                    <Typography variant="caption">
                      Срок: {dayjs(date).format('DD-MM-YYYY')}
                    </Typography>
                  ),
                },
              }))}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid>
            <Button
              onClick={() => {
                setStepsDate((prevSteps) => [
                  ...prevSteps,
                  { date: '', description: '', id: nanoid(), title: 'Новый шаг' },
                ]);
              }}
              startIcon={<ControlPointIcon />}
              variant="outlined"
            >
              Добавить шаг
            </Button>
            <Button
              color="success"
              disabled={!isFormFilled()}
              onClick={save}
              startIcon={<SaveIcon />}
              sx={{ ml: 2 }}
              variant="contained"
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Paper>
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
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              autoFocus
              fullWidth
              id="step-title"
              label="Название"
              onChange={(event) => {
                editStep(editableStepId, 'title', event.currentTarget.value);
              }}
              placeholder="Купить весы"
              size="small"
              value={editableStepId ? getStepFieldValue(editableStepId, 'title') : ''}
              variant="outlined"
            />
          </Grid>
          <Grid size={6}>
            <DatePicker
              disablePast
              format="DD • MM"
              label="Дата"
              onChange={(value) => {
                if (value.isValid()) {
                  editStep(editableStepId, 'date', value.format('YYYY-MM-DD'));
                }
              }}
              shouldDisableDate={(date) => {
                const stepIndex = stepsData.findIndex((step) => step.id === editableStepId);
                const prevStepDate =
                  Reflect.has(stepsData, stepIndex - 1) && stepsData[stepIndex - 1].date;
                const nextStepDate =
                  Reflect.has(stepsData, stepIndex + 1) && stepsData[stepIndex + 1].date;

                return (
                  (prevStepDate && date.isSameOrBefore(prevStepDate)) ||
                  (nextStepDate && date.isSameOrAfter(nextStepDate))
                );
              }}
              slotProps={{
                field: {
                  readOnly: true,
                },
                popper: {
                  disablePortal: true,
                },
                textField: {
                  fullWidth: true,
                  size: 'small',
                  variant: 'outlined',
                },
              }}
              value={
                editableStepId && getStepFieldValue(editableStepId, 'date')
                  ? dayjs(getStepFieldValue(editableStepId, 'date'))
                  : null
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="step-description"
              label="Описание"
              minRows={2}
              multiline
              onChange={(event) => {
                editStep(editableStepId, 'description', event.currentTarget.value);
              }}
              placeholder="Измерять вес"
              size="small"
              value={editableStepId ? getStepFieldValue(editableStepId, 'description') : ''}
            />
          </Grid>
        </Grid>
      </Popper>
    </>
  );
};

