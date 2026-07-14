import axios from 'axios';

import { dayjs } from 'shared/libs/dayjs';

const goalsServiceBaseUrl = new URL(window.location.origin);

goalsServiceBaseUrl.pathname = 'api/v1';

export const goalsServiceApiClient = axios.create({
  baseURL: goalsServiceBaseUrl.toString(),
  headers: { 'Content-Type': 'application/json', 'x-user-timezone': dayjs.tz.guess() },
});

const goalsAuthBaseUrl = new URL(window.location.origin);

goalsAuthBaseUrl.pathname = 'auth';

export const goalsAuthApiClient = axios.create({
  baseURL: goalsAuthBaseUrl.toString(),
  headers: { 'Content-Type': 'application/json' },
});
