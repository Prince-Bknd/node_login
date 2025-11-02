import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { DBConfig } from '../config/config.js';
import { getUserByEmail } from '../services/userService.js';

export const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  const user = await getUserByEmail(email.toLowerCase());
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, DBConfig.jwtSecret, { expiresIn: '7d' });
  return res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});


