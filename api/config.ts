import path from 'path';
import { config as dotenv } from 'dotenv';
import { IConfig } from './interfaces/iConfig';

const { env } = process;

dotenv({
  path: path.resolve(__dirname, '../.env'),
});

export const config: IConfig = {
  JWT: <string>env.JWT_SECRET,
  PORT: parseInt(env.PORT!, 10) || 8000,
  MONGODBURI: <string>env.MONGODBURI,
  REDIS_HOST: <string>env.REDIS_HOST,
  REDIS_PASSWORD: <string>env.REDIS_PASSWORD,
  REDIS_PORT: parseInt(env.REDIS_PORT!)
};