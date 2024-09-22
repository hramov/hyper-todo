import { cleanEnv, port, str } from 'envalid';

export const envConfig = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  BOT_TOKEN: str({ default: '' }),
});
