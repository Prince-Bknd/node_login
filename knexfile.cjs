require('dotenv/config');

const base = {
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  }
};

const client = process.env.DB_CLIENT || 'sqlite3';
const dbUrl = process.env.DB_URL || 'file:./dev.db';

const config = {
  client,
  connection:
    client === 'sqlite3'
      ? { filename: dbUrl.replace('file:', '') }
      : dbUrl,
  useNullAsDefault: client === 'sqlite3',
  pool: { min: 0, max: 10 },
  ...base
};

module.exports = config;


