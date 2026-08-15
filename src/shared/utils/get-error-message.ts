import axios from 'axios';

type ErrorResponse = {
  message?: string;
};

const DEFAULT_ERROR_MESSAGE = 'Ошибка. Попробуйте еще раз';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return error.response?.data?.message || error.message || DEFAULT_ERROR_MESSAGE;
  }

  if (error instanceof Error) {
    return error.message || DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
}
