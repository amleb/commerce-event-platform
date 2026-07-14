import { defineConfig } from 'drizzle-kit';
import { orderServiceConfig } from './src/config/service.config';

export default defineConfig({
  schema: './src/persistence/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: orderServiceConfig.dbUrl,
  },
});
