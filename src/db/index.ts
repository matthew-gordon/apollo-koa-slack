import knex from 'knex';
import connection from '../../knexfile';
import { NODE_ENV } from '../config';

const ENV = NODE_ENV || 'development';

export default knex(connection[ENV]);
