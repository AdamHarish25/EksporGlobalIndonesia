# IMPLEMENTATION DIRECTIVE

This project is an improvement and restructuring of an existing Export Global Indonesia website, not a complete visual replacement.
Before modifying the website, inspect and understand the existing website, codebase, design system, components, assets, typography, colors, spacing, animations and responsive behavior.
Preserve the existing visual identity wherever practical. Reuse existing components and design patterns instead of replacing them with generic templates.
The primary task is to improve information architecture, B2B buyer experience, product presentation, conversion flow, scalability and content structure.
The website must support three initial product lines:

1. Palm Cooking Oil
2. Coconut Oil
3. Coconut Shell Charcoal Briquettes

The architecture must remain scalable so additional Indonesian products can be added later without restructuring the entire website.
Do not invent business information, suppliers, certifications, customers, export history, product test results or market claims.
Product specifications that are currently classified as market/target specifications must not be presented as guaranteed product specifications unless verified by supplier documentation or laboratory testing.
When information is unavailable, use appropriate states such as "Available upon request", "Subject to supplier confirmation", or "To be confirmed".
The final website should function as a B2B Indonesian sourcing and export lead-generation platform, not merely as a static product catalog.

# EXPORT GLOBAL INDONESIA
## Website Revamp & Implementation Specification — V3

**Document Purpose:**  
Master documentation for AI-assisted website revamp and future implementation.

**Primary Website:** `exportglobalindonesia.netlify.app`

**Current Product Lines:**

1. Palm Cooking Oil
2. Coconut Oil
3. Coconut Shell Charcoal Briquettes

**Core Positioning:**

> **Connecting Global Buyers with Quality Products from Indonesia**

**Primary Business Objective:**

> Generate qualified B2B buyer inquiries and establish Export Global Indonesia as an Indonesian sourcing and export coordination partner.

---

# 01. PROJECT OBJECTIVE

Website baru **bukan dibuat dari nol secara visual**.

AI harus:

1. Membaca/inspect website existing terlebih dahulu.
2. Mengidentifikasi design system existing.
3. Mempertahankan visual identity yang sudah ada.
4. Memperbaiki information architecture.
5. Menambahkan tiga product line.
6. Menambahkan buyer-oriented conversion flow.
7. Menambahkan product detail architecture.
8. Menambahkan market architecture.
9. Menambahkan RFQ/inquiry system.
10. Membuat struktur scalable untuk produk baru.

### Prinsip utama

```text
EXISTING WEBSITE
       ↓
AUDIT
       ↓
PRESERVE VISUAL IDENTITY
       ↓
RESTRUCTURE INFORMATION ARCHITECTURE
       ↓
ADD PRODUCT / MARKET / BUYER FLOWS
       ↓
IMPROVE CONVERSION
```

**Bukan redesign total yang menghilangkan karakter website existing.**

---

# 02. EXISTING WEBSITE PRESERVATION RULE

Ini harus menjadi salah satu aturan paling penting untuk AI.

## AI MUST inspect first

Sebelum melakukan perubahan, AI harus mengevaluasi:

- existing homepage
- existing pages
- navbar
- typography
- font hierarchy
- color palette
- buttons
- cards
- border radius
- shadows
- spacing
- section width
- imagery
- iconography
- animation
- responsive behavior
- existing components
- existing assets
- existing functionality.

### Existing design → action

| Element | Instruction |
|---|---|
| Brand identity | **PRESERVE** |
| Logo | **PRESERVE** |
| Existing color system | **PRESERVE / REFINE** |
| Typography | **PRESERVE unless technically necessary** |
| Existing visual language | **PRESERVE** |
| Existing useful components | **REUSE** |
| Existing animation | **PRESERVE / IMPROVE** |
| Existing content | **AUDIT + RESTRUCTURE** |
| Existing layout | **RESTRUCTURE where necessary** |
| Product presentation | **EXPAND** |
| Navigation | **RESTRUCTURE** |
| CTA system | **IMPROVE** |

### AI MUST NOT

- Replace website with generic SaaS template.
- Replace branding.
- Randomly change color palette.
- Introduce unrelated visual styles.
- Remove useful existing sections without evaluation.
- Add fake statistics.
- Add fake certifications.
- Invent supplier information.
- Invent export history.
- Invent customer logos.
- Claim products meet specifications without verification.
- Claim markets are currently served unless verified.

---

# 03. BUSINESS MODEL

Export Global Indonesia diposisikan sebagai:

> **B2B Indonesian Sourcing & Export Coordination Partner**

Basic flow:

```text
International Buyer
        ↓
ExportGlobalIndonesia
        ↓
Requirement Collection
        ↓
Product / Supplier Matching
        ↓
Quotation
        ↓
Sample / Verification
        ↓
Purchase Order
        ↓
Production / Preparation
        ↓
Export Documentation
        ↓
Shipment
```

Website bukan sekadar katalog.

### Primary conversion

**Qualified Buyer Inquiry**

### Secondary conversion

**Supplier Registration**

### Future conversion

**Repeat Buyer / RFQ Management**

---

# 04. TARGET AUDIENCE

## Primary

### Importers

Membutuhkan produk Indonesia dalam volume impor.

### Distributors

Membutuhkan supply untuk jaringan distribusi lokal.

### Wholesalers

Membutuhkan volume container/bulk.

### Private Label Buyers

Membutuhkan produk yang bisa dipasarkan menggunakan brand mereka sendiri.

### Hospitality Buyers

Terutama relevan untuk:

- Coconut Shell Charcoal
- BBQ
- Shisha/hookah
- Restaurants
- Cafés
- Hospitality businesses.

---

# 05. PRODUCT PORTFOLIO

## Product 01 — Palm Cooking Oil

**Category:**

> Food & Edible Oil

Positioning:

> Indonesian palm-based cooking oil for retail, wholesale and commercial requirements.

Potential formats:

- Retail
- Bulk
- Custom
- Private Label

---

## Product 02 — Coconut Oil

**Category:**

> Food & Edible Oil

Positioning:

> Indonesian coconut oil for food, commercial and private-label applications.

Possible product types:

- Refined Coconut Oil
- Virgin Coconut Oil
- Other buyer-specific specifications

**Important:**

Jangan mengunci satu jenis coconut oil sebelum supplier dan buyer specification ditentukan.

---

# 06. PRODUCT 03 — COCONUT SHELL CHARCOAL BRIQUETTES

**Category:**

> Shisha / BBQ / Hospitality

Positioning:

> Indonesian coconut shell charcoal briquettes for shisha, hookah, BBQ and hospitality applications.

### Applications

```text
Shisha / Hookah
BBQ
Hospitality
Private Label
```

---

# 07. CHARCOAL SPECIFICATION FRAMEWORK

Spesifikasi yang sudah lo riset harus masuk sebagai **target market specification**, bukan sebagai klaim bahwa seluruh produk EGI memenuhi angka tersebut.

Target yang sudah ada dalam riset:

| Parameter | Target |
|---|---:|
| Calorific Value | Min. 7,000–7,500 kcal/kg |
| Moisture | Max. 5–6% |
| Ash Content | 1.7–2.5% |
| Ash Color | White / Snow White |
| Fixed Carbon | 75–85% |
| Volatile Matter | 12–15% |
| Burning Time | >2 hours / 90–120 min |
| Burning Temperature | Min. 600°C |
| Shape | Cube |
| Size | 25×25×25 / 26×26×26 mm |
| Hardness | Drop-test resistant |

Angka tersebut berasal dari spesifikasi riset UAE/Saudi yang lo berikan.  

Riset lain yang lo lampirkan menunjukkan bahwa requirement dapat lebih tinggi/bervariasi, misalnya calorific value ≥7.500–7.800 kcal/kg, fixed carbon ≥80–82%, burning time ≥2,5 jam, serta variasi ukuran. 

### Website wording

Gunakan:

> **Target Specifications**

bukan:

> **Guaranteed Specifications**

Disclaimer:

> **Specifications shown are target specifications based on market requirements and may vary according to buyer specification, supplier capability and final laboratory testing.**

---

# 08. PRODUCT DETAIL TEMPLATE

Semua produk menggunakan template yang konsisten:

```text
PRODUCT HERO
        ↓
PRODUCT OVERVIEW
        ↓
APPLICATIONS
        ↓
SPECIFICATIONS
        ↓
PACKAGING OPTIONS
        ↓
MOQ / SUPPLY
        ↓
QUALITY & DOCUMENTATION
        ↓
PRIVATE LABEL
        ↓
EXPORT TERMS
        ↓
REQUEST QUOTE
```

Dengan demikian produk baru nantinya tinggal menggunakan template yang sama.

---

# 09. SITE MAP

## Primary

```text
/
├── Products
│   ├── Palm Cooking Oil
│   ├── Coconut Oil
│   └── Coconut Shell Charcoal Briquettes
│
├── Markets
│   ├── Saudi Arabia
│   ├── United Arab Emirates
│   └── GCC
│
├── Solutions
│   ├── Bulk Supply
│   ├── Private Label
│   └── Custom Sourcing
│
├── How It Works
├── Quality & Documentation
├── About Us
├── For Buyers
├── For Suppliers
├── FAQ
├── Contact
└── Request a Quote
```

## Legal

```text
/privacy-policy
/terms-and-conditions
/cookie-policy
```

---

# 10. NAVIGATION

Desktop:

```text
[EGI LOGO]

Products
Markets
Solutions
How It Works
About

[Request a Quote]
```

### Products

```text
Palm Cooking Oil
Coconut Oil
Coconut Shell Charcoal Briquettes
```

### Markets

```text
Saudi Arabia
United Arab Emirates
GCC Markets
```

### Solutions

```text
Bulk Supply
Private Label
Custom Sourcing
```

### Mobile

```text
Home
Products
Markets
Solutions
How It Works
About
FAQ
Contact

[REQUEST A QUOTE]
```

**Request a Quote harus menjadi primary CTA.**

---

# 11. HOMEPAGE

Urutan final:

```text
01 NAVBAR
↓
02 HERO
↓
03 TRUST / VALUE STRIP
↓
04 WHO WE SERVE
↓
05 OUR PRODUCTS
↓
06 PRODUCT APPLICATIONS / CATEGORIES
↓
07 PRIVATE LABEL
↓
08 CUSTOM SOURCING
↓
09 WHY EXPORT GLOBAL INDONESIA
↓
10 HOW IT WORKS
↓
11 QUALITY & DOCUMENTATION
↓
12 TARGET MARKETS
↓
13 ABOUT US
↓
14 FAQ
↓
15 FINAL REQUEST QUOTE CTA
↓
16 FOOTER
```

---

# 12. HERO

### Headline

> **Connecting Global Buyers with Quality Products from Indonesia**

### Subheadline

> Source export-ready Indonesian products through a reliable B2B sourcing and export partner.

CTA:

**Request a Quote**

Secondary:

**Explore Products**

### Visual

Harus merepresentasikan:

```text
INDONESIA
    ↓
PRODUCT SOURCING
    ↓
PALM OIL / COCONUT OIL / CHARCOAL
    ↓
CONTAINER
    ↓
GLOBAL BUYERS
```

---

# 13. TRUST STRIP

```text
Indonesia-Based
Export-Ready Products
B2B International Supply
Export Coordination
```

Tidak menggunakan angka/claim yang belum diverifikasi.

---

# 14. WHO WE SERVE

Cards:

### Importers

> Source Indonesian products according to your required specification, quantity and packaging.

### Distributors

> Build reliable supply channels for food, hospitality and consumer markets.

### Wholesalers

> Access container-scale Indonesian products with flexible commercial requirements.

### Private Label Buyers

> Develop your own brand with Indonesian manufacturing and sourcing partners.

---

# 15. OUR PRODUCTS

### Palm Cooking Oil

Food & Edible Oil

### Coconut Oil

Food & Edible Oil

### Coconut Shell Charcoal Briquettes

Shisha / BBQ / Hospitality

Setiap card memiliki:

- product image
- category
- short description
- key tags
- View Product CTA.

---

# 16. PRODUCT COMPARISON

Section:

> **Choose the Product That Fits Your Market**

| | Palm Oil | Coconut Oil | Coconut Briquette |
|---|---|---|---|
| Primary Market | Food | Food | Shisha / BBQ |
| B2B Supply | ✓ | ✓ | ✓ |
| Retail | ✓ | ✓ | ✓ |
| Bulk | ✓ | ✓ | ✓ |
| Private Label | ✓ | ✓ | ✓ |
| Container Supply | ✓ | ✓ | ✓ |

**Catatan:** tabel ini adalah positioning/capability framework, bukan jaminan availability untuk setiap supplier.

---

# 17. SOLUTIONS

## Bulk Supply

> Container-scale supply for importers, distributors and wholesalers.

## Private Label

> Build your own brand using Indonesian manufacturing and sourcing partners.

## Custom Sourcing

> Looking for a specific Indonesian product? Tell us what you need and we'll help identify suitable supply options.

---

# 18. PRIVATE LABEL

### Headline

> **Your Brand. Indonesian Supply.**

Flow:

```text
Brand Requirement
↓
Product Specification
↓
Packaging
↓
Supplier Matching
↓
Sample
↓
Approval
↓
Production
↓
Export
```

CTA:

**Discuss Private Label**

---

# 19. CUSTOM SOURCING

### Heading

> **Can't Find the Product You're Looking For?**

> Tell us your requirements and we can explore suitable Indonesian sourcing options.

Form:

```text
Product
Specification
Quantity
Packaging
Destination
Application
Target Price
Message
```

Ini memastikan website tetap scalable.

---

# 20. WHY EXPORT GLOBAL INDONESIA

Empat value proposition:

### Indonesian Sourcing

Access products sourced from Indonesian manufacturers and suppliers.

### Buyer-Specific Requirements

Product specifications, packaging and quantity can be discussed according to buyer requirements.

### Export Coordination

Coordinate documentation, logistics and shipment preparation with relevant partners.

### Transparent Communication

Clear product information, quotation and transaction requirements.

---

# 21. HOW IT WORKS

```text
01 Inquiry
↓
02 Requirement Review
↓
03 Supplier Sourcing
↓
04 Quotation
↓
05 Sample / Verification
↓
06 Order Confirmation
↓
07 Production / Preparation
↓
08 Export Preparation
↓
09 Shipment
```

---

# 22. QUALITY & DOCUMENTATION

### Product Documentation

```text
Product Specification
COA
Lab Test
MSDS — where applicable
Quality Certificates
Packaging Specification
```

### Export Documentation

```text
Commercial Invoice
Packing List
Certificate of Origin
Export Documentation
Shipping Documentation
Destination-Specific Documents
```

### Required disclaimer

> Documentation requirements vary by product, destination country, buyer requirements and applicable regulations.

---

# 23. TARGET MARKETS

### Primary

🇸🇦 Saudi Arabia  
🇦🇪 United Arab Emirates

### Secondary

🇶🇦 Qatar  
🇰🇼 Kuwait  
🇴🇲 Oman  
🇧🇭 Bahrain

Gunakan:

> **Target Markets**

bukan:

> **Countries We Currently Export To**

kecuali nanti memang sudah terverifikasi.

---

# 24. MARKET PAGE TEMPLATE

```text
MARKET HERO
↓
MARKET OVERVIEW
↓
RELEVANT PRODUCTS
↓
BUYER TYPES
↓
PRODUCT REQUIREMENTS
↓
PACKAGING
↓
DOCUMENTATION
↓
SHIPPING CONSIDERATIONS
↓
REQUEST QUOTE
```

URLs:

```text
/markets/saudi-arabia
/markets/united-arab-emirates
/markets/gcc
```

---

# 25. FOR BUYERS

URL:

`/for-buyers`

Flow:

```text
Tell Us What You Need
↓
Supply Options
↓
Quotation
↓
Specification Review
↓
Sample / Verification
↓
Order
↓
Export
```

CTA:

**Start Your Inquiry**

---

# 26. FOR SUPPLIERS

URL:

`/for-suppliers`

### Heading

> **Become an Indonesian Supply Partner**

Form:

```text
Company Name
Factory Location
Product
Production Capacity
MOQ
Packaging
Certifications
Export Experience
Website
Contact
```

---

# 27. REQUEST A QUOTE

URL:

`/request-a-quote`

### Company

```text
Company Name *
Country *
Contact Person *
Business Email *
Phone / WhatsApp
```

### Product

```text
Product *
├── Palm Cooking Oil
├── Coconut Oil
├── Coconut Shell Charcoal Briquettes
└── Custom Product
```

### Requirement

```text
Product Specification
Quantity *
Unit
Packaging
Destination Country *
Destination Port *
Incoterm
├── FOB
├── CIF
└── Other
Private Label
Target Price
Additional Requirements
```

---

# 28. LEAD MANAGEMENT

Setiap inquiry harus secara konsep dapat menjadi:

```text
BUYER LEAD
│
├── Company
├── Country
├── Contact
├── Product
├── Quantity
├── Specification
├── Packaging
├── Destination
├── Incoterm
├── Private Label
├── Target Price
├── Notes
├── Status
└── Created At
```

Status:

```text
NEW
↓
QUALIFICATION
↓
SUPPLIER SOURCING
↓
QUOTATION
↓
NEGOTIATION
↓
SAMPLE
↓
PO
↓
WON / LOST
```

Untuk Phase 1, belum perlu dashboard kompleks.

Form + email/database cukup.

---

# 29. SUPPLIER DATA ARCHITECTURE

Nanti:

```text
SUPPLIER
│
├── Company
├── Location
├── Product
├── Production Capacity
├── MOQ
├── Packaging
├── Certifications
├── Export Experience
├── Product Specifications
├── COA
├── Lab Test
├── MSDS
├── Contact
└── Verification Status
```

---

# 30. PRODUCT DATA ARCHITECTURE

Jangan hardcode produk di UI.

```text
PRODUCT
│
├── name
├── slug
├── category
├── short_description
├── description
├── applications
├── specifications
├── packaging_options
├── moq
├── supply_capacity
├── origin
├── incoterms
├── destination_markets
├── documentation
├── certifications
├── images
├── private_label_available
├── supplier_availability
└── status
```

---

# 31. CHARCOAL DATA STRUCTURE

Untuk Coconut Briquette:

```text
SPECIFICATIONS
│
├── calorific_value
├── moisture
├── ash
├── ash_color
├── fixed_carbon
├── volatile_matter
├── burning_time
├── burning_temperature
├── shape
├── size
├── hardness
├── smoke
├── odor
├── spark
└── binding_agent
```

Namun field tambahan seperti smoke, odor, spark, dan binding agent **jangan diberi nilai sebelum ada data supplier/COA/test yang mendukung**.

---

# 32. CONTENT GOVERNANCE

Ini wajib untuk mencegah AI hallucination.

## AI MUST NOT invent:

- supplier
- factory
- certifications
- COA results
- laboratory results
- buyer
- customer count
- export history
- production capacity
- market share
- shipping history
- legal entity information
- regulatory approval.

### Jika informasi belum tersedia:

Gunakan:

> **Available upon request**

atau

> **Subject to supplier confirmation**

atau

> **To be confirmed**

---

# 33. SPECIFICATION GOVERNANCE

Ada tiga status:

### TARGET

Requirement pasar / buyer.

### VERIFIED

Didukung oleh supplier documentation / COA / lab test.

### AVAILABLE

Supplier mengonfirmasi produk tersedia.

Contoh:

```text
Calorific Value
TARGET: ≥7,500 kcal/kg
VERIFIED: Pending
AVAILABLE: Pending Supplier Confirmation
```

Ini jauh lebih aman daripada menampilkan:

> ≥7,500 kcal/kg

seolah-olah semua produk EGI pasti memenuhi angka tersebut.

---

# 34. SEO ARCHITECTURE

Setiap product page harus mempunyai:

```text
Unique Title
Meta Description
H1
Canonical URL
Open Graph
Structured Content
Internal Links
FAQ
```

Contoh:

```text
/products/palm-cooking-oil
/products/coconut-oil
/products/coconut-shell-charcoal-briquettes
```

Market:

```text
/markets/saudi-arabia
/markets/united-arab-emirates
```

Jangan membuat keyword stuffing.

---

# 35. COMPONENT SYSTEM

Reusable components:

```text
Navbar
Hero
CTA
TrustStrip
ProductCard
ProductGrid
ProductBadge
ProductComparison
SpecificationTable
ApplicationCard
MarketCard
BuyerTypeCard
ProcessTimeline
SolutionCard
FAQAccordion
QuoteForm
SupplierForm
Footer
```

Product template:

```text
ProductHero
ProductOverview
ProductApplications
ProductSpecs
ProductPackaging
ProductDocumentation
ProductPrivateLabel
ProductCTA
```

---

# 36. DESIGN SYSTEM

**Visual identity existing harus menjadi baseline.**

### Direction

> Modern B2B + Indonesian Origin + Premium Commodity

Color direction yang sebelumnya direncanakan:

- Dark / charcoal
- Off-white
- Natural green
- Warm coconut / sand accent

**Tetapi AI harus memprioritaskan existing website's actual palette** daripada mengganti semuanya berdasarkan dokumentasi ini.

---

# 37. PRODUCT VISUAL LANGUAGE

### Palm Oil

Golden / amber

Visual:

- palm
- cooking oil
- bottle
- container
- food.

### Coconut Oil

Cream / white

Visual:

- coconut
- coconut flesh
- oil
- food.

### Coconut Briquette

Black / charcoal

Visual:

- coconut shell
- briquette cube
- shisha
- BBQ
- hospitality.

Ketiganya tetap harus terlihat sebagai **satu brand**.

---

# 38. RESPONSIVE REQUIREMENTS

AI wajib memastikan:

### Desktop

- full navigation
- multi-column layouts
- product comparison
- horizontal process timeline where suitable.

### Tablet

- adaptive grids
- compressed navigation
- readable specification tables.

### Mobile

- hamburger navigation
- stacked cards
- horizontally scrollable comparison/spec tables where necessary
- large CTA
- readable forms
- no horizontal page overflow.

---

# 39. PERFORMANCE

Wajib:

- optimized images
- lazy loading
- semantic HTML
- accessible controls
- responsive images
- minimal unnecessary JS
- fast initial render.

---

# 40. FORM REQUIREMENTS

Semua form harus memiliki:

```text
Validation
Error State
Success State
Loading State
Spam Protection
Input Sanitization
Required Field Handling
```

Tidak boleh ada form yang setelah submit hanya "diam" tanpa feedback.

---

# 41. SECURITY

Untuk implementasi backend:

- validate server-side
- sanitize input
- rate-limit inquiry endpoint
- protect admin/supplier information
- secrets via environment variables
- don't expose database credentials
- don't expose private supplier data publicly.

---

# 42. PHASE IMPLEMENTATION

## PHASE 0 — AUDIT

AI **harus melakukan ini terlebih dahulu**.

```text
Inspect Existing Website
↓
Inspect Existing Codebase
↓
Identify Components
↓
Identify Assets
↓
Identify Design System
↓
Identify Existing Pages
↓
Identify Existing Functionality
↓
Create Preservation / Modification Map
```

**Tidak boleh langsung rewrite.**

---

## PHASE 1 — CORE REVAMP

```text
Navbar
Hero
Trust Strip
Who We Serve
Products
Why Us
How It Works
Request Quote
Footer
```

Tambahkan tiga produk.

---

## PHASE 2 — PRODUCT

```text
Palm Cooking Oil
Coconut Oil
Coconut Shell Charcoal Briquettes
```

Lengkapi:

- product details
- applications
- specifications
- packaging
- documentation
- private label.

---

## PHASE 3 — MARKET

```text
Saudi Arabia
United Arab Emirates
GCC
```

---

## PHASE 4 — BUSINESS INFRASTRUCTURE

```text
Buyer Lead Database
Supplier Database
RFQ Management
Supplier Matching
Quotation Management
Lead Pipeline
```

---

# 43. ACCEPTANCE CRITERIA

AI dianggap berhasil jika:

### Brand

- Existing visual identity tetap terasa.
- Logo tidak berubah.
- Existing design language tidak hilang.

### Products

- Tiga produk tersedia.
- Setiap produk memiliki detail page.
- Product architecture scalable.

### Buyer

- Buyer memahami produk dalam beberapa detik.
- Buyer tahu cara request quotation.
- RFQ form berfungsi.
- CTA konsisten.

### Supplier

- Supplier dapat mengajukan diri.
- Supplier data memiliki struktur.

### Technical

- Responsive.
- SEO-ready.
- Forms validated.
- No broken links.
- No console errors.
- No fake data.
- No unsupported claims.

---

# 44. FINAL HOMEPAGE WIREFRAME

```text
┌───────────────────────────────────────────┐
│ NAVBAR                                    │
│ Logo | Products | Markets | Solutions     │
│                              [QUOTE]      │
├───────────────────────────────────────────┤
│                                           │
│ HERO                                      │
│ Connecting Global Buyers                  │
│ with Quality Products from Indonesia      │
│                                           │
│ [REQUEST QUOTE] [EXPLORE PRODUCTS]        │
│                                           │
├───────────────────────────────────────────┤
│ TRUST STRIP                               │
├───────────────────────────────────────────┤
│ WHO WE SERVE                              │
│ Importer | Distributor | Wholesale |      │
│ Private Label                             │
├───────────────────────────────────────────┤
│ OUR PRODUCTS                              │
│                                           │
│ [PALM OIL] [COCONUT OIL] [BRIQUETTE]      │
├───────────────────────────────────────────┤
│ PRODUCT APPLICATIONS                      │
├───────────────────────────────────────────┤
│ PRIVATE LABEL                             │
├───────────────────────────────────────────┤
│ CUSTOM SOURCING                           │
├───────────────────────────────────────────┤
│ WHY EXPORT GLOBAL INDONESIA               │
├───────────────────────────────────────────┤
│ HOW IT WORKS                              │
├───────────────────────────────────────────┤
│ QUALITY & DOCUMENTATION                   │
├───────────────────────────────────────────┤
│ TARGET MARKETS                            │
│ Saudi | UAE | GCC                         │
├───────────────────────────────────────────┤
│ ABOUT US                                  │
├───────────────────────────────────────────┤
│ FAQ                                       │
├───────────────────────────────────────────┤
│ REQUEST A QUOTE                           │
├───────────────────────────────────────────┤
│ FOOTER                                    │
└───────────────────────────────────────────┘
```

---

# 45. MASTER RULE UNTUK AI CODING AGENT

Ini gue sarankan ditaruh **paling atas dokumentasi**, supaya AI nggak salah interpretasi.

> **IMPLEMENTATION DIRECTIVE**
>
> This project is an improvement and restructuring of an existing Export Global Indonesia website, not a complete visual replacement.
>
> Before modifying the website, inspect and understand the existing website, codebase, design system, components, assets, typography, colors, spacing, animations and responsive behavior.
>
> Preserve the existing visual identity wherever practical. Reuse existing components and design patterns instead of replacing them with generic templates.
>
> The primary task is to improve information architecture, B2B buyer experience, product presentation, conversion flow, scalability and content structure.
>
> The website must support three initial product lines:
>
> 1. Palm Cooking Oil
> 2. Coconut Oil
> 3. Coconut Shell Charcoal Briquettes
>
> The architecture must remain scalable so additional Indonesian products can be added later without restructuring the entire website.
>
> Do not invent business information, suppliers, certifications, customers, export history, product test results or market claims.
>
> Product specifications that are currently classified as market/target specifications must not be presented as guaranteed product specifications unless verified by supplier documentation or laboratory testing.
>
> When information is unavailable, use appropriate states such as "Available upon request", "Subject to supplier confirmation", or "To be confirmed".
>
> The final website should function as a **B2B Indonesian sourcing and export lead-generation platform**, not merely as a static product catalog.

---

**Nah, versi ini baru gue anggap cukup "lengkap" untuk lo jadikan master documentation.**

Yang paling penting: **gue sengaja memisahkan `TARGET → VERIFIED → AVAILABLE`** untuk spesifikasi produk. Itu akan sangat membantu ketika nanti lo mulai hunting supplier charcoal/coconut oil/palm oil, karena website tidak akan keburu menjanjikan sesuatu yang supplier ternyata nggak bisa penuhi.

Dan struktur ini juga sudah nyambung dari **website → product → buyer → RFQ → supplier → quotation → export**, jadi nanti ketika lo naik dari landing page ke sistem operasional, arsitekturnya nggak perlu dibongkar lagi.
