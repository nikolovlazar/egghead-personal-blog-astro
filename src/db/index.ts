import Database from 'better-sqlite3';
import {
  drizzle,
  type BetterSQLite3Database,
} from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const sqlite = new Database(process.env.DATABASE_URL || './local.db');

export const db: BetterSQLite3Database = drizzle(sqlite, { logger: true });
migrate(db, { migrationsFolder: 'src/db/migrations' });

export { likes } from './schema';
