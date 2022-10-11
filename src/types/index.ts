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

export interface AccessTokenInterface {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  type: 'user' | 'delivery' | 'admin';
}
