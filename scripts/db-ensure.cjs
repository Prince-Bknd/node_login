require('dotenv/config');

const url = require('url');

async function ensureMySqlDatabase() {
  const mysql = require('mysql2/promise');
  const connUrl = process.env.DB_URL;
  if (!connUrl) throw new Error('DB_URL is not set');
  const parsed = new url.URL(connUrl);
  const dbName = (parsed.pathname || '').replace(/^\//, '') || 'chatbot';

  const baseConfig = {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username || ''),
    password: decodeURIComponent(parsed.password || ''),
    multipleStatements: false,
  };

  const connection = await mysql.createConnection(baseConfig);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await connection.end();
  // eslint-disable-next-line no-console
  console.log(`Ensured MySQL database exists: ${dbName}`);
}

async function ensurePostgreSQLDatabase() {
  console.log('PostgreSQL database should be created manually.');
  console.log('To create: createdb -U username database_name');
}

async function main() {
  const client = process.env.DB_CLIENT || 'sqlite3';
  
  if (client === 'mysql2' || client === 'mysql') {
    await ensureMySqlDatabase();
  } else if (client === 'pg' || client === 'postgres' || client === 'postgresql') {
    await ensurePostgreSQLDatabase();
  } else if (client === 'sqlite3') {
    console.log('SQLite database will be created automatically on first connection.');
  } else {
    console.log(`Database client "${client}" - please ensure database exists manually.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


