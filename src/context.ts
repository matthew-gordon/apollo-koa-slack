import { User } from './types';

export interface Context {
  user?: Partial<User> | null;
}
