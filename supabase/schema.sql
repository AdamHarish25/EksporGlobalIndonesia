-- ============================================================================
-- Harvestora Global Indonesia — Supabase Phase 0 Schema
-- Cara pakai: Supabase Dashboard → SQL Editor → New query → paste file ini → Run
-- Aman dijalankan ulang (idempotent: IF NOT EXISTS / DROP POLICY IF EXISTS).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. Extension untuk UUID (umumnya sudah aktif; aman diulang)
-- ----------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. Tabel roles (RBAC)
-- ----------------------------------------------------------------------------
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

-- Helper: true jika user login punya role tersebut.
-- 'admin' otomatis lolos cek 'editor' (implikasi peran).
create or replace function public.has_role(required text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid()
      and (role = required or role = 'admin')
  );
$$;

-- ----------------------------------------------------------------------------
-- 2. Tabel katalog produk
-- ----------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default '',
  category_color text not null default 'brand'
    check (category_color in ('brand', 'gold', 'slate')),
  short_description text not null default '',
  description text not null default '',
  applications text[] not null default '{}',
  moq text not null default 'Available upon request',
  supply_capacity text not null default 'Subject to supplier confirmation',
  origin text not null default 'Indonesia',
  image_url text not null default '',
  gallery text[] not null default '{}',
  incoterms text[] not null default '{FOB}',
  destination_markets text[] not null default '{Global}',
  documentation text[] not null default '{}',
  certifications text[] not null default '{}',
  private_label boolean not null default false,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  updated_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_specs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  param text not null,
  value text not null,
  status text not null default 'TARGET'
    check (status in ('TARGET', 'VERIFIED', 'AVAILABLE')),
  unit text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_packaging (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  size text not null,
  pack text not null,
  detail text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- updated_at otomatis
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_products_touch on public.products;
create trigger trg_products_touch
  before update on public.products
  for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- 3. RLS: aktif + policies
-- ----------------------------------------------------------------------------
alter table public.user_roles enable row level security;
alter table public.products enable row level security;
alter table public.product_specs enable row level security;
alter table public.product_packaging enable row level security;

-- user_roles: baca milik sendiri / admin; tulis hanya admin
drop policy if exists ur_select on public.user_roles;
create policy ur_select on public.user_roles for select
  using (user_id = auth.uid() or public.has_role('admin'));
drop policy if exists ur_write on public.user_roles;
create policy ur_write on public.user_roles for all
  using (public.has_role('admin')) with check (public.has_role('admin'));

-- products: publik baca yang published; tulis editor+
drop policy if exists p_select on public.products;
create policy p_select on public.products for select
  using (status = 'published' or public.has_role('editor'));
drop policy if exists p_insert on public.products;
create policy p_insert on public.products for insert
  with check (public.has_role('editor'));
drop policy if exists p_update on public.products;
create policy p_update on public.products for update
  using (public.has_role('editor')) with check (public.has_role('editor'));
drop policy if exists p_delete on public.products;
create policy p_delete on public.products for delete
  using (public.has_role('editor'));

-- specs & packaging: ikut visibilitas produk induknya; tulis editor+
drop policy if exists ps_select on public.product_specs;
create policy ps_select on public.product_specs for select
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id
        and (p.status = 'published' or public.has_role('editor'))
    )
  );
drop policy if exists ps_write on public.product_specs;
create policy ps_write on public.product_specs for all
  using (public.has_role('editor')) with check (public.has_role('editor'));

drop policy if exists pp_select on public.product_packaging;
create policy pp_select on public.product_packaging for select
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id
        and (p.status = 'published' or public.has_role('editor'))
    )
  );
drop policy if exists pp_write on public.product_packaging;
create policy pp_write on public.product_packaging for all
  using (public.has_role('editor')) with check (public.has_role('editor'));

-- ----------------------------------------------------------------------------
-- 4. Storage bucket product-images (publik baca, tulis editor+)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists pi_read on storage.objects;
create policy pi_read on storage.objects for select
  using (bucket_id = 'product-images');
drop policy if exists pi_write on storage.objects;
create policy pi_write on storage.objects for all
  using (bucket_id = 'product-images' and public.has_role('editor'))
  with check (bucket_id = 'product-images' and public.has_role('editor'));

-- ----------------------------------------------------------------------------
-- 5. Realtime: ikutkan tabel katalog (payload update/delete lengkap)
-- ----------------------------------------------------------------------------
alter table public.products replica identity full;
alter table public.product_specs replica identity full;
alter table public.product_packaging replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'products'
  ) then
    alter publication supabase_realtime add table public.products;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'product_specs'
  ) then
    alter publication supabase_realtime add table public.product_specs;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'product_packaging'
  ) then
    alter publication supabase_realtime add table public.product_packaging;
  end if;
end $$;
