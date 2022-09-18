import { Knex } from 'knex';
import { WorkspaceChannel } from '../../types';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex<WorkspaceChannel>('workspace_channels').del();

  // Inserts seed entries
  await knex<WorkspaceChannel>('workspace_channels').insert([
    {
      id: 'c10f6feb-7e45-4bf8-9c84-95e2bdf7c943',
      workspace_id: '0a5770b5-c790-450e-acb6-a411c69dbcae',
      name: 'general',
      private: false,
      default: true,
    },
    {
      id: '1994213d-868f-4f7a-9c40-c01b4071b760',
      workspace_id: '0a5770b5-c790-450e-acb6-a411c69dbcae',
      name: 'music',
      private: false,
      default: false,
    },
  ]);
}
