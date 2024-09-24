import { envConfig } from '../../apps/webapp/src/config/env.config';
import { DataSource, DataSourceOptions } from 'typeorm';

const options = {
  type: 'postgres',
  host: envConfig.PG_HOST,
  port: envConfig.PG_PORT,
  username: envConfig.PG_USERNAME,
  password: envConfig.PG_PASSWORD,
  database: envConfig.PG_DATABASE,
  synchronize: false,
  migrationsRun: false,
  migrations: ['./db/postgres/migrations/*.{js,ts}'],
} as DataSourceOptions;

export default new DataSource(options);
