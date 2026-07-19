import { useMutation } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type { CreateStepPayload, Step } from '../types';

export function useCreateStep() {
  const addStepMutation = useMutation({
    mutationFn: (data: CreateStepPayload) =>
      goalsServiceApiClient.post<Step>(`steps/create/${data.targetId}`, {
        description: data.description,
        shouldBeCompletedAt: data.shouldBeCompletedAt,
        title: data.title,
      }),
  });

  async function invoke(data: CreateStepPayload) {
    return await addStepMutation.mutateAsync(data);
  }

  return {
    invoke,
  };
}

