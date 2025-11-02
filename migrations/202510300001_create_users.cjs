/** @param {import('knex').Knex} knex */
exports.up = async function up(knex) {
  const exists = await knex.schema.hasTable('users');
  if (exists) return;
  
  // Use string for id to support all databases (UUID stored as string)
  await knex.schema.createTable('users', (t) => {
    const client = knex.client.config.client;
    if (client === 'mysql2' || client === 'mysql') {
      // MySQL: Use VARCHAR(36) for UUID
      t.string('id', 36).primary();
    } else {
      // PostgreSQL, SQLite: Use UUID type
      t.uuid('id').primary();
    }
    t.string('email').notNullable().unique();
    t.string('name');
    t.enu('role', ['admin', 'user']).notNullable().defaultTo('user');
    t.string('password_hash').notNullable();
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

/** @param {import('knex').Knex} knex */
exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('users');
};


