import knex, { Knex } from 'knex';
import { DBConfig } from '../config/config.js';

let knexInstance: Knex | null = null;

export function getKnex(): Knex {
  if (knexInstance) return knexInstance;
  const client = DBConfig.dbClient;
  const dbUrl = DBConfig.dbUrl;
  knexInstance = knex({
    client,
    connection: client === 'sqlite3' ? { filename: dbUrl.replace('file:', '') } : dbUrl,
    useNullAsDefault: client === 'sqlite3',
    pool: { min: 0, max: 10 },
  });
  return knexInstance;
}


