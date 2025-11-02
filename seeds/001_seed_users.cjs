const bcrypt = require('bcryptjs');
require('dotenv/config');
const crypto = require('crypto');

/** @param {import('knex').Knex} knex */
exports.seed = async function seed(knex) {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await knex('users').where({ email: adminEmail }).first();
  if (existing) return;

  const id = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await knex('users').insert({
    id,
    email: adminEmail,
    name: 'Admin',
    role: 'admin',
    password_hash: passwordHash,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });
};


