/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateTargetDto {
  /** @example "Составить план питания" */
  title: string;
  /** @example "Расписать план питания и составить список продуктов" */
  description: string;
  /** @example "2026-02-14" */
  shouldBeCompletedAt: string;
}

export interface CreatedTargetResponseDto {
  /** @example 1 */
  id: number;
  /** @example "108266036103493388680" */
  userId: string;
  /** @example "Составить план питания" */
  title: string;
  /** @example "Расписать план питания и составить список продуктов" */
  description: string;
  /** @example "created" */
  status: 'created' | 'active' | 'completed' | 'cancelled';
  /** @example "2026-02-14" */
  shouldBeCompletedAt: string;
}

export interface TargetStepsDto {
  /** @example 1 */
  id: number;
  /** @example 1 */
  targetId: number;
  /** @example "Накопить 1000р" */
  title: string;
  /** @example "Копейка рубль бережет!" */
  description: string;
  /** @example "2027-02-14" */
  shouldBeCompletedAt: string;
  /** @example "2026-06-06" */
  completedAt: string | null;
}

export interface TargetRewardsDto {
  /** @example 1 */
  id: number;
  /** @example null */
  recipientUserId: object | null;
  /** @example 1 */
  targetId: number;
  /** @example "target" */
  type: 'user' | 'target';
  /** @example "Билет в кино" */
  title: string;
  /** @example "За успешное завершение цели" */
  description: string;
  /** @example "108266036103493388680" */
  senderUserId: string;
}

export interface TargetsResponseDto {
  /** @example 1 */
  id: number;
  /** @example "108266036103493388680" */
  userId: string;
  /** @example "Составить план питания" */
  title: string;
  /** @example "Расписать план питания и составить список продуктов" */
  description: string;
  /** @example "created" */
  status: 'created' | 'active' | 'completed' | 'cancelled';
  /** @example "2026-02-14" */
  shouldBeCompletedAt: string;
  /** @example false */
  isOutdated: boolean;
  /**
   * Все шаги цели
   * @example [{"id":1,"targetId":1,"title":"Накопить 1000р","description":"Копейка рубль бережет!","shouldBeCompletedAt":"2027-02-14","completedAt":"2026-06-06"}]
   */
  steps: TargetStepsDto[];
  /**
   * Все награды цели
   * @example [{"id":1,"recipientUserId":null,"targetId":1,"type":"target","title":"Билет в кино","description":"За успешное завершение цели","senderUserId":"108266036103493388680"}]
   */
  rewards: TargetRewardsDto[];
}

export interface CompleteTargetDto {
  /**
   * Описание итогов завершаемой цели
   * @example "Сдал на права"
   */
  resultComment: string;
}

export interface CompletedTargetResponseDto {
  /**
   * Дата завершения цели
   * @example "2024-05-17"
   */
  completedAt: object;
}

export interface ActivatedTargetResponseDto {
  /**
   * Id активированной цели
   * @example 1
   */
  id: number;
}

export interface CancelledTargetResponseDto {
  /**
   * Id отмененной цели
   * @example 1
   */
  id: number;
}

export interface DeletedTargetResponseDto {
  /**
   * Id удаленной цели
   * @example 1
   */
  id: number;
}

export interface UserResponseDto {
  /**
   * Id пользователя
   * @example "108266036103493388680"
   */
  id: string;
  /**
   * Имя пользователя
   * @example "Alex Karamushko"
   */
  fullName: string;
  /**
   * Дата создания
   * @example "2026-06-21 16:37:39.368 +0400"
   */
  createdAt: object | null;
}

export interface CreatedRewardOnTargetResponseDto {
  /** @example 1 */
  id: number;
  /** @example 1 */
  targetId: object | null;
  /** @example "За составление плана питания" */
  title: string;
  /** @example "План питания составлен без штрафов" */
  description: string;
  /** @example "target" */
  type: 'user' | 'target';
  /** @example "2026-02-14T10:45:30.000Z" */
  createdAt: string;
  /** @example "2026-02-14T10:45:30.000Z" */
  acceptedAt: object | null;
}

export interface UserTargetStepsDto {
  /** @example 1 */
  id: number;
  /** @example 1 */
  targetId: number;
  /** @example "Накопить 1000р" */
  title: string;
  /** @example "Копейка рубль бережет!" */
  description: string;
  /** @example "2027-02-14" */
  shouldBeCompletedAt: string;
  /** @example "2026-06-06" */
  completedAt: string | null;
}

export interface UserTargetsResponseDto {
  /** @example 1 */
  id: number;
  /** @example "Составить план питания" */
  title: string;
  /** @example "Расписать план питания и составить список продуктов" */
  description: string;
  /** @example "created" */
  status: 'created' | 'active' | 'completed' | 'cancelled';
  /** @example "2026-02-14" */
  shouldBeCompletedAt: string;
  /** @example true */
  canAssignReward: boolean;
  /** Награда, назначенная текущим пользователем */
  reward: CreatedRewardOnTargetResponseDto | null;
  /**
   * Все шаги цели
   * @example [{"id":1,"targetId":1,"title":"Накопить 1000р","description":"Копейка рубль бережет!","shouldBeCompletedAt":"2027-02-14","completedAt":"2026-06-06"}]
   */
  steps: UserTargetStepsDto[];
}

export interface CreateStepDto {
  /** @example "Рецепты для плана питания" */
  title: string;
  /** @example "Найти рецепты для планов питания и составить список продуктов" */
  description: string;
  /** @example "2026-02-14T06:45:30.000Z" */
  shouldBeCompletedAt: string;
}

export interface CreatedStepResponseDto {
  /** @example 1 */
  id: number;
  /** @example 1 */
  targetId: number;
  /** @example "Рецепты для плана питания" */
  title: string;
  /** @example "Найти рецепты для планов питания и составить список продуктов" */
  description: string;
  /** @example "2026-02-14T10:45:30.000Z" */
  shouldBeCompletedAt: string;
  /** @example null */
  closedAt: string | null;
  /** @example "2026-02-14T10:45:30.000Z" */
  createdAt: string;
  /** @example null */
  completedAt: string | null;
}

export interface StepsResponseDto {
  /** @example 1 */
  id: number;
  /** @example 1 */
  targetId: number;
  /** @example "Рецепты для плана питания" */
  title: string;
  /** @example "Найти рецепты для планов питания и составить список продуктов" */
  description: string;
  /** @example "2026-02-14T10:45:30.000Z" */
  shouldBeCompletedAt: string;
  /** @example null */
  completedAt: string | null;
  /** @example false */
  isOutdated: boolean;
}

export interface CompleteStepDto {
  /**
   * Описание итогов завершаемого шага
   * @example "Посмотрел видео по правильному питанию"
   */
  resultComment: string;
}

export interface CompletedStepResponseDto {
  /**
   * Дата завершения шага
   * @example "2024-05-17"
   */
  completedAt: object;
}

export interface DeletedStepResponseDto {
  /**
   * Id удаленного шага
   * @example 1
   */
  id: number;
}

export interface CreateRewardOnTargetDto {
  /** @example "За составление плана питания" */
  title: string;
  /** @example "План питания составлен без штрафов" */
  description: string;
}

