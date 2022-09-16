import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table.text('username').unique().notNullable().index();
    table.text('email').unique().notNullable().index();
    table.text('password').notNullable();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
