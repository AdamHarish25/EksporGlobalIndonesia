# Supabase RBAC + Realtime Content Management — Implementation Plan

> Status dokumen: **Planning (belum dieksekusi)**
> Dibuat: 2026-10-15
> Terkait: `docs/Changelog.md` (catat versi saat tiap phase selesai)

Tujuan: management seluruh aset website (ganti kata, tambah/ubah katalog produk) dengan
**Role-Based Access Control (RBAC)** memakai **Supabase**, **realtime tanpa VPS tambahan**.

---

## 1. Keputusan yang Sudah Disepakati

| Topik | Keputusan |
|---|---|
| Scope Phase 1 | Katalog produk dulu (products + specs + foto) |
| Login admin | Email + password |
| Tier Supabase | Free dulu (`$0`) — fallback statis melindungi situs saat project pause |

---

## 2. Arsitektur (Serverless, Tanpa VPS)

```text
Browser (Vite SPA — tetap di Netlify seperti sekarang)
 │
 ├─ Halaman publik ──► Supabase PostgREST (anon key, RLS: read-only)
 │                      + Realtime subscription (produk berubah → tampil otomatis)
 │
 └─ /admin/* (route terkunci) ──► Supabase Auth (email + password)
                                  + PostgREST (RLS by role) + Storage (upload foto)

Supabase project (Free): Postgres + RLS │ Auth │ Realtime │ Storage
```

Prinsip keamanan: anon key memang publik by design — keamanan murni di **RLS**,
bukan di frontend. `service_role` key **tidak pernah** dipakai di frontend.

---

## 3. Desain RBAC

| Aktor | Hak akses |
|---|---|
| Pengunjung (anonim) | `SELECT` hanya baris `status = 'published'` |
| `editor` | + `INSERT/UPDATE/DELETE` produk, specs, packaging, upload foto |
| `admin` | + semua hak editor + kelola role user lain |

Mekanisme:

- [ ] Tabel `user_roles (user_id → auth.users, role: 'admin' | 'editor')`
- [ ] Function `has_role(required)` dengan `SECURITY DEFINER` (baca `auth.uid()`, anti-spoof)
- [ ] Policy `products` / `product_specs` / `product_packaging`:
  - `SELECT`: `status = 'published'` (publik) **atau** `has_role('editor')` (lihat draft)
  - `INSERT / UPDATE / DELETE`: `has_role('editor')`
- [ ] Policy `user_roles`: tulis hanya `admin`
- [ ] Policy Storage bucket `product-images`: read publik, write editor/admin
- [ ] `ProtectedRoute` di React (cek session + role) — hanya UX, keamanan tetap di RLS
- [ ] Admin pertama dibuat manual via Supabase dashboard, sisanya invite dari panel

---

## 4. Data Model Phase 1

```sql
products (
  id, slug UNIQUE, name, category, category_color,
  short_description, description, moq, supply_capacity,
  origin, image_url, status: 'draft' | 'published',
  updated_by, updated_at
)
product_specs (
  id, product_id → products, param, value,
  status: 'TARGET' | 'VERIFIED' | 'AVAILABLE', unit
)
product_packaging (
  id, product_id → products, size, pack, detail
)
-- Storage bucket: product-images (public read, write editor/admin)
```

Backlog (bukan Phase 1):

- [ ] `site_content (key, value)` — untuk "ganti kata"/teks halaman
- [ ] `solutions` — CRUD halaman Solutions
- [ ] `audit_logs` — siapa mengubah apa (via trigger), untuk akuntabilitas tim

---

## 5. Realtime (Tanpa VPS)

- [ ] Nyalakan Realtime untuk tabel Phase 1 (`REPLICA IDENTITY FULL` agar payload update/delete lengkap)
- [ ] Frontend subscribe: `supabase.channel(...).on('postgres_changes', ...)` → patch state / refetch otomatis
- [ ] Editor simpan di `/admin` → pengunjung yang sedang buka situs langsung melihat perubahan tanpa refresh
- [ ] Verifikasi RLS berlaku di channel Realtime (pengunjung hanya terima baris published)

> ⚠️ Limitasi diketahui: Google Translate menerjemahkan DOM saat load/pindah route —
> update realtime yang masuk *tanpa* pindah halaman bisa tetap English sampai user pindah
> halaman. Workaround (re-trigger translator) dibahas saat implementasi.

---

## 6. Strategi Migrasi (Situs Tidak Pernah Rusak)

- [ ] Seed sekali: data `PRODUCTS` saat ini (shallots, palm sugar, briquettes + specs + packaging) → Supabase via script SQL
- [ ] Dual-read: hook baru `useProducts()` / `useProduct(slug)` → coba Supabase dulu, **gagal → fallback ke konstanta statis** (`products.ts`)
- [ ] Foto lama di `public/` tetap jalan; upload baru masuk Storage (`image_url`)
- [ ] `products.ts` dipertahankan sebagai fallback sampai stabil, baru dipensiunkan
- [ ] Catat tiap progres di `docs/Changelog.md`

---

## 7. Checklist Eksekusi

### Phase 0 — Setup & Koneksi

- [x] Buat project Supabase (dilakukan pemilik akun di supabase.com)
- [x] Buat tabel `products`, `product_specs`, `product_packaging` + RLS + bucket `product-images`
- [x] Tambah `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) + Netlify env vars
- [x] Install `@supabase/supabase-js` + client singleton (`src/lib/supabase.ts`)
- [x] Seed data produk saat ini ke Supabase
- [x] Verifikasi: read publik sebagai anon jalan, write anon ditolak RLS

### Phase 1 — Public Read + Realtime

- [x] Hook `useProducts()` / `useProduct(slug)` + fallback statis
- [x] Pakai hook di: `ProductsPage`, `ProductDetailPage`, `HomePage`, `RequestQuotePage`
- [x] Subscribe Realtime + verifikasi channel handshake (`SUBSCRIBED ok`)
- [x] Verifikasi Google Translate tetap jalan di konten dinamis (render DOM normal, tanpa `notranslate`)
- [ ] QA manual end-to-end: ubah 1 kata di Table Editor → pastikan situs update tanpa refresh → kembalikan (butuh aksi pemilik akun, ~30 detik)
- [x] Update `docs/Changelog.md`

### Phase 2 — Auth + Admin Panel

- [x] `/admin/login` (email + password) + session handling (`AuthProvider`, persist localStorage)
- [x] `ProtectedRoute` (wajib login + peran cukup; halaman akses-ditolak + keluar)
- [x] `/admin/products`: tabel list (semua status via RLS) + tambah/ubah/hapus + preview link
- [x] `/admin/products/new` + `/admin/products/:id`: form info dasar, specs dinamis (status TARGET/VERIFIED/AVAILABLE), packaging dinamis, list koma, foto utama
- [x] Upload foto → Storage `product-images` → public URL ke `image_url`
- [x] Status `draft` / `published` + preview draft untuk editor (via URL publik `/products/:slug`, RLS memberi editor akses draft)
- [x] `supabase/make-admin.sql` untuk akun admin/editor pertama
- [x] Review RLS: anon read published + write ditolak; editor tulis katalog; `user_roles` tulis admin-only; `has_role()` SECURITY DEFINER (tanpa rekursi RLS)
- [x] Optimasi bundle: supabase-js hanya di chunk async (main bundle tetap ~218KB); `useAuth` lazy-import client
- [x] Navbar/Footer/WhatsApp disembunyikan di route `/admin/*`; link "Admin" muncul di navbar bila sudah login
- [x] Admin hanya untuk tablet–desktop: `AdminDesktopGate` (min-width 768px) di `/admin/login` + semua halaman terproteksi; mobile dapat pemberitahuan + tombol kembali
- [ ] QA pemilik akun: buat user admin → login → CRUD 1 produk → buat user editor → uji beda peran (lihat panduan di bawah)
- [x] Update `docs/Changelog.md`

### Phase 3 — CMS penuh (site_content, solutions, audit)

- [x] SQL: `supabase/phase3.sql` (site_content, solutions, audit_logs + trigger, RLS, realtime) + `supabase/seed-phase3.sql` (3 solutions, 7 keys)
- [x] Lib + hooks: `contentDb` + `useSiteContent`/`useContent`; `solutionsDb` + `useSolutions`/`useSolution` (fallback statis + merge carousel + preview draft)
- [x] Admin: `/admin/content` (edit per key), `/admin/solutions` + form, `/admin/logs` (admin-only, 100 terakhir); tab navigasi Products/Content/Solutions/Logs
- [x] Wiring publik: hero homepage (4 keys), footer (tagline + email + lokasi), kontak About (email + lokasi), `SolutionsPage`, `SolutionDetailPage`, section solutions homepage
- [x] `useProduct`/`useSolution` expose `loading` (halaman detail tunggu fetch draft sebelum 404/redirect)
- [x] Keep-alive: `.github/workflows/supabase-keepalive.yml` (butuh 2 GitHub secrets, lihat file)
- [x] **AKSI PEMILIK AKUN**: jalankan `phase3.sql` lalu `seed-phase3.sql` di SQL Editor (terverifikasi: `solutions` 3 published, `site_content` 7 keys, `audit_logs` tertutup untuk anon, write anon ditolak/no-op)
- [ ] QA: ubah 1 key di `/admin/content` → cek situs update realtime; CRUD 1 solution draft → preview → published → hapus; cek `/admin/logs` terisi
- [ ] Keputusan Free vs Pro (lihat Section 11)
- [x] Update `docs/Changelog.md`

---

## 8. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Project Free pause setelah 1 minggu idle | Fallback statis (situs tetap tampil); GitHub Actions ping terjadwal (gratis, bukan VPS) sebagai keep-alive; opsi upgrade Pro `$25/bln` |
| Anon key terekspos | Bukan masalah selama RLS benar — review + test policy per peran |
| Kuota Free terlampaui | Kuota saat ini longgar untuk katalog + traffic B2B (500MB DB, 1GB storage, 200 koneksi realtime, 2jt pesan/bln); monitor di dashboard |
| Konten realtime belum ke-translate instan | Limitasi kecil; workaround re-trigger translator saat implementasi |

---

## 11. Keputusan Tertunda (butuh pemilik akun)

### A. Fallback statis: DIPERTAHANKAN (rekomendasi), bukan dipensiunkan
Rencana awal menyebut pensiunkan `products.ts`/`solutions.ts` setelah stabil — saya
**menyarankan membatalkannya**: fallback adalah fitur keselamatan yang membuat situs
tetap tampil saat project Free pause atau DB gangguan (biaya: duplikasi data, manfaat:
situs tak pernah blank). Hapus fallback hanya jika sudah Pro + backup rutin.

### B. Free + keep-alive vs Pro $25/bln
| Opsi | Plus | Minus |
|---|---|---|
| Free + keep-alive ping (workflow sudah disiapkan) | $0 | Tetap bisa pause jika cron gagal; tanpa backup otomatis |
| Pro $25/bln | Tidak pernah pause, backup 7 hari, limit besar | Biaya bulanan |
Rekomendasi: **Free + keep-alive selama traffic B2B saat ini**; pindah Pro saat ada
transaksi/order rutin lewat situs atau butuh backup formal.

---

## 12. Phase 4 — Supplier Registration (database pendaftar)

Tujuan: form `/for-suppliers` menyimpan ke database (bukan cuma email), disiapkan
untuk ditampilkan ke buyer di phase berikutnya (status `approved` sebagai kurasi).

- [x] SQL: `supabase/phase4-suppliers.sql` (tabel `supplier_registrations` + bucket
      `supplier-photos` (private) + RLS + trigger audit + realtime)
- [x] RLS: INSERT anon boleh (form publik); SELECT/UPDATE/DELETE editor+;
      bucket: upload anon, baca editor+ (kontak pendaftar tidak publik)
- [x] Form publik: field baru (bentuk usaha PT/CV/dll, detail produk, foto produk
      max 5 × 5 MB + preview), honeypot anti-spam, simpan DB → sukses;
      gagal → fallback mailto (data tidak hilang)
- [x] Admin `/admin/suppliers`: daftar live (realtime) + detail (foto via signed URL,
      sertifikat, kontak resmi + balas email) + status new/reviewed/approved/rejected + hapus
- [ ] **AKSI PEMILIK AKUN**: jalankan `phase4-suppliers.sql` di SQL Editor
- [ ] QA: isi 1 pendaftaran tes (dengan 1 foto) → cek masuk `/admin/suppliers` →
      ubah status → hapus data tes
- [ ] Follow-up (phase berikutnya): halaman buyer dari supplier `approved`
      (hanya field aman: foto, nama PT/CV, detail produk, sertifikat, kontak resmi)

> Risiko dicatat: bucket upload-anon bisa disalahgunakan untuk hosting file gratis.
> Mitigasi saat ini: validasi tipe/ukuran di form + nama file acak + bucket private.
> Jika spam upload terjadi: tambah captcha atau wajibkan persetujuan manual file.

---

## 13. Phase 5 — Direktori Partner Publik (/partners)

Menu navbar "Partner" → dropdown "Our Supply Partners" + "Become Our Partners".

- [x] SQL: `supabase/phase5-partners.sql` (view `supplier_directory`: hanya baris
      `approved` + kolom aman; RLS view read-publik; policy `sp_public_read` agar
      foto tampil di halaman publik — path acak tak tertebak, hanya foto approved
      yang di-render)
- [x] Halaman `src/pages/SupplyPartnersPage.tsx` (`/partners`): hero, grid partner
      terverifikasi (foto, PT/CV, lokasi, produk + detail, kapasitas, MOQ,
      sertifikat, kontak resmi mailto/WA, website), empty state + CTA,
      fetch-on-mount + realtime (tanpa fallback — empty state mencakupnya)
- [x] Navbar: menu dropdown "Partner"; Footer: link "Our Supply Partners"
- [ ] **AKSI PEMILIK AKUN**: jalankan `phase4-suppliers.sql` (jika belum) lalu
      `phase5-partners.sql`; untuk melihat 1 kartu contoh: ubah 1 pendaftar tes
      menjadi `approved` (atau isi form tes → approve di `/admin/suppliers`)
- [ ] QA: direktori menampilkan approved saja; non-approved tidak bocor
      (cek via anon REST maupun halaman)

---

## 9. Log Progres

| Tanggal | Phase / Item | Status | Catatan |
|---|---|---|---|
| 2026-10-15 | Dokumen planning ini | ✅ Selesai | Scope produk, email+password, Free |
| 2026-10-15 | Phase 0 (sisi kode): install SDK, `supabase/schema.sql`, `supabase/seed.sql`, `src/lib/supabase.ts`, `.env.example`, `.gitignore` | ✅ Selesai | Build lolos; tinggal project + kredensial |
| 2026-10-15 | Phase 0 — Setup & Koneksi | ✅ Selesai | Project live, seed 3 produk + 23 specs, RLS terverifikasi (anon read OK, write ditolak 42501) |
| 2026-10-15 | Phase 1 (kode) — hooks, mapper, 4 halaman, handshake realtime | ✅ Selesai | Build lolos; kontrak data 3/23/10 valid; tersisa QA manual E2E |
| 2026-10-15 | Phase 2 (kode) — auth, panel admin CRUD, upload, draft preview | ✅ Selesai | Build lolos; main bundle tetap ~218KB; tersisa QA akun oleh pemilik |
| | Phase 1 — QA manual E2E | ⬜ Belum | Ubah 1 kata di Table Editor → cek situs update tanpa refresh |
| | Phase 2 — QA akun (admin/editor) | ⬜ Belum | Lihat "Panduan QA Phase 2" di bawah |
| 2026-10-15 | Phase 3 (kode) — content, solutions, audit, wiring, keep-alive | ✅ Selesai | Build lolos; butuh run phase3.sql + seed, lalu QA |
| 2026-10-15 | Phase 3 — SQL live + RLS terverifikasi | ✅ Selesai | 3 solutions published, 7 keys, audit tertutup, write anon ditolak |
| | Phase 3 — QA admin (pemilik akun) | ⬜ Belum | QA content/solutions/logs di /admin |
| 2026-10-15 | Fix realtime channel duplikat (`subscribeShared`) | ✅ Selesai | Build lolos; perlu restart dev server + tes ulang di browser |
| | Phase 4 — SQL + QA (pemilik akun) | ⬜ Belum → SQL ✅ | Policy kepasang via phase4-fix-policies.sql; INSERT anon 201; tersisa QA form + hapus data tes |
| 2026-10-15 | Phase 5 (kode) — direktori /partners + menu Partner | ✅ Selesai | Build lolos; butuh run phase4 (jika belum) + phase5 SQL, lalu QA |
| | Phase 3 — Backlog | ⬜ Belum | |

> Cara pakai: centang `[ ]` → `[x]` setiap item selesai, tambah baris di Log Progres,
> dan catat perubahan kode di `docs/Changelog.md` per phase.

---

## 10. Panduan QA Phase 2 (oleh pemilik akun, ±10 menit)

1. **Buat user admin** — Dashboard → Authentication → Users → Add user → Create new user
   (isi email + password, centang "Auto Confirm User") → Save.
2. **Tetapkan peran** — SQL Editor → paste `supabase/make-admin.sql` (ganti email) → Run.
   Ulangi untuk 1 user **editor** (ganti `'admin'` → `'editor'` di SQL).
3. **Login** — `npm run dev` → buka `/admin/login` → masuk sebagai admin → harus mendarat
   di `/admin/products` berisi 3 produk.
4. **CRUD** — tambah 1 produk **draft** (isi minimal nama + 1 spec) → preview via ikon mata
   (harus bisa dibuka padahal draft) → ubah jadi **published** → cek situs publik
   menampilkan produk baru **tanpa refresh** (atau refresh sekali) → hapus produk tes.
5. **Upload** — di form, pilih file foto → Simpan → pastikan foto tampil di situs.
6. **Peran** — keluar → login sebagai editor → pastikan bisa CRUD produk; editor **tidak**
   bisa mengubah `user_roles` (tidak ada UI-nya; via SQL pun ditolak RLS kecuali admin).
7. **Akses publik** — tanpa login, buka `/admin/products` → harus redirect ke `/admin/login`.
