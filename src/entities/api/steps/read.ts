import { useQuery } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type { Step } from '../types';

export function useGetSteps(targetId: number | null) {
  const stepsResult = useQuery({
    enabled: !!targetId,
    queryFn: () => goalsServiceApiClient.get<Step[]>(`/steps/get-all/${targetId}`),
    queryKey: ['targets', targetId],
    refetchOnMount: true,
  });

  return {
    data: stepsResult.isSuccess ? stepsResult.data.data : [],
    refetch: () => stepsResult.refetch(),
  };
}

