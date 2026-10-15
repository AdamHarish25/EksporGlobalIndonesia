-- ============================================================================
-- Harvestora Global Indonesia — Supabase Phase 4 (supplier_registrations)
-- Cara pakai: SQL Editor → New query → paste file ini → Run.
-- Idempotent: IF NOT EXISTS / DROP ... IF EXISTS.
--
-- Desain privasi: data supplier mengandung kontak pribadi → TIDAK ada read publik.
--   - INSERT: anon boleh (formulir publik).
--   - SELECT/UPDATE/DELETE: editor+ saja.
--   - Tampilan ke buyer nanti memakai baris status='approved' + field aman saja
--     (ditentukan di phase berikutnya, bukan tabel ini secara langsung).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Tabel registrasi supplier
-- ----------------------------------------------------------------------------
create table if not exists public.supplier_registrations (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  company_type text not null default '',
  factory_location text not null default '',
  product text not null,
  product_details text not null default '',
  production_capacity text not null default '',
  moq text not null default '',
  packaging text not null default '',
  certifications text not null default '',
  export_experience text not null default '',
  website text not null default '',
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null default '',
  message text not null default '',
  product_photos text[] not null default '{}',
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_supplier_reg_touch on public.supplier_registrations;
create trigger trg_supplier_reg_touch
  before update on public.supplier_registrations
  for each row execute function public.touch_updated_at();

alter table public.supplier_registrations enable row level security;

-- Publik (anon): hanya INSERT. Baca/ubah/hapus = editor+.
drop policy if exists sr_insert on public.supplier_registrations;
create policy sr_insert on public.supplier_registrations for insert
  with check (true);
drop policy if exists sr_select on public.supplier_registrations;
create policy sr_select on public.supplier_registrations for select
  using (public.has_role('editor'));
drop policy if exists sr_update on public.supplier_registrations;
create policy sr_update on public.supplier_registrations for update
  using (public.has_role('editor')) with check (public.has_role('editor'));
drop policy if exists sr_delete on public.supplier_registrations;
create policy sr_delete on public.supplier_registrations for delete
  using (public.has_role('editor'));

-- ----------------------------------------------------------------------------
-- 2. Storage bucket supplier-photos (private; upload anon, baca editor+)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('supplier-photos', 'supplier-photos', false)
on conflict (id) do nothing;

-- Upload dari formulir publik: anon boleh INSERT saja.
drop policy if exists sp_insert on storage.objects;
create policy sp_insert on storage.objects for insert
  with check (bucket_id = 'supplier-photos');
-- Baca/ubah/hapus file: editor+ saja.
drop policy if exists sp_select on storage.objects;
create policy sp_select on storage.objects for select
  using (bucket_id = 'supplier-photos' and public.has_role('editor'));
drop policy if exists sp_update on storage.objects;
create policy sp_update on storage.objects for update
  using (bucket_id = 'supplier-photos' and public.has_role('editor'))
  with check (bucket_id = 'supplier-photos' and public.has_role('editor'));
drop policy if exists sp_delete on storage.objects;
create policy sp_delete on storage.objects for delete
  using (bucket_id = 'supplier-photos' and public.has_role('editor'));

-- ----------------------------------------------------------------------------
-- 3. Audit trigger (tambah ke tabel ini juga)
-- ----------------------------------------------------------------------------
do $$
begin
  execute 'drop trigger if exists trg_audit_supplier_registrations on public.supplier_registrations';
  execute 'create trigger trg_audit_supplier_registrations after insert or update or delete on public.supplier_registrations for each row execute function public.log_changes()';
end $$;

-- ----------------------------------------------------------------------------
-- 4. Realtime (untuk daftar admin yang live)
-- ----------------------------------------------------------------------------
alter table public.supplier_registrations replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'supplier_registrations'
  ) then
    alter publication supabase_realtime add table public.supplier_registrations;
  end if;
end $$;
