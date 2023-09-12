import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/index.ts',
  out: './src/db/migrations',
  driver: 'better-sqlite',
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL || './local.db',
  },
} satisfies Config;
