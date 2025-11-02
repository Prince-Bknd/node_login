import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { getUserByEmail, createUser } from './userService.js';

export async function loginWithEmailPassword(email: string, password: string) {
  const user = await getUserByEmail(email.toLowerCase());
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');
  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.jwtSecret, { expiresIn: '7d' });
  return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
}

export async function registerUser(email: string, password: string, name?: string) {
  const existingUser = await getUserByEmail(email.toLowerCase());
  if (existingUser) throw new Error('User already exists');
  
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password_hash: passwordHash, name, role: 'user' });
  
  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.jwtSecret, { expiresIn: '7d' });
  return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
}




