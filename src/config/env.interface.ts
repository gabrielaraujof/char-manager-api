import { DotenvParseOutput } from 'dotenv/types';

export interface IEnv extends DotenvParseOutput {
  DB_URI: 'string',
  BASE_URL: 'string',
  CLIENT_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  JWT_SECRET: string;
}
