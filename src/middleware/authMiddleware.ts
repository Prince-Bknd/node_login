import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = header.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, env.jwtSecret) as any;
    // @ts-expect-error augment
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}




