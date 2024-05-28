import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../../db/schemas/schema';

const sqlite = new Database('./db/database.db');
export default drizzle(sqlite, {schema});
