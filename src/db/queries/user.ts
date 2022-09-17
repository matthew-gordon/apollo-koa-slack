import db from '..';
import { User } from '../../types';

export async function getUserById(id: string): Promise<User> {
  const user = await db('users').where({ id }).first();

  if (!user) {
    throw new Error('User does not exist.');
  }

  return user as User;
}

export async function getUserByEmail(email: string): Promise<User> {
  const user = await db('users').where({ email }).first();

  if (!user) {
    throw new Error('User does not exist.');
  }

  return user as User;
}
