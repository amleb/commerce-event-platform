import { drizzle } from 'drizzle-orm/node-postgres';
import { orderServiceConfig } from '../config/service.config';
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: orderServiceConfig.dbUrl,
});

export const db = drizzle(pool);
