import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('workspace_members', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table
      .uuid('workspace_id')
      .notNullable()
      .references('workspaces.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .uuid('member_id')
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamp('last_seen').defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('workspace_members');
}
