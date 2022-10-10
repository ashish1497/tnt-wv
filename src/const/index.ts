export const ENVIRONMENT = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : 'development';

// wont be using this, will decode token
export const STORAGE = {
  user: 'user',
};

export const COOKIES = {
  ACCESSTOKEN: 'tnt-at',
  REFRESHTOKEN: 'tnt-rt',
};

export const BASEURL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1';

export const APIURL = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    token: '/auth/token',
  },
  order: {
    base: '/order',
    withId: (id: string) => `/order/${id}`,
  },
};

export const UNAUTHENTICATEDROUTES = [
  APIURL.auth.login,
  APIURL.auth.register,
  APIURL.auth.token,
];
