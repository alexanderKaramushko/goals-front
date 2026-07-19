import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { goalsAuthApiClient } from 'shared/libs/api-client';

import type { User } from '../auth-types';

export function useGetUserProfile({ onError }: { onError?: (error: Error) => void } = {}) {
  const userQuery = useQuery({
    queryFn: () => goalsAuthApiClient.get<User[]>('users/profile'),
    queryKey: ['profile'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const userProfile = userQuery.isSuccess ? userQuery.data.data[0] : null;

  useEffect(() => {
    if (userQuery.error) {
      onError?.(userQuery.error);
    }
  }, [userQuery.error, onError]);

  return {
    data: userProfile,
  };
}

