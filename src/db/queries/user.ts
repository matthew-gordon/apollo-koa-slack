import db from '..';
import { User, Workspace } from '../../types';

export async function getUserById(id: string): Promise<User> {
  const user = await db('users').where({ id }).first();

  if (!user) {
    throw new Error('User does not exist.');
  }

  return user;
}

export async function getUserByEmail(email: string): Promise<User> {
  const user = await db('users').where({ email }).first();

  if (!user) {
    throw new Error('User does not exist.');
  }

  return user;
}

export async function getUserWorkspacesById(id: string): Promise<Workspace[]> {
  const workspaces = await db<Workspace>('workspaces')
    .where({ owner_id: id })
    .select();

  if (!workspaces.length) {
    return [];
  }

  return workspaces;
}
