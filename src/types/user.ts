export type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
};

export type UserInput = Pick<User, 'email' | 'password'>;
