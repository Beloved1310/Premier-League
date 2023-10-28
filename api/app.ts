import express, { Application, Request, Response } from 'express';
import user from './routes/user';
import team from './routes/team';
import fixture from './routes/fixture';
import cors from 'cors';
import { config } from 'dotenv';
import rateLimit from 'express-rate-limit';
config();

declare global {
  namespace Express {
    interface Request {
      user?: {};
    }
  }
}

const app: Application = express();


const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100,
  message: 'Too many requests, please try again later.',
});

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.send('OK');
});

app.use('/user', limiter, user); 
app.use('/team', limiter, team);
app.use('/fixture', limiter, fixture);

export default app;
