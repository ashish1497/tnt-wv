import { APIURL } from '../const';
import fetch from '../lib/fetch';

import { RegisterBody, LoginBody } from '../types';

const api = APIURL.auth;

export const register = async (data: RegisterBody) => {
  return fetch.post(api.register, data);
};

export const login = async (data: LoginBody) => {
  return fetch.post(api.login, data);
};
