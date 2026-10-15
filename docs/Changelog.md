# Changelog

All notable changes to the Harvestora Global Indonesia website will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — Supabase RBAC Phase 0 (Setup & Koneksi)

### Added
- `supabase/schema.sql`: tabel `user_roles`, `products`, `product_specs`, `product_packaging` + function `has_role()` + RLS policies (publik read published, tulis editor+) + bucket `product-images` + publikasi Realtime
- `supabase/seed.sql`: seed 3 produk + 23 specs + 10 packaging (mirror `src/constants/products.ts`), idempotent
- `src/lib/supabase.ts`: client singleton `@supabase/supabase-js` v2 (tanpa env → warning + fallback, situs tidak rusak)
- `.env.example` + `.gitignore` (`.env` / `.env.local` tidak ke-commit)
- Dependency: `@supabase/supabase-js`
- Detail rencana: `docs/SupabaseRBAC-Plan.md`

### Verified
- Anon read `products` → 3 baris published; `product_specs` → 23 baris
- Anon write → ditolak RLS (`42501 new row violates row-level security policy`)

### Added (Phase 1 — Public Read + Realtime)
- `src/lib/productsDb.ts`: tipe baris DB + `fetchProductsFromDb()` + `mapDbProduct()` (snake_case → tipe `Product`; ikon packaging disimpulkan dari kata kunci; validasi `categoryColor`/`status` dengan fallback aman)
- `src/hooks/useProducts.ts`: `useProducts()` / `useProduct(slug)` — render pertama dari konstanta statis (instan), lalu fetch Supabase; kosong/gagal → tetap statis (situs tak pernah blank); subscribe Realtime `products`/`product_specs`/`product_packaging` → refetch otomatis tanpa refresh
- Hook dipakai di `ProductsPage`, `ProductDetailPage`, `HomePage`, `RequestQuotePage` (menggantikan import `PRODUCTS` langsung; `getSpecificationDisclaimer` tetap dari konstanta)

### Verified (Phase 1)
- Build lolos; kontrak data valid (3 produk / 23 specs / 10 packaging, tanpa field hilang; status `TARGET`; warna `brand`/`slate`)
- Realtime channel handshake `SUBSCRIBED ok`
- Google Translate aman (konten dinamis = DOM normal tanpa `notranslate`)
- E2E manual tertunda: butuh ubah 1 kata via Table Editor dan lihat situs update (aksi pemilik akun)

### Added (Phase 2 — Auth + Admin Panel)
- `src/hooks/useAuth.tsx`: `AuthProvider` + `useAuth` (session, role admin/editor, signIn/signOut); client Supabase di-load dinamis agar main bundle tetap ramping (~218KB)
- `src/components/ProtectedRoute.tsx`: kunci route admin (belum login → `/admin/login`; peran kurang → halaman akses-ditolak)
- `src/components/AdminLayout.tsx`: topbar panel admin (badge peran, Lihat Situs, Keluar)
- `src/pages/admin/AdminLoginPage.tsx` (`/admin/login`), `AdminProductsPage.tsx` (`/admin/products`: list semua status + preview/hapus), `AdminProductFormPage.tsx` (`/admin/products/new`, `/admin/products/:id`: info dasar, specs dinamis, packaging dinamis, list koma, foto utama, draft/published)
- `src/lib/productsDb.ts`: `fetchProductBySlugFromDb()` (preview draft untuk editor), `saveProduct()`, `deleteProductById()`, `uploadProductImage()` (bucket `product-images`)
- `useProduct()` mendukung preview draft via URL publik (RLS: editor bisa baca draft, anon tetap 404)
- `supabase/make-admin.sql`: script penetapan peran admin/editor pertama
- Navbar/Footer/WhatsApp disembunyikan di `/admin/*`; link "Admin" muncul di navbar bila sudah login sebagai editor/admin
- `src/components/AdminDesktopGate.tsx`: Admin Panel hanya untuk tablet–desktop (min-width 768px, ikut breakpoint md Tailwind, live via `matchMedia`); pengunjung mobile mendapat pemberitahuan + tombol kembali — dipasang di `/admin/login` dan `ProtectedRoute`

### Added (Phase 3 — CMS: content, solutions, audit)
- `supabase/phase3.sql`: tabel `site_content` (key→value, read publik/write editor+), `solutions` (+ RLS published/editor mirror products), `audit_logs` (trigger `log_changes()` SECURITY DEFINER di 5 tabel, read admin-only), Realtime untuk kedua tabel baru
- `supabase/seed-phase3.sql`: 3 solutions + 7 keys konten (hero ×4, footer tagline, email, lokasi), idempotent
- `src/lib/contentDb.ts` + `src/hooks/useSiteContent.ts` (`useSiteContent`/`useContent` + realtime; gagal → fallback statis per key)
- `src/lib/solutionsDb.ts` + `src/hooks/useSolutions.ts` (`useSolutions`/`useSolution`; ikon dari `icon_name`; carousel multibahasa tetap digabung dari data statis per slug; preview draft untuk editor)
- Admin: `/admin/content` (edit per key + status simpan), `/admin/solutions` + form (`/admin/solutions/new`, `/:id`), `/admin/logs` (khusus admin, 100 terakhir, ringkas nama/slug + pelaku); tab navigasi Products/Content/Solutions/Logs
- Wiring publik live: hero homepage, tagline + email + lokasi footer, email + lokasi halaman About, `SolutionsPage`, `SolutionDetailPage`, section solutions homepage
- `useProduct`/`useSolution` expose `loading` — halaman detail menunggu fetch draft sebelum 404/redirect (perbaikan preview draft)
- `.github/workflows/supabase-keepalive.yml`: ping REST Senin & Kamis (butuh secrets `SUPABASE_URL` + `SUPABASE_ANON_KEY`; hapus jika upgrade Pro)

### Added (Phase 4 — Supplier Registration ke Database)
- `supabase/phase4-suppliers.sql`: tabel `supplier_registrations` (nama + bentuk usaha PT/CV, lokasi pabrik, produk + detail, kapasitas, MOQ, kemasan, sertifikat, pengalaman ekspor, website, kontak resmi nama/email/HP, pesan, foto, status new/reviewed/approved/rejected) + bucket private `supplier-photos` + RLS (INSERT anon, sisanya editor+) + trigger audit + realtime
- `src/lib/suppliersDb.ts`: upload foto (acak nama, max 5×5MB), submit, list, ubah status, hapus, signed URL preview foto
- `src/pages/ForSuppliersPage.tsx`: field baru (bentuk usaha, detail produk, foto + preview), honeypot anti-spam, simpan ke DB → sukses; gagal → fallback mailto (data tidak hilang)
- `src/pages/admin/AdminSuppliersPage.tsx` (`/admin/suppliers`): daftar live + detail lengkap (foto, sertifikat, kontak + balas email) + status + hapus; tab Suppliers di navigasi admin

### Added (Phase 5 — Direktori Partner Publik)
- `supabase/phase5-partners.sql`: view `supplier_directory` (hanya `approved` + kolom aman; RLS read-publik) + policy `sp_public_read` untuk foto di halaman publik
- `src/pages/SupplyPartnersPage.tsx` (`/partners`): direktori partner terverifikasi (foto, PT/CV, lokasi, produk + detail, kapasitas, MOQ, sertifikat, kontak resmi, website) + empty state + CTA; realtime via channel bersama
- Navbar: menu dropdown "Partner" (Our Supply Partners → `/partners`, Become Our Partners → `/for-suppliers`); Footer: link Our Supply Partners

### Fixed (Realtime — channel duplikat)
- Bug: dua hook dalam satu halaman memakai nama channel sama (HomePage + Footer sama-sama `useSiteContent` → `site-content-changes`) membuat supabase-js melempar `cannot add postgres_changes callbacks after subscribe()` dan meledakkan React tree
- `src/lib/realtime.ts` (baru): `subscribeShared()` — satu channel + satu subscribe per nama, handler refcount; aman untuk banyak hook per halaman dan StrictMode double-mount; dipakai `useProducts`, `useSolutions`, `useSiteContent`, dan daftar admin Suppliers

---

## [4.1.0] - 2026-10-15

### Added

#### Organization Page (`/organization`)
- `src/pages/OrganizationPage.tsx` (baru): hero "Corporate Organizational Structure", bagan tree CEO → 2 cabang (COO + CFO) dengan konektor garis CSS (horizontal di desktop, vertikal stacked di mobile), section "Leadership Photos", CTA About + Contact
- Struktur: Adam Harish Abdurrahman (CEO) → Rizky Pangestu (COO), Muhammad Ragil Wicaksono (CFO)
- Route baru `/organization` di `src/App.tsx` (lazy + Suspense, mengikuti pola halaman lain)
- `NAV_LINKS`: menu "About" menjadi dropdown (About Us + Organization) — desktop hover, mobile expandable
- Footer kolom Company: tambah link "Organization"

#### Team Photos (`public/team/`)
- `CEO-adha.jpeg` (Adam), `COO-iky.jpeg` (Rizky), `CFO-Ragil.jpeg` (Ragil)
- Frame portrait `aspect-[5/6]` + `object-contain` (foto vertikal tampil penuh tanpa crop) + `object-bottom` (foto menempel border nama, tidak floating)
- Background frame mengikuti backdrop tiap foto via field `bg` per leader: CEO `#5A0908`, COO `#012F7C`, CFO `#EDF1F2` — ruang kosong frame menyatu dengan foto

### Changed

#### Organization Page — English Copy (Google Translate Compatibility)
- Seluruh copy halaman ditulis dalam English (bahasa dasar `pageLanguage: 'en'`) agar ikut ter-translate otomatis ke ID/AR/ZH via LanguageSwitcher
- "Struktur Organisasi Perusahaan" → "Corporate Organizational Structure"; "Bagan Organisasi" → "Organization Chart"; "Foto Pimpinan" → "Leadership Photos"; deskripsi CEO/COO/CFO + tombol → English

#### Palm Sugar Photos: BrownSurga → GulaAren
- Semua foto Gula Aren diganti dari BrownSurga ke aset baru: `public/GulaAren.jpeg` + `public/GulaAren2.jpeg`
- `src/constants/products.ts`: palm sugar `image` → `/GulaAren.jpeg`, `gallery` → [`/GulaAren.jpeg`, `/GulaAren2.jpeg`]
- `src/constants/solutions.ts`: private-label `image` → `/GulaAren.jpeg`
- `src/pages/HomePage.tsx`: section Private Label `img` → `/GulaAren.jpeg`

---

## [4.0.0] - 2026-10-13

### Added

#### Solutions — Route Terpisah per Halaman (Pengganti Hash Anchor)
- Hapus hash routing `/solutions#bulk-supply`, `#private-label`, `#custom-sourcing`
- Route baru: `/solutions/bulk-supply`, `/solutions/private-label`, `/solutions/custom-sourcing` via `/solutions/:slug`
- `src/pages/SolutionsPage.tsx` sekarang hanya overview (3 kartu link), tidak lagi menggabung 3 solution dalam 1 halaman
- `src/pages/SolutionDetailPage.tsx` (baru): tiap solution punya URL, hero, konten sendiri; form hanya di custom-sourcing; slug salah redirect ke `/solutions`
- Data slide/carousel terpusat di `src/constants/solutions.ts` (`SOLUTIONS`, `getSolutionBySlug()`)
- Update `NAV_LINKS` children Solutions ke route asli

#### Loading + Scroll per Pindah Halaman
- Semua page di `src/App.tsx` jadi `React.lazy` + `Suspense fallback=<PageLoader/>` — tiap ganti route memicu loading + remount, bukan pindah anchor
- `src/components/ScrollToTop.tsx` (baru): scroll ke atas setiap `pathname` berubah
- `src/components/PageLoader.tsx` (baru): spinner "Loading page..."

#### Netlify SPA Fallback
- `public/_redirects` (baru): `/* /index.html 200` — refresh/akses langsung `/products`, `/solutions/xxx`, dll. tidak lagi 404 di Netlify

#### Language Switcher (Third-Party Google Translate)
- `src/components/LanguageSwitcher.tsx` (baru): dropdown custom 4 bahasa — English (US), Bahasa Indonesia, Bahasa Arab, Mandarin
- Engine Google Translate dimuat sekali; UI bawaan disembunyikan via `src/index.css`
- Pilih bahasa → set cookie `googtrans` (1 tahun) → reload; pilihan tersimpan
- Terpasang di Navbar desktop (samping CTA) dan mobile menu (bagian Language); berlaku semua halaman karena Navbar persistent

#### Bulk Supply — Carousel Tipe Container
- `src/components/ImageCarousel.tsx` (baru): panah, dots, counter, autoplay 6 detik (pause saat hover)
- 3 slide: Standard Dry Container (briket arang → China/Saudi), Reefer Cold Storage (makanan beku, mis. salmon → Jepang), Ventilated/Food-Grade (bawang merah & gula aren)
- Gambar memakai stok lokal (`TerminalContainerAerial`, `AerialContainerPort`, `inspection`); ganti foto cukup edit data `carousel`

#### Terjemahan Carousel Mengikuti Bahasa Terpilih
- Copy tiap slide tersedia dalam 4 bahasa (EN/ID/AR/ZH) di data `carousel`
- `src/utils/siteLang.ts` (baru): `getSiteLang()` baca bahasa aktif dari cookie `googtrans`
- Carousel render copy sesuai bahasa aktif + `notranslate` (Google tidak memproses ulang / balapan dengan autoplay); caption Arab otomatis RTL
- Counter `1/3` juga di-remount per slide + `notranslate` (sebelumnya macet karena tag `<font>` Google)

#### Translate Penuh saat Pindah Halaman
- `ScrollToTop`: selama bahasa terjemahan aktif, tiap pindah route full reload sekali (guard `sessionStorage` anti-loop) — Google memproses tiap halaman dari awal, konten suntikan router tidak lagi luput/stuck Inggris
- Mode Inggris default tetap SPA cepat tanpa reload ekstra

---

### Changed

#### Rebrand: Export Global Indonesia → Harvestora Global Indonesia
- `BRAND.name` → `Harvestora Global Indonesia`; singkatan `EGI` → `HGI` (termasuk `alt` logo)
- Email: `adam.eksporglobalindonesia@gmail.com` → `adam.harvestoraglobalindonesia@gmail.com` → `info.harvestoraglobalindonesia@gmail.com` (terpusat di `CONTACT.email`; `SolutionDetailPage` & `ForSuppliersPage` yang tadinya hardcode mailto sekarang pakai `CONTACT.email`)
- Slogan `BRAND.tagline`: `B2B Indonesian Sourcing & Export Partner` → `PT. Harvestora Global Indonesia` (ikut di teks bawah logo Navbar/Footer, subtitle About, paragraf Home); title browser menyesuaikan; `heroBadge` tidak diubah
- Logo baru: `BrandLogo.tsx` pakai `/logoGreen-bigTransparent.png` (background terang) dan `/logoWhite-bigTransparent.png` (background gelap); `favicon.svg` generik dipertahankan
- `package.json` / `package-lock.json`: `egi-landing-page` → `harvestora-global-indonesia`
- `index.html`: title + meta description; teks produk (3 deskripsi), About, Home, legal pages (Privacy/Terms/Cookie) disesuaikan

#### Fix: `categoryColor` Palm Sugar
- `src/constants/products.ts`: nilai tidak valid (`'white'`, lalu `''`) dikembalikan ke `'gold'` sesuai tipe `'brand' | 'gold' | 'slate'` — build sempat gagal 2x karena ini

---

### Removed

#### Markets (Belum Perlu)
- Hapus nav `Markets` + submenu (China, Southeast Asia, Wider Asia) dari `NAV_LINKS`
- Hapus route `/markets` dan `/markets/:slug` dari `App.tsx`
- Hapus section `Target Markets` dari `HomePage.tsx`
- Kolom Markets di footer diganti kolom `Get Started` (teks + tombol Request a Quote)
- Hapus file: `src/pages/MarketsPage.tsx`, `src/pages/MarketDetailPage.tsx`, `src/constants/markets.ts`; hapus interface `Market` di `src/types/index.ts`

---

## [3.1.0] - 2026-09-09

### Removed

#### Palm Cooking Oil Product Line
- Hapus seluruh referensi Palm Cooking Oil dari codebase
- Hapus Palm Cooking Oil dari navbar, footer, product listing, dan semua halaman
- Hapus data spesifikasi palm oil (CP8/CP10) dari `src/constants/products.ts`
- Hapus gambar lama: `PalmTree.jpg`, `PalmOilRefinery.jpg`
- Update gambar baru: `CoconutOil.jpg`, `CoconutShells.jpg`, `CocoBriquette.jpg`, `AerialContainerPort.jpg`, `TerminalContainerAerial.jpg`, `inspection.jpg`
- Update teks terkait palm oil di: FAQ, About Page, Solutions, Supplier Inquiry Form, Markets
- Clean up unused product constants dan assets

---

### Added

#### Footer Credit
- Tambah "Powered by WebsiteJokiID Engine" di footer (`src/components/Footer.tsx`)

---

### Changed

#### Request a Quote — Product Input Combobox
- **Sebelum**: `<select>` dropdown dengan 4 opsi (2 produk + Custom Product + placeholder)
- **Sesudah**: `<input>` + `<datalist>` — buyer bisa ketik bebas atau pilih dari suggestion
- Buyer dapat menulis produk dalam bahasa mereka masing-masing
- Dropdown suggestion tetap muncul saat mengetik
- Custom product tetap bisa diinput tanpa batasan
- Placeholder: "Type or select a product..."
- File: `src/pages/RequestQuotePage.tsx` (line 190-206)

---

## [3.0.0] - 2026-08-27

### Grand Revision — Multi-Product B2B Sourcing Platform

Transformasi besar-besaran dari single-product landing page menjadi platform B2B sourcing multi-produk yang scalable.

---

### Added

#### Infrastructure
- `react-router-dom` — multi-page routing (SPA dengan client-side navigation)
- `BrowserRouter` wrapper di `main.tsx`
- Route system: 16 routes (homepage, products, markets, solutions, about, legal, dll)

#### Product Data Architecture (`src/constants/products.ts`)
- Scalable product data structure — produk baru tinggal tambah data, bukan rewrite
- 3 produk awal: Palm Cooking Oil, Coconut Oil, Coconut Shell Charcoal Briquettes
- `Product` interface dengan: name, slug, category, specifications, packaging, applications, documentation, certifications, incoterms, dst.
- `SpecificationValue` dengan status: `TARGET` / `VERIFIED` / `AVAILABLE`
- Helper functions: `getProductBySlug()`, `getProductById()`, `getSpecificationDisclaimer()`

#### Market Data Architecture (`src/constants/markets.ts`)
- 3 target markets: Saudi Arabia, United Arab Emirates, GCC Markets
- `Market` interface dengan: buyerTypes, productRequirements, packagingNotes, documentationNotes, shippingConsiderations
- Helper function: `getMarketBySlug()`

#### Pages — Homepage (`src/pages/HomePage.tsx`)
- Hero section — "Connecting Global Buyers with Quality Products from Indonesia"
- Trust Strip — Indonesia-Based, Export-Ready, B2B International, Export Coordination
- Who We Serve — Importers, Distributors, Wholesalers, Private Label Buyers
- Our Products — 3 product cards dengan link ke product detail
- Product Comparison table
- Solutions — Bulk Supply, Private Label, Custom Sourcing
- Private Label section dengan flow steps
- Custom Sourcing section dengan form
- Why Export Global Indonesia — 4 value propositions
- How It Works — 9-step process timeline
- Quality & Documentation
- Target Markets — Saudi Arabia, UAE, GCC
- About Us summary
- FAQ section (accordion)
- Final CTA — Request a Quote

#### Pages — Product Detail (`src/pages/ProductDetailPage.tsx`)
- Template reusable via `useParams()` — berfungsi untuk semua 3 produk
- Sections: Hero, Overview, Applications, Specifications (dengan status badge), Packaging, MOQ & Supply, Quality & Documentation, Private Label, Export Terms, CTA
- Specification disclaimer: "Specifications shown are target specifications based on market requirements..."

#### Pages — Product Listing (`src/pages/ProductsPage.tsx`)
- Grid cards untuk 3 produk dengan link ke detail page

#### Pages — Market Detail (`src/pages/MarketDetailPage.tsx`)
- Template reusable via `useParams()`
- Sections: Hero, Overview, Relevant Products, Buyer Types, Product Requirements, Packaging Notes, Documentation Notes, Shipping Considerations, CTA

#### Pages — Market Listing (`src/pages/MarketsPage.tsx`)
- Grid cards untuk 3 target markets

#### Pages — Solutions (`src/pages/SolutionsPage.tsx`)
- Bulk Supply section dengan features list
- Private Label section dengan flow
- Custom Sourcing section dengan mailto form

#### Pages — How It Works (`src/pages/HowItWorksPage.tsx`)
- 9-step visual timeline dari `HOW_IT_WORKS_STEPS`

#### Pages — About Us (`src/pages/AboutPage.tsx`)
- Company story, mission, values grid, contact info

#### Pages — For Buyers (`src/pages/ForBuyersPage.tsx`)
- Buyer types, 6-step flow, CTA

#### Pages — For Suppliers (`src/pages/ForSuppliersPage.tsx`)
- Supplier registration form (10 fields) dengan validation + mailto submission

#### Pages — Request a Quote (`src/pages/RequestQuotePage.tsx`)
- Full RFQ form:
  - Company section: name, country, contact person, email, phone
  - Product section: product dropdown (4 options termasuk "Custom Product"), specification, quantity, unit, packaging
  - Requirement section: destination country, destination port, incoterm (FOB/Other), private label, target price, additional requirements
- Form submission via mailto: dengan subject `[Quote Request] {company} - {product} - {country}`

#### Pages — FAQ (`src/pages/FAQPage.tsx`)
- Accordion-style Q&A dari `FAQ_DATA`

#### Pages — Legal
- `PrivacyPolicyPage.tsx` — placeholder
- `TermsPage.tsx` — placeholder
- `CookiePolicyPage.tsx` — placeholder

#### Pages — 404 (`src/pages/NotFoundPage.tsx`)
- Custom 404 dengan "Back to Home" dan "Go Back" buttons

#### Components — Navbar (`src/components/Navbar.tsx`)
- Desktop dropdown navigation untuk Products, Markets, Solutions
- Mobile hamburger menu dengan expandable submenus
- Active route highlighting (brand-50 background)
- CTA button "Request a Quote" di desktop & mobile

#### Components — Footer (`src/components/Footer.tsx`)
- 4-column layout: Brand, Products, Company, Markets
- Contact info: email, WhatsApp, location
- Links ke semua halaman utama
- Legal footer: Privacy Policy, Terms & Conditions, Cookie Policy

---

### Changed

#### `src/App.tsx`
- Dari single-component render menjadi `<Routes>` dengan 16 route definitions
- Navbar dan Footer sekarang persistent layout (tidak re-render saat navigasi)

#### `src/main.tsx`
- Tambah `<BrowserRouter>` wrapper

#### `src/constants/index.ts`
- `BRAND.tagline` diubah: "Premier Agro-Commodity Exporter" → "B2B Indonesian Sourcing & Export Partner"
- `NAV_LINKS` diubah total — sekarang menggunakan `href` path (bukan hash anchors) dengan `children` untuk dropdown
- `TRUST_METRICS` diubah: lebih generic (Indonesia-Based, Export-Ready, B2B International, Export Coordination)
- `WHY_CARDS` diubah: 4 value propositions sesuai GrandRevisionV3
- `FAQ_DATA` diupdate dengan pertanyaan umum buyer
- Tambah `HOW_IT_WORKS_STEPS` (9 langkah)
- Hapus `PRODUCT_SPECS`, `PACKAGING_OPTIONS`, `FORM_PACKAGING_OPTIONS`, `HS_CODE`, `SHIPPING_TERMS` (dipindah ke products.ts atau dihapus)
- Hapus spesifikasi palm oil yang hardcoded (CP8/CP10)

#### `src/types/index.ts`
- Tambah interfaces baru: `Product`, `ProductSpecification`, `SpecificationValue`, `ProductPackaging`, `Market`, `Solution`, `FAQItem`, `InquiryFormState` (extended), `SupplierFormState`, `CustomSourcingFormState`
- Pertahankan legacy types: `WhyCard`, `CertCard`, `NavLink` (dengan `children`), `PackagingOptionValue`

#### `index.html`
- Title: "Export Global Indonesia | RBD Palm Olein Exporter" → "Export Global Indonesia | B2B Indonesian Sourcing & Export Partner"
- Meta description diupdate untuk multi-produk

---

### Removed

#### Components (old single-product sections)
- `src/components/Hero.tsx` — diganti oleh homepage sections
- `src/components/TrustMetrics.tsx` — diganti oleh homepage Trust Strip
- `src/components/FeaturedProduct.tsx` — diganti oleh product listing & detail pages
- `src/components/WhyPartner.tsx` — diganti oleh "Why Export Global Indonesia" di homepage
- `src/components/Logistics.tsx` — informasi pindah ke How It Works & product pages
- `src/components/Certifications.tsx` — informasi pindah ke Quality & Documentation section

#### Constants
- `PRODUCT_SPECS` — data CP8/CP10 hardcoded (dipindah ke products.ts dengan status governance)
- `PACKAGING_OPTIONS` — dipindah ke products.ts
- `FORM_PACKAGING_OPTIONS` — diganti oleh dynamic product dropdown
- `HS_CODE` — dihapus dari tampilan utama
- `SHIPPING_TERMS` — dihapus dari footer
- `EXTRA_STANDARDS` — dihapus (ISO, GMP, HACCP, SNI) — no verified data

---

### Removed (CIF references)
- Semua referensi "CIF" dihapus dari codebase (18 occurrences)
- `incoterms` di products.ts: `['FOB']` (hapus `'CIF'`)
- FAQ answer: hanya sebut FOB
- Market shipping considerations: "FOB terms available"
- Solutions page: "competitive FOB pricing"
- Request Quote form: incoterm options `['FOB', 'Other']`
- Terms page: "FOB, etc."

---

### Preserved
- `BrandLogo.tsx` — dipertahankan, digunakan di Navbar & Footer
- `WhatsAppFloat.tsx` — dipertahankan dengan link yang sama
- Design system: Tailwind CSS, brand-green palette, gold accent, Inter font
- Visual identity: logo, warna, typography, spacing patterns
- Contact information: director name, email, WhatsApp
- Form submission pattern: mailto: link

---

### Governance

#### Specification Status System
- `TARGET` — requirement pasar / buyer, belum terverifikasi
- `VERIFIED` — didukung oleh supplier documentation / COA / lab test
- `AVAILABLE` — supplier mengonfirmasi produk tersedia

#### Content Rules (dari GrandRevisionV3)
- Tidak mengklaim spesifikasi sebagai guaranteed sebelum verified
- Gunakan "Available upon request" / "Subject to supplier confirmation" / "To be confirmed"
- Tidak invent data: supplier, certifications, customer, export history
- Product specifications = target market specifications, bukan guaranteed

---

## [2.0.0] - 2025 (Previous)

### Changed
- Visual design refinements
- UI styling improvements
- Footer credit link

### Fixed
- Layout overflow issues
- Removed obsolete CSS assets

---

## [1.0.0] - 2025 (Initial)

### Added
- Initial landing page for RBD Palm Olein CP8/CP10
- Hero section with product specs
- Trust metrics strip
- Featured product section (CP8 vs CP10 comparison)
- Why Partner section
- Logistics & export documentation
- Certifications section
- Footer with inquiry form (mailto:)
- WhatsApp floating button
- Brand logo components

---

## Summary

| Version | Description |
|---|---|
| **4.1.0** | Organization page + team photos, English copy untuk Google Translate |
| **4.0.0** | Rebrand Harvestora, routing per-halaman + Netlify fallback, translator 4 bahasa, carousel bulk supply, hapus Markets |
| **3.1.0** | Remove palm cooking oil, add footer credit, product input combobox |
| **3.0.0** | Grand revision: multi-product, multi-page B2B sourcing platform |
| **2.0.0** | Visual refinements and bug fixes |
| **1.0.0** | Initial single-product landing page |
