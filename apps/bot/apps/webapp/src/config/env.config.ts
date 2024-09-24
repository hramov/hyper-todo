import { config } from 'dotenv';
config();

import { cleanEnv, port, str } from 'envalid';

export const envConfig = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  BOT_TOKEN: str({ default: '' }),

  PG_HOST: str({ default: 'localhost' }),
  PG_PORT: port({ default: 5432 }),
  PG_USERNAME: str({ default: 'postgres' }),
  PG_PASSWORD: str({ default: 'postgres' }),
  PG_DATABASE: str({ default: 'webapp' }),
});
