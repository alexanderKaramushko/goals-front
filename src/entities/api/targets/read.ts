import { useQuery } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type { Target } from '../types';

export function useGetOwnTargets() {
  const targetsQuery = useQuery({
    queryFn: () => goalsServiceApiClient.get<Target[]>(`/targets/get-all-own`),
    queryKey: ['targets'],
    refetchOnMount: true,
  });

  return {
    data: targetsQuery.isSuccess ? targetsQuery.data.data : [],
    loading: targetsQuery.isLoading,
    refetch: () => targetsQuery.refetch(),
  };
}

