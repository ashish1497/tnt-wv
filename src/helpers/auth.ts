import axios from 'axios';

import {
  getCookie,
  removeCookie,
  removeLocalStorage,
  setCookie,
  setLocalStorage,
} from './storage';
import { COOKIES, STORAGE, BASEURL, APIURL } from '../const';
import { delay } from '../utils';

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}

export const setAccessToken = async (token: string) => {
  await setCookie(COOKIES.ACCESSTOKEN, token, 1 / 24); // expires in 1 hour
};

export const unauthenticate = (next: () => void) => {
  removeCookie(COOKIES.ACCESSTOKEN);
  removeCookie(COOKIES.REFRESHTOKEN);
  next();
};

export const authenticate = async (
  data: LoginResponseData,
  next: () => void
) => {
  await setAccessToken(data.accessToken);
  await setCookie(COOKIES.REFRESHTOKEN, data.refreshToken, 364); // expires in 12 months
  await delay(3000);
  next();
};

export const isAuth: () => Promise<boolean> = () => {
  if (window === undefined) {
    return Promise.resolve(false);
  } else {
    const accessCookieChecked = getCookie(COOKIES.ACCESSTOKEN);
    const refreshCookieChecked = getCookie(COOKIES.REFRESHTOKEN);
    if (accessCookieChecked) {
      return Promise.resolve(true);
    } else if (refreshCookieChecked) {
      return new Promise(resolve => {
        console.log('calling for new at');

        axios({
          method: 'POST',
          url: `${BASEURL}${APIURL.auth.token}`,
          data: { refreshToken: refreshCookieChecked },
        })
          .then(res => {
            const { success, data } = res?.data;
            if (success) {
              setAccessToken(data?.accessToken);
              resolve(true);
            } else {
              unauthenticate(() => {
                resolve(false);
              });
            }
          })
          .catch(err => {
            unauthenticate(() => {
              resolve(false);
            });
          });
      });
    } else {
      return new Promise(resolve => {
        unauthenticate(() => {
          resolve(false);
        });
      });
    }
  }
};
