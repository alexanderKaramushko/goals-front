import { useMutation } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type { CreateRewardPayload, Reward } from '../types';

export function useCreateReward() {
  const createRewardMutation = useMutation({
    mutationFn: (data: CreateRewardPayload) =>
      goalsServiceApiClient.post<Reward>(`rewards/create/${data.targetId}`, {
        description: data.description,
        title: data.title,
      }),
  });

  async function invoke(data: CreateRewardPayload) {
    return await createRewardMutation.mutateAsync(data);
  }

  return {
    invoke,
    loading: createRewardMutation.isPending,
  };
}

