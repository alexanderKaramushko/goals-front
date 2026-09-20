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
  status: "created" | "active" | "completed" | "cancelled";
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
  completedAt: undefined | null;
}

export interface TargetRewardsDto {
  /** @example 1 */
  id: number;
  /** @example null */
  recipientUserId: undefined | null;
  /** @example 1 */
  targetId: number;
  /** @example "target" */
  type: "user" | "target";
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
  status: "created" | "active" | "completed" | "cancelled";
  /** @example "2026-02-14" */
  shouldBeCompletedAt: string;
  /** @example false */
  isOutdated: boolean;
  /** @example "Хочу книгу в награду" */
  resultComment: undefined | null;
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
  completedAt: undefined;
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
  createdAt: undefined | null;
}

export interface CreatedRewardOnTargetResponseDto {
  /** @example 1 */
  id: number;
  /** @example 1 */
  targetId: undefined | null;
  /** @example "За составление плана питания" */
  title: string;
  /** @example "План питания составлен без штрафов" */
  description: string;
  /** @example "target" */
  type: "user" | "target";
  /** @example "2026-02-14T10:45:30.000Z" */
  createdAt: string;
  /** @example "2026-02-14T10:45:30.000Z" */
  acceptedAt: undefined | null;
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
  completedAt: undefined | null;
}

export interface UserTargetsResponseDto {
  /** @example 1 */
  id: number;
  /** @example "Составить план питания" */
  title: string;
  /** @example "Расписать план питания и составить список продуктов" */
  description: string;
  /** @example "created" */
  status: "created" | "active" | "completed" | "cancelled";
  /** @example "2026-02-14" */
  shouldBeCompletedAt: string;
  /** @example true */
  canAssignReward: boolean;
  /** @example "Хочу книгу в награду" */
  resultComment: string | null;
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
  completedAt: undefined;
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Goals service
 * @version 1.0
 * @contact
 *
 * Сервис управления целями.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Targets
     * @name TargetsControllerCreateV1
     * @summary Создать цель
     * @request POST:/api/v1/targets/create
     * @secure
     */
    targetsControllerCreateV1: (
      data: CreateTargetDto,
      params: RequestParams = {},
    ) =>
      this.request<CreatedTargetResponseDto[], any>({
        path: `/api/v1/targets/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Targets
     * @name TargetsControllerGetAllOwnV1
     * @summary Все цели текущего пользователя
     * @request GET:/api/v1/targets/get-all-own
     * @secure
     */
    targetsControllerGetAllOwnV1: (params: RequestParams = {}) =>
      this.request<any, TargetsResponseDto[]>({
        path: `/api/v1/targets/get-all-own`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Targets
     * @name TargetsControllerCompleteTargetV1
     * @summary Завершить цель
     * @request PUT:/api/v1/targets/complete/{targetId}
     * @secure
     */
    targetsControllerCompleteTargetV1: (
      targetId: number,
      data: CompleteTargetDto,
      params: RequestParams = {},
    ) =>
      this.request<any, CompletedTargetResponseDto>({
        path: `/api/v1/targets/complete/${targetId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Targets
     * @name TargetsControllerActivateTargetV1
     * @summary Активировать цель
     * @request PUT:/api/v1/targets/activate/{targetId}
     * @secure
     */
    targetsControllerActivateTargetV1: (
      targetId: number,
      params: RequestParams = {},
    ) =>
      this.request<any, ActivatedTargetResponseDto>({
        path: `/api/v1/targets/activate/${targetId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Targets
     * @name TargetsControllerCancelTargetV1
     * @summary Отменить активную цель
     * @request POST:/api/v1/targets/cancel/{targetId}
     * @secure
     */
    targetsControllerCancelTargetV1: (
      targetId: number,
      params: RequestParams = {},
    ) =>
      this.request<any, CancelledTargetResponseDto>({
        path: `/api/v1/targets/cancel/${targetId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Targets
     * @name TargetsControllerDeleteTargetV1
     * @summary Удалить не запущенную цель
     * @request DELETE:/api/v1/targets/delete/{targetId}
     * @secure
     */
    targetsControllerDeleteTargetV1: (
      targetId: number,
      params: RequestParams = {},
    ) =>
      this.request<any, DeletedTargetResponseDto>({
        path: `/api/v1/targets/delete/${targetId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetAllV1
     * @summary Все пользователи
     * @request GET:/api/v1/users/get-all
     * @secure
     */
    usersControllerGetAllV1: (params: RequestParams = {}) =>
      this.request<any, UserResponseDto[]>({
        path: `/api/v1/users/get-all`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUserTargetsV1
     * @summary Активные и завершенные цели пользователя
     * @request GET:/api/v1/users/{userId}/targets
     * @secure
     */
    usersControllerGetUserTargetsV1: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, UserTargetsResponseDto[]>({
        path: `/api/v1/users/${userId}/targets`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUserV1
     * @summary Информация о пользователе
     * @request GET:/api/v1/users/{userId}
     * @secure
     */
    usersControllerGetUserV1: (userId: string, params: RequestParams = {}) =>
      this.request<any, UserResponseDto>({
        path: `/api/v1/users/${userId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Steps
     * @name StepsControllerCreateV1
     * @summary Создать шаг
     * @request POST:/api/v1/steps/create/{targetId}
     * @secure
     */
    stepsControllerCreateV1: (
      targetId: number,
      data: CreateStepDto,
      params: RequestParams = {},
    ) =>
      this.request<CreatedStepResponseDto[], any>({
        path: `/api/v1/steps/create/${targetId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Steps
     * @name StepsControllerGetAllV1
     * @summary Все шаги у цели
     * @request GET:/api/v1/steps/get-all/{targetId}
     * @secure
     */
    stepsControllerGetAllV1: (targetId: number, params: RequestParams = {}) =>
      this.request<StepsResponseDto[], any>({
        path: `/api/v1/steps/get-all/${targetId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Steps
     * @name StepsControllerCompleteStepV1
     * @summary Завершить шаг у цели
     * @request PUT:/api/v1/steps/complete/{stepId}
     * @secure
     */
    stepsControllerCompleteStepV1: (
      stepId: number,
      data: CompleteStepDto,
      params: RequestParams = {},
    ) =>
      this.request<CompletedStepResponseDto, any>({
        path: `/api/v1/steps/complete/${stepId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Steps
     * @name StepsControllerDeleteStepV1
     * @summary Удалить шаг у цели
     * @request DELETE:/api/v1/steps/delete/{stepId}
     * @secure
     */
    stepsControllerDeleteStepV1: (stepId: number, params: RequestParams = {}) =>
      this.request<DeletedStepResponseDto, any>({
        path: `/api/v1/steps/delete/${stepId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rewards
     * @name RewardsControllerCreateV1
     * @summary Создать награду
     * @request POST:/api/v1/rewards/create/{targetId}
     * @secure
     */
    rewardsControllerCreateV1: (
      targetId: number,
      data: CreateRewardOnTargetDto,
      params: RequestParams = {},
    ) =>
      this.request<CreatedRewardOnTargetResponseDto, any>({
        path: `/api/v1/rewards/create/${targetId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
