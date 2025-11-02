require('dotenv/config');
const { execSync } = require('child_process');
const url = require('url');

async function ensureDatabase() {
  const client = process.env.DB_CLIENT || 'sqlite3';
  
  if (client === 'mysql2' || client === 'mysql') {
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
    console.log(`✓ Ensured MySQL database exists: ${dbName}`);
  } else if (client === 'pg' || client === 'postgres' || client === 'postgresql') {
    // PostgreSQL database creation would need to be done manually or via psql
    console.log('✓ PostgreSQL database should exist. Please create it manually if needed.');
  } else if (client === 'sqlite3') {
    // SQLite database is created automatically on first connection
    console.log('✓ SQLite database will be created automatically');
  } else {
    console.log(`⚠ Database client "${client}" - ensure database exists manually`);
  }
}

async function runMigrations() {
  console.log('\n📦 Running database migrations...');
  try {
    execSync('npm run migrate', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✓ Migrations completed successfully');
  } catch (error) {
    console.error('✗ Migration failed:', error.message);
    throw error;
  }
}

async function runSeeds() {
  console.log('\n🌱 Seeding database...');
  try {
    execSync('npm run seed', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✓ Seeding completed successfully');
  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Setting up database...\n');
    
    console.log('📋 Step 1: Ensuring database exists...');
    await ensureDatabase();
    
    await runMigrations();
    await runSeeds();
    
    console.log('\n✅ Database setup completed successfully!');
    console.log('You can now start the server with: npm run dev\n');
  } catch (err) {
    console.error('\n❌ Database setup failed:', err.message);
    process.exit(1);
  }
}

main();

