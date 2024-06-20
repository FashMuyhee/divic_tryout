import {User} from 'contexts';

export interface LoginForm {
  url: string;
  usr: string;
  pwd: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: User;
  };
}
