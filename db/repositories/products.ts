import { eq, lt, or, sql } from 'drizzle-orm';
import * as Crypto from 'expo-crypto';
import { db } from '../client';
import { products } from '../schema';

export type Product = typeof products.$inferSelect;

export async function listProducts() { return db.select().from(products).orderBy(products.name); }
export async function getProduct(id: number) { const [p] = await db.select().from(products).where(eq(products.id, id)); return p; }
export async function saveProduct(input: { id?: number; name: string; quantity: number; price: number }) {
  const updatedAt = new Date();
  if (input.id) {
    await db.update(products).set({ name: input.name.trim(), quantity: input.quantity, price: input.price, updatedAt }).where(eq(products.id, input.id));
  } else {
    await db.insert(products).values({ clientId: Crypto.randomUUID(), name: input.name.trim(), quantity: input.quantity, price: input.price, updatedAt });
  }
}
export async function deleteProduct(id: number) { await db.delete(products).where(eq(products.id, id)); }
export async function getPendingProducts() {
  return db.select().from(products).where(or(sql`${products.syncedAt} is null`, lt(products.syncedAt, products.updatedAt)));
}
export async function addCloudProduct(p: { clientId: string; name: string; quantity: number; price: number; updatedAt: Date }) {
  await db.insert(products).values({ ...p, updatedAt: p.updatedAt, syncedAt: p.updatedAt }).onConflictDoNothing({ target: products.clientId });
}
export async function markSynced(id: number, timestamp: Date) { await db.update(products).set({ syncedAt: timestamp }).where(eq(products.id, id)); }
export async function getTotals() {
  const [row] = await db.select({ units: sql<number>`coalesce(sum(${products.quantity}), 0)`, value: sql<number>`coalesce(sum(${products.quantity} * ${products.price}), 0)`, count: sql<number>`count(*)` }).from(products);
  return row;
}
