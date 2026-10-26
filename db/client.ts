import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

export const sqlite = SQLite.openDatabaseSync('mi-tienda.db', { enableChangeListener: true });
export const db = drizzle(sqlite, { schema });
