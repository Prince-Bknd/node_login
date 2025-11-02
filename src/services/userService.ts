import { getKnex } from '../db/knex.js';
import crypto from 'crypto';

export type UserRecord = {
  id: string;
  email: string;
  name: string | null;
  role: 'admin' | 'user';
  password_hash: string;
  created_at: string;
  updated_at: string;
};

export async function getUserByEmail(email: string): Promise<UserRecord | undefined> {
  const db = getKnex();
  const row = await db<UserRecord>('users').where({ email }).first();
  return row;
}

export async function createUser(data: {
  email: string;
  name?: string;
  password_hash: string;
  role?: 'admin' | 'user';
}): Promise<UserRecord> {
  const db = getKnex();
  const id = crypto.randomUUID();
  const userData = {
    id,
    email: data.email.toLowerCase(),
    name: data.name || null,
    role: data.role || 'user',
    password_hash: data.password_hash,
    created_at: db.fn.now(),
    updated_at: db.fn.now(),
  };
  
  await db<UserRecord>('users').insert(userData);
  const newUser = await getUserByEmail(data.email.toLowerCase());
  if (!newUser) throw new Error('Failed to create user');
  return newUser;
}


