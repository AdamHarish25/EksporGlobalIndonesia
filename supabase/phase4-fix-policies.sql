-- ============================================================================
-- FIX darurat: policy tabel supplier_registrations saja (tanpa yang lain).
-- Cara pakai: SQL Editor → New query → paste file ini → Run.
-- Kalau muncul tulisan MERAH, copy pesannya — itu petunjuk masalahnya.
-- Kalau sukses semua: INSERT anon langsung bisa.
-- ============================================================================

alter table public.supplier_registrations enable row level security;

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

-- Diagnostik: harus muncul 4 baris (sr_insert/_select/_update/_delete).
select policyname, cmd from pg_policies where tablename = 'supplier_registrations';
