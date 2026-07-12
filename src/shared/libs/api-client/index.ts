import axios from 'axios';

const goalsServiceBaseUrl = new URL(window.location.origin);

goalsServiceBaseUrl.pathname = 'api/v1';

export const goalsServiceApiClient = axios.create({
  baseURL: goalsServiceBaseUrl.toString(),
  headers: { 'Content-Type': 'application/json' }
});

export const goalsAuthApiClient = axios.create({
  headers: { 'Content-Type': 'application/json' }
});