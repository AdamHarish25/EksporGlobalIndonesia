-- ============================================================================
-- Harvestora Global Indonesia — Phase 5 (direktori partner publik)
-- Cara pakai: SQL Editor → New query → paste file ini → Run.
--
-- supplier_registrations TIDAK boleh dibaca publik langsung (ada kontak pribadi +
-- pesan internal + status kurasi). Halaman buyer membaca VIEW ini yang hanya
-- berisi kolom aman dari baris status='approved'.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. View publik: hanya supplier approved, hanya kolom aman
-- ----------------------------------------------------------------------------
create or replace view public.supplier_directory
with (security_invoker = false) as
select
  id,
  company_name,
  company_type,
  factory_location,
  product,
  product_details,
  production_capacity,
  moq,
  packaging,
  certifications,
  export_experience,
  website,
  contact_name,
  contact_email,
  contact_phone,
  product_photos,
  created_at
from public.supplier_registrations
where status = 'approved';

-- View berjalan sebagai owner (melewati RLS tabel induk yang tertutup),
-- lalu akses dikunci via GRANT: anon + user login hanya boleh SELECT.
-- (RLS tidak didukung untuk view — itu sebabnya dipakai pola GRANT ini.
--  Tanpa GRANT INSERT/UPDATE/DELETE, view tidak bisa dipakai untuk menulis
--  walau view sederhana pada dasarnya updatable.)
revoke all on public.supplier_directory from anon, authenticated;
grant select on public.supplier_directory to anon, authenticated;

-- ----------------------------------------------------------------------------
-- 2. Foto produk supplier bisa tampil di halaman publik
--    (path acak tak tertebak; hanya foto dari baris approved yang di-render)
-- ----------------------------------------------------------------------------
drop policy if exists sp_public_read on storage.objects;
create policy sp_public_read on storage.objects for select
  using (bucket_id = 'supplier-photos');

-- ----------------------------------------------------------------------------
-- 3. Realtime untuk direktori (perubahan status → approved langsung tampil)
-- ----------------------------------------------------------------------------
-- (supplier_registrations sudah masuk publikasi di phase4-suppliers.sql.)
