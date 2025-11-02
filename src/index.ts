import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiRouter } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'chatbot-automation-backend' });
});

app.use('/api', apiRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});


