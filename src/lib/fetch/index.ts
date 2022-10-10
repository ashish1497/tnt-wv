import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { COOKIES, BASEURL, UNAUTHENTICATEDROUTES } from '../../const';
import { isAuth } from '../../helpers/auth';
import { getCookie } from '../../helpers/storage';

const axiosInstance = axios.create({
  baseURL: BASEURL,
});

interface OurHeader {
  'Content-Type': string;
  Accept: string;
  Authorization?: string;
  withCredentials?: boolean;
}

type CustomHeader = AxiosRequestConfig & OurHeader;

const headersCommon: OurHeader = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const isTokenRequired = !UNAUTHENTICATEDROUTES.includes(
    `/api/v1${config?.url}`
  );

  let newConfig = {
    ...config,
    headers: { ...headersCommon },
  };

  if (isTokenRequired) {
    const auth = await isAuth();
    if (!auth) {
      console.log('auth false', auth);
    }
    newConfig = {
      ...newConfig,
      headers: {
        ...newConfig.headers,
        Authorization: `Bearer ${getCookie(COOKIES.ACCESSTOKEN)}`,
        withCredentials: true,
      },
    };
    return newConfig;
  }

  return newConfig;
});

axiosInstance.interceptors.response.use(
  async (config: AxiosResponse) => {
    const { success, message, error } = config.data;

    if (!success) {
      console.log(
        `Failed Response: ${message} and error: ${JSON.stringify(
          error
        )} under ${config.config.url}`
      );
    }

    return config.data;
  },
  (error) => {
    return error.message;
  }
);

export default axiosInstance;
