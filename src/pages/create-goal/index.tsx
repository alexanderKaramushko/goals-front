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
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { appRoutes, useRouteHandle } from 'app/routes';

import { ConnectorWithInterButton, Popper, Stepper } from 'shared/components';
import { goalsServiceApiClient } from 'shared/libs/api-client';

type StepId = string;

type CreateTargetData = {
  description: string;
  endDate: string;
  title: string;
};

type CreateStepData = {
  title: string;
  description: string;
  /**
   * @example YYYY-MM-DD
   */
  date: string;
  id: StepId;
};

const CreateGoalPage = () => {
  const routeHandle = useRouteHandle();
  const navigate = useNavigate();

  const createTargetMutation = useMutation({
    mutationFn: (data: CreateTargetData) =>
      goalsServiceApiClient.post('targets/create', {
        description: data.description,
        shouldBeCompletedAt: data.endDate,
        title: data.title,
      }),
    mutationKey: ['createTarget'],
  });

  const addStepMutation = useMutation({
    mutationFn: (data: CreateStepData & { targetId: number }) =>
      goalsServiceApiClient.post(`steps/create/${data.targetId}`, {
        description: data.description,
        shouldBeCompletedAt: data.date,
        title: data.title,
      }),
  });

  const [targetData, setTargetData] = useState<CreateTargetData>({
    description: '',
    endDate: '',
    title: '',
  });

  const [steps, setSteps] = useState<CreateStepData[]>([
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

  function editStep<Name extends keyof CreateStepData>(
    stepId: StepId,
    name: Name,
    value: CreateStepData[Name],
  ) {
    const newSteps = steps.map((step) => {
      if (step.id === stepId) {
        return {
          ...step,
          [name]: value,
        };
      }

      return step;
    });

    setSteps(newSteps);
  }

  function getStepFieldValue(stepId: StepId, name: keyof CreateStepData) {
    return steps.find((step) => step.id === stepId)[name];
  }

  function addInterStep(stepIndex: number) {
    const stepsBefore = steps.slice(0, stepIndex);
    const stepsAfter = steps.slice(stepIndex);

    setSteps(() => [
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
    return Object.values(steps.find((step) => step.id === stepId)).every((value) => !!value);
  }

  function editTargetData<Name extends keyof CreateTargetData>(
    name: Name,
    value: CreateTargetData[Name],
  ) {
    setTargetData((prevTargetData) => ({
      ...prevTargetData,
      [name]: value,
    }));
  }

  function isFormFilled() {
    return targetData.title && targetData.description && steps.every(({ id }) => isComplete(id));
  }

  async function save() {
    if (isFormFilled()) {
      try {
        const createdTarget = await createTargetMutation.mutateAsync(targetData);

        for (const step of steps) {
          await addStepMutation.mutateAsync({
            ...step,
            targetId: createdTarget.data[0].id,
          });
        }

        navigate(appRoutes.app.path);
      } catch {
        // TODO Показывать уведомление
      }
    }
  }

  return (
    <>
      <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid size={12}>
          <Typography color="primary" variant="h4">
            {routeHandle.title}
          </Typography>
          <Typography color="text.primary" variant="body1">
            Заполните шаги цели и сохраните
          </Typography>
        </Grid>
        <Grid size={12}>
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
                        editTargetData('endDate', value.format('YYYY-MM-DD'));
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
                    value={targetData.endDate ? dayjs(targetData.endDate, 'YYYY-MM-DD') : null}
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
                  items={steps.map(({ date, id, title }) => ({
                    id,
                    isComplete: isComplete(id),
                    isSelected: editableStepId === id,
                    label: title,
                    onClick: (event) => openEdit(event.currentTarget, id),
                    onDeleteClick: () => {
                      setSteps(steps.filter((step) => step.id !== id));
                    },
                    stepLabelProps: {
                      optional: dayjs(date, 'YYYY-MM-DD').isValid() && (
                        <Typography variant="caption">
                          Срок: {dayjs(date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
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
                    setSteps((prevSteps) => [
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
        </Grid>
      </Grid>
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
                const stepIndex = steps.findIndex((step) => step.id === editableStepId);
                const prevStepDate = Reflect.has(steps, stepIndex - 1) && steps[stepIndex - 1].date;
                const nextStepDate = Reflect.has(steps, stepIndex + 1) && steps[stepIndex + 1].date;

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
                  ? dayjs(getStepFieldValue(editableStepId, 'date'), 'YYYY-MM-DD')
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

export default CreateGoalPage;

