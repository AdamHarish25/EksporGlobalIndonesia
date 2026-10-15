-- ============================================================================
-- Harvestora Global Indonesia — Supabase Phase 3 (site_content, solutions, audit)
-- Cara pakai: SQL Editor → New query → paste file ini → Run (SETELAH schema.sql).
-- Idempotent: IF NOT EXISTS / DROP ... IF EXISTS.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. site_content — teks situs yang bisa diubah editor ("ganti kata")
-- ----------------------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  value text not null default '',
  label text not null default '',
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_site_content_touch on public.site_content;
create trigger trg_site_content_touch
  before update on public.site_content
  for each row execute function public.touch_updated_at();

alter table public.site_content enable row level security;

-- Copy situs bersifat publik → semua boleh baca; tulis hanya editor+.
drop policy if exists sc_select on public.site_content;
create policy sc_select on public.site_content for select using (true);
drop policy if exists sc_write on public.site_content;
create policy sc_write on public.site_content for all
  using (public.has_role('editor')) with check (public.has_role('editor'));

-- ----------------------------------------------------------------------------
-- 2. solutions — halaman Solutions (carousel multibahasa tetap statis di kode)
-- ----------------------------------------------------------------------------
create table if not exists public.solutions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon_name text not null default 'package',
  title text not null,
  description text not null default '',
  long_desc text not null default '',
  features text[] not null default '{}',
  cta text not null default '',
  image text not null default '',
  image_alt text not null default '',
  show_form boolean not null default false,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  sort_order int not null default 0,
  updated_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_solutions_touch on public.solutions;
create trigger trg_solutions_touch
  before update on public.solutions
  for each row execute function public.touch_updated_at();

alter table public.solutions enable row level security;

drop policy if exists s_select on public.solutions;
create policy s_select on public.solutions for select
  using (status = 'published' or public.has_role('editor'));
drop policy if exists s_insert on public.solutions;
create policy s_insert on public.solutions for insert
  with check (public.has_role('editor'));
drop policy if exists s_update on public.solutions;
create policy s_update on public.solutions for update
  using (public.has_role('editor')) with check (public.has_role('editor'));
drop policy if exists s_delete on public.solutions;
create policy s_delete on public.solutions for delete
  using (public.has_role('editor'));

-- ----------------------------------------------------------------------------
-- 3. audit_logs — siapa mengubah apa (ditulis trigger, dibaca admin saja)
-- ----------------------------------------------------------------------------
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  at timestamptz not null default now(),
  actor uuid references auth.users (id),
  action text not null check (action in ('insert', 'update', 'delete')),
  table_name text not null,
  row_id text not null default '',
  old_data jsonb,
  new_data jsonb
);

create or replace function public.log_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row_id text;
begin
  v_row_id := coalesce(
    (to_jsonb(coalesce(NEW, OLD)) ->> 'id'),
    (to_jsonb(coalesce(NEW, OLD)) ->> 'key'),
    ''
  );
  insert into public.audit_logs (actor, action, table_name, row_id, old_data, new_data)
  values (
    auth.uid(),
    lower(TG_OP),
    TG_TABLE_NAME,
    v_row_id,
    case when TG_OP in ('UPDATE', 'DELETE') then to_jsonb(OLD) else null end,
    case when TG_OP in ('INSERT', 'UPDATE') then to_jsonb(NEW) else null end
  );
  return coalesce(NEW, OLD);
end $$;

-- Pasang trigger audit ke tabel yang dikelola editor (drop dulu agar idempotent)
do $$
declare t text;
begin
  foreach t in array array['products', 'product_specs', 'product_packaging', 'solutions', 'site_content'] loop
    execute format('drop trigger if exists trg_audit_%s on public.%I', t, t);
    execute format(
      'create trigger trg_audit_%s after insert or update or delete on public.%I for each row execute function public.log_changes()',
      t, t
    );
  end loop;
end $$;

alter table public.audit_logs enable row level security;

-- Hanya admin boleh membaca log. Tidak ada policy tulis via API
-- (trigger SECURITY DEFINER menulis langsung, melewati RLS).
drop policy if exists al_select on public.audit_logs;
create policy al_select on public.audit_logs for select
  using (public.has_role('admin'));

-- ----------------------------------------------------------------------------
-- 4. Realtime untuk tabel baru
-- ----------------------------------------------------------------------------
alter table public.solutions replica identity full;
alter table public.site_content replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'solutions'
  ) then
    alter publication supabase_realtime add table public.solutions;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'site_content'
  ) then
    alter publication supabase_realtime add table public.site_content;
  end if;
end $$;
