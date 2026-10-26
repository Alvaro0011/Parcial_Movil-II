import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { products } from '../db/schema';
import { getPendingProducts, markSynced } from '../db/repositories/products';
import { supabase } from '../lib/supabase';

export async function syncProducts(userId: string) {
  const { data, error } = await supabase.from('products').select('*').eq('user_id', userId);
  if (error) throw error;
  let downloaded = 0;
  for (const p of data ?? []) {
    const [local] = await db.select().from(products).where(eq(products.clientId, p.client_id));
    if (!local) {
      const updatedAt = new Date(p.updated_at);
      await db.insert(products).values({ clientId: p.client_id, name: p.name, quantity: p.quantity, price: p.price, updatedAt, syncedAt: updatedAt });
      downloaded++;
    }
  }
  const pending = await getPendingProducts();
  let uploaded = 0;
  for (const p of pending) {
    const uploadedAt = p.updatedAt;
    const { error: upsertError } = await supabase.from('products').upsert({ client_id: p.clientId, name: p.name, quantity: p.quantity, price: p.price, updated_at: uploadedAt.toISOString() }, { onConflict: 'client_id' });
    if (upsertError) throw upsertError;
    await markSynced(p.id, uploadedAt);
    uploaded++;
  }
  return { uploaded, downloaded };
}
