import { useMutation } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type { CreateTargetPayload, Target } from '../types';

export function useCreateTarget() {
  const createTargetMutation = useMutation({
    mutationFn: (data: CreateTargetPayload) =>
      goalsServiceApiClient.post<Target[]>('targets/create', {
        description: data.description,
        shouldBeCompletedAt: data.shouldBeCompletedAt,
        title: data.title,
      }),
  });

  async function invoke(data: CreateTargetPayload) {
    return await createTargetMutation.mutateAsync(data);
  }

  return {
    invoke,
    loading: createTargetMutation.isPending,
  };
}

