import axios from 'axios';
import get from 'lodash/get';

import { authService } from 'utils/auth.service';

const TIMEOUT = 65 * 1000;

const initialCacheRequest = async () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: TIMEOUT,
    // adapter,
  });
};

let instance;

export const getBaseRequest = async () => {
  const token = authService.getToken();

  if (!instance) {
    instance = await initialCacheRequest();
  }

  const commonHeaders = token
    ? {
        ...JSON.parse(token),
      }
    : {};

  instance.defaults.headers.common = commonHeaders;

  instance.interceptors.response.use(
    response => response,
    error => {
      // auto remove token when token invalid
      const token = authService.getToken();
      if (token && get(error, 'response.status') === 401) {
        authService.clearStorage();
        return;
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
