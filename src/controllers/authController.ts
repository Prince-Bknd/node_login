import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export async function login(req: Request, res: Response) {
	const { email, password } = req.body as { email?: string; password?: string };
	if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
	try {
		const result = await authService.loginWithEmailPassword(email, password);
		return res.json(result);
	} catch (err: any) {
		return res.status(401).json({ error: err?.message || 'Invalid credentials' });
	}
}

export async function register(req: Request, res: Response) {
	const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
	if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
	try {
		const result = await authService.registerUser(email, password, name);
		return res.json(result);
	} catch (err: any) {
		if (err?.message === 'User already exists') {
			return res.status(409).json({ error: 'User already exists' });
		}
		return res.status(400).json({ error: err?.message || 'Registration failed' });
	}
}


