import { useQuery } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type { Target, UserId } from '../types';

export function useGetUsersTargets(userId: UserId | null) {
  const targetsQuery = useQuery({
    enabled: !!userId,
    queryFn: () => goalsServiceApiClient.get<Target[]>(`/targets/get-all/${userId}`),
    queryKey: ['targets', userId],
    refetchOnMount: true,
  });

  return {
    data: targetsQuery.isSuccess ? targetsQuery.data.data : [],
    loading: targetsQuery.isLoading,
    refetch: () => targetsQuery.refetch(),
  };
}

