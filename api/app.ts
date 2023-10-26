import express, { Application, Request, Response } from 'express';
import user from './routes/user';

import cors from 'cors';
import { config } from 'dotenv';
config();

declare global {
  namespace Express {
    interface Request {
      user?: {};
    }
  }
}

const app: Application = express();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.send('OK');
});

app.use('/user', user);

export default app;