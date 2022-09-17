import { User } from '.';

export type AuthResponse = {
  token: string;
  user: User;
};

export type LoginUserInput = {
  email: string;
  password: string;
};
