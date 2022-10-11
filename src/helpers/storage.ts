import cookie from 'js-cookie';

// Set, Remove and Get cookie
export const setCookie = async (
  key: string,
  value: string,
  expires: number
) => {
  if (window !== undefined) {
    cookie.set(key, value, {
      expires: expires,
      secure: true,
      sameSite: 'Strict',
    });
  }
};

export const removeCookie = (key: string) => {
  if (window !== undefined) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string) => {
  // console.log(key, window);
  if (window !== undefined) {
    return cookie.get(key);
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
