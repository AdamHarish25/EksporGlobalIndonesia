# Changelog

All notable changes to the Export Global Indonesia website will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
| **3.1.0** | Remove palm cooking oil, add footer credit, product input combobox |
| **3.0.0** | Grand revision: multi-product, multi-page B2B sourcing platform |
| **2.0.0** | Visual refinements and bug fixes |
| **1.0.0** | Initial single-product landing page |
