import { Knex } from 'knex';
import { join } from 'path';

const defaultOptions: Knex.Config = {
  client: 'pg',
  connection: {
    database: 'apollo_koa_slack',
  },
  migrations: {
    directory: join(__dirname, 'src', 'db', 'migrations'),
  },
  seeds: {
    directory: join(__dirname, 'src', 'db', 'seeds'),
  },
  pool: {
    min: 2,
    max: 10,
  },
};

const connection: { [key: string]: Knex.Config } = {
  development: config({
    connection: {
      database: 'apollo_koa_slack',
    },
  }),

  test: config({
    connection: {
      database: 'apollo_koa_slack_test',
    },
  }),
};

export default connection;

function config(overrides: Knex.Config): Knex.Config {
  return Object.assign({}, defaultOptions, overrides);
}
