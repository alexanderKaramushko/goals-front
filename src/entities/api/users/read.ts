import { useQuery } from '@tanstack/react-query';

import { goalsAuthApiClient, goalsServiceApiClient } from 'shared/libs/api-client';

import type { UserTargetsResponseDto } from '../api-types';
import type { AuthUserProfile } from '../auth-types';
import type { User, UserId } from '../types';

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
    loading: usersQuery.isLoading,
  };
}

export function useGetUserTargets(userId: UserId) {
  const targetsQuery = useQuery({
    queryFn: () => goalsServiceApiClient.get<UserTargetsResponseDto[]>(`users/${userId}/targets`),
    queryKey: ['users', userId],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const targets = targetsQuery.isSuccess ? targetsQuery.data.data : [];

  return {
    data: targets,
    loading: targetsQuery.isLoading,
  };
}

