import db from '..';
import { User } from '../../types';

export async function getSingleUserById(id: string): Promise<User> {
  const user = await db('users').where({ id }).first();

  if (!user) {
    throw new Error('User does not exist.');
  }

  return user as User;
}
