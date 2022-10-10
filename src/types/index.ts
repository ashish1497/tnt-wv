// same as api
export interface RegisterBody {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  type: 'user' | 'delivery';
}

export interface LoginBody {
  username: string;
  password: string;
}
