import { useQuery } from '@tanstack/react-query';

import { goalsAuthApiClient, goalsServiceApiClient } from 'shared/libs/api-client';

import type { AuthUserProfile } from '../auth-types';
import type { User } from '../types';

export function useGetUserProfile() {
  const userQuery = useQuery({
    queryFn: () => goalsAuthApiClient.get<AuthUserProfile[]>('users/profile'),
    queryKey: ['profile'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const userProfile = userQuery.isSuccess ? userQuery.data.data[0] : null;

  return {
    data: userProfile,
    error: userQuery.error,
  };
}

export function useGetUsers() {
  const usersQuery = useQuery({
    queryFn: () => goalsServiceApiClient.get<User[]>('users/get-all'),
    queryKey: ['users'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const users = usersQuery.isSuccess ? usersQuery.data.data : [];

  return {
    data: users,
  };
}

