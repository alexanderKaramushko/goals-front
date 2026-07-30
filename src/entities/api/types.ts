import type {
  CompleteStepDto,
  CompleteTargetDto,
  CreatedStepResponseDto,
  CreateStepDto,
  CreateTargetDto,
  TargetsResponseDto,
  UserResponseDto,
} from './api-types';

export type Target = TargetsResponseDto;

export type TargetId = TargetsResponseDto['id'];

export type Step = CreatedStepResponseDto;

export type StepId = CreatedStepResponseDto['id'];

export type CreateTargetPayload = CreateTargetDto;

export type ActivateTargetPayload = { targetId: TargetId };

export type DeleteTargetPayload = { targetId: TargetId };

export type CancelTargetPayload = { targetId: TargetId };

export type CompleteTargetPayload = CompleteTargetDto & { targetId: TargetId };

export type CreateStepPayload = CreateStepDto & { targetId: TargetId };

export type CompleteStepPayload = CompleteStepDto & { stepId: StepId };

export type User = UserResponseDto;

export type UserId = User['id'];

