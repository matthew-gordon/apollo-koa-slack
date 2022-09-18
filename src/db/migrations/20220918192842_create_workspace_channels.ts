import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('workspace_channels', (table) => {
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
    table.text('name').notNullable();
    table.boolean('default').notNullable().defaultTo(false);
    table.boolean('private').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('workspace_channels');
}
