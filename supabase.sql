create table if not exists public.products (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  client_id uuid not null unique,
  name text not null,
  quantity integer not null check (quantity >= 0),
  price integer not null check (price >= 0),
  updated_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
drop policy if exists "ver los mios" on public.products;
create policy "ver los mios" on public.products for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "crear los mios" on public.products;
create policy "crear los mios" on public.products for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "editar los mios" on public.products;
create policy "editar los mios" on public.products for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "borrar los mios" on public.products;
create policy "borrar los mios" on public.products for delete to authenticated using ((select auth.uid()) = user_id);
