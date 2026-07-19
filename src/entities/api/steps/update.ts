import { useMutation } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type { CompleteStepPayload } from '../types';

export function useCompleteStep({ onError }: { onError?: (error: unknown) => void } = {}) {
  const completeStepMutation = useMutation({
    mutationFn: (data: CompleteStepPayload) =>
      goalsServiceApiClient.put(`steps/complete/${data.stepId}`, {
        resultComment: data.resultComment,
      }),
  });

  async function invoke(data: CompleteStepPayload) {
    try {
      await completeStepMutation.mutateAsync(data);
    } catch (error) {
      onError?.(error);
    }
  }

  return {
    invoke,
  };
}

