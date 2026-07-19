import { useMutation } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import type {
  ActivateTargetPayload,
  CancelTargetPayload,
  DeleteTargetPayload,
  TargetId,
} from '../types';

export function useActivateTarget({ onError }: { onError?: (error: unknown) => void } = {}) {
  const activateTargetMutation = useMutation({
    mutationFn: (data: ActivateTargetPayload) =>
      goalsServiceApiClient.put(`targets/activate/${data.targetId}`),
  });

  async function invoke(targetId: TargetId) {
    try {
      await activateTargetMutation.mutateAsync({ targetId });
    } catch (error) {
      onError?.(error);
    }
  }

  return {
    invoke,
  };
}

export function useDeleteTarget({ onError }: { onError?: (error: unknown) => void } = {}) {
  const deleteTargetMutation = useMutation({
    mutationFn: (data: DeleteTargetPayload) =>
      goalsServiceApiClient.delete(`targets/delete/${data.targetId}`),
  });

  async function invoke(targetId: TargetId) {
    try {
      await deleteTargetMutation.mutateAsync({ targetId });
    } catch (error) {
      onError?.(error);
    }
  }

  return {
    invoke,
  };
}

export function useCancelTarget({ onError }: { onError?: (error: unknown) => void } = {}) {
  const cancelTargetMutation = useMutation({
    mutationFn: (data: CancelTargetPayload) =>
      goalsServiceApiClient.post(`targets/cancel/${data.targetId}`),
  });

  async function invoke(targetId: TargetId) {
    try {
      await cancelTargetMutation.mutateAsync({ targetId });
    } catch (error) {
      onError?.(error);
    }
  }

  return {
    invoke,
  };
}

