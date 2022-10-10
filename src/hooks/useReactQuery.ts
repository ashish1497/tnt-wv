import { useMutation, UseMutationOptions } from 'react-query';

import { login, register } from '../services/auth';

// hack any here
export const useRegister = ({ options }: any) => {
  return useMutation(register, options);
};

// hack any here
export const useLogin = ({ options }: any) => {
  return useMutation(login, options);
};
