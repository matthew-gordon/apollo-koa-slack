import { genSaltSync, hashSync } from 'bcryptjs';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const salt = genSaltSync();
  const hash = hashSync('password123', salt);

  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: '80a8a2c3-dbb0-47d4-9d1a-3864785fec51',
      username: 'gordo',
      email: 'matt@email.com',
      password: hash,
      first_name: 'matt',
      last_name: 'gordon',
    },
  ]);
}
