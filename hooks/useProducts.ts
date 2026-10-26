import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '../db/client';
import { products } from '../db/schema';
import { asc } from 'drizzle-orm';

export function useProducts() {
  const query = useLiveQuery(db.select().from(products).orderBy(asc(products.name)));
  const list = query.data ?? [];
  const pendingCount = list.filter(p => !p.syncedAt || p.syncedAt < p.updatedAt).length;
  const units = list.reduce((sum, p) => sum + p.quantity, 0);
  const value = list.reduce((sum, p) => sum + p.quantity * p.price, 0);
  return { products: list, pendingCount, units, value, loading: query.error == null && query.data == null };
}
