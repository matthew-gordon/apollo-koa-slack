import { Knex } from 'knex';
import { Workspace } from '../../types';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex<Workspace>('workspaces').del();

  // Inserts seed entries
  await knex<Workspace>('workspaces').insert([
    {
      id: '0a5770b5-c790-450e-acb6-a411c69dbcae',
      name: 'greenside tech',
      cname: 'greenside-tech',
      owner_id: '80a8a2c3-dbb0-47d4-9d1a-3864785fec51',
    },
  ]);
}
