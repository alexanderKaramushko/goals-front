import { useQuery } from '@tanstack/react-query';

import { goalsAuthApiClient, goalsServiceApiClient } from 'shared/libs/api-client';

import type { User } from 'entities/api/auth-types';

import type { Target } from '../types';

export function useGetTargets() {
  const userQuery = useQuery({
    queryFn: () => goalsAuthApiClient.get<User[]>('users/profile'),
    queryKey: ['profile'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const userId = userQuery.isSuccess ? userQuery.data.data[0]?.subjectId : null;

  const targetsResult = useQuery({
    enabled: !!userId,
    queryFn: () => goalsServiceApiClient.get<Target[]>(`/targets/get-all/${userId}`),
    queryKey: ['targets', userId].filter(Boolean),
    refetchOnMount: true,
  });

  return {
    data: targetsResult.isSuccess ? targetsResult.data.data : [],
    refetch: () => targetsResult.refetch(),
  };
}

