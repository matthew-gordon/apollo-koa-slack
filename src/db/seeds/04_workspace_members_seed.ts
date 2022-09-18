import { Knex } from 'knex';
import { WorkspaceMember } from '../../types';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex<WorkspaceMember>('workspace_members').del();

  // Inserts seed entries
  await knex<WorkspaceMember>('workspace_members').insert([
    {
      id: 'e263e006-c32e-49f7-a753-89ad2c223e06',
      workspace_id: '0a5770b5-c790-450e-acb6-a411c69dbcae',
      member_id: '80a8a2c3-dbb0-47d4-9d1a-3864785fec51',
      last_seen: new Date('2022-09-18').toISOString(),
    },
  ]);
}
