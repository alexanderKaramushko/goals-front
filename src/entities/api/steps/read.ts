import { useQuery } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type { Step } from '../types';

export function useGetSteps(targetId: number | null) {
  const stepsQuery = useQuery({
    enabled: !!targetId,
    queryFn: () => goalsServiceApiClient.get<Step[]>(`/steps/get-all/${targetId}`),
    queryKey: ['targets', targetId],
    refetchOnMount: true,
  });

  return {
    data: stepsQuery.isSuccess ? stepsQuery.data.data : [],
    loading: stepsQuery.isLoading,
    refetch: () => stepsQuery.refetch(),
  };
}

