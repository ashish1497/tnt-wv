import Cookies from 'js-cookie';

import { ENVIRONMENT } from '../const';

// Set, Remove and Get Cookies
export const setCookie = async (
  key: string,
  value: string,
  expires: number
) => {
  if (window !== undefined) {
    Cookies.set(key, value, {
      expires: expires,
      secure: true,
      sameSite: 'Strict',
    });
  }
};

export const removeCookie = (key: string) => {
  if (window !== undefined) {
    Cookies.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string) => {
  // console.log(key, window);
  if (window !== undefined) {
    return Cookies.get(key);
  }
};

// Set, Remove and Get LocalStorage
export const setLocalStorage = async (key: string, value: string) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key: string) => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};

export const getLocalStorage = (key: string) => {
  if (window !== undefined) {
    const item = localStorage.getItem(key);
    return item;
  }
};
