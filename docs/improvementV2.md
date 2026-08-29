EXPORT GLOBAL INDONESIA
Website Improvement & Implementation Documentation
B2B Indonesian Sourcing & Export Partner
Implementation Brief — V1 Production-Ready Landing Page

# 1. Executive Decision
Website tidak perlu dibuat ulang dari nol. Fondasi positioning sudah tepat: Export Global Indonesia sebagai B2B Indonesian Sourcing & Export Partner. Improvement difokuskan pada product clarity, buyer trust, export process, quotation/inquiry conversion, dan kesiapan informasi produk.
Target akhir V1: seorang buyer baru harus dapat memahami dalam kurang dari 60 detik siapa perusahaan ini, produk apa yang tersedia, bagaimana proses ekspornya, dan bagaimana meminta quotation.
# 2. Current Baseline & Scope Guardrail
Audit web dilakukan terhadap URL publik yang diberikan pengguna. Halaman dapat diakses dan title/positioning terbaca sebagai “Export Global Indonesia | B2B Indonesian Sourcing & Export Partner”. Karena crawl tekstual halaman saat audit tidak mengekspos seluruh DOM/section secara lengkap, dokumen ini sengaja tidak mengklaim detail implementasi yang tidak dapat diverifikasi. Bagian 'Existing / Keep' harus dipertahankan bila sudah tersedia, sedangkan bagian 'Implement' menjadi target improvement.
Reference: https://exportglobalindonesia.netlify.app/
# 3. Priority Matrix
# 4. Recommended Site Architecture
Struktur satu halaman yang disarankan untuk V1:
01 — Header / Navigation
02 — Hero: Indonesian Sourcing & Export Partner
03 — Trust Strip / Key Capabilities
04 — Product Portfolio
05 — Core Product Detail: Palm Cooking Oil
06 — Core Product Detail: Coconut Oil
07 — Why Export Global Indonesia
08 — How Export Works
09 — Quality / Inspection / Documentation
10 — Packaging & Shipment
11 — Target Markets / Export Coverage
12 — FAQ
13 — Request a Quote
14 — Final CTA
15 — Footer + Legal
# 5. Header & Hero — P0
Recommended headline:
Source. Supply. Export from Indonesia.
Supporting copy: Export Global Indonesia helps international buyers source Indonesian products and coordinate quotation, quality confirmation, documentation, and shipment.
Primary CTA: REQUEST A QUOTE
Secondary CTA: VIEW PRODUCTS
Do not make the hero overly generic. The first screen must immediately communicate Indonesia + B2B + products + export.
# 6. Product Portfolio — P0
Rule: jangan memasukkan technical specification yang belum diverifikasi supplier. Gunakan placeholder seperti “Available on Request” bila angka final belum dikunci.
# 7. Product Detail Template — P0
Gunakan template yang sama untuk semua core products:
Product name + short buyer-oriented description
Origin: Indonesia
Product specifications
Available packaging
MOQ / minimum order
Container / shipment capability
Port of Loading
Incoterms supported
Private label / OEM — only if actually available
Sample availability
Quality inspection option
Export documentation support
Request Quote CTA
# 8. Request a Quote Flow — P0
Form fields:
Success state: “Thank you. Your inquiry has been received. Our export team will review your requirements and respond with the next step.”
Minimum backend/automation: store submission or forward securely to the business inbox/CRM; jangan expose API keys di frontend.
# 9. Export Process — P0
Visual 8-step flow:
Buyer Inquiry
Product & Specification Confirmation
Quotation
Sample / Quality Confirmation (if required)
Purchase Order / Commercial Agreement
Production / Preparation + Inspection
Export Documentation + Container Loading
Shipment
Copy harus menjelaskan proses tanpa menjanjikan lead time, certification, inspection, atau shipping terms yang belum benar-benar tersedia.
# 10. Trust & Credibility — P0
Gunakan capability-based trust, bukan klaim berlebihan:
Indonesia-based sourcing
Supplier coordination
Product specification confirmation
Quality inspection coordination
Export documentation support
Container shipment coordination
FOB / other Incoterm support where available
Responsive B2B communication
Tambahkan bukti hanya jika tersedia: company identity, business registration, supplier/factory relationship, inspection report, certifications, product documents, atau shipment evidence.
# 11. Visual / Asset Mapping
Visual rule: jangan menggunakan semua gambar sekaligus. Prioritaskan 1 hero + 1–2 product visuals + process visuals. Gunakan consistent aspect ratio, compression, lazy loading, dan meaningful alt text.
# 12. Packaging & Shipment — P0/P1
Tambahkan section yang menjawab pertanyaan buyer:
What packaging options are available?
Can private label / OEM be supported?
How is container loading handled?
What is the port of loading?
Which Incoterms are available?
Can quality inspection be arranged?
What export documents can be provided?
Jangan menampilkan FOB/CIF/lead time sebagai guarantee jika belum ada commercial process yang mendukung.
# 13. Target Market Section — P1
Gunakan bahasa seperti “We support international buyers across selected markets” dan tampilkan negara/region hanya jika memang menjadi target bisnis. Hindari logo negara/perusahaan yang dapat terlihat sebagai customer claim bila belum ada hubungan resmi.
# 14. FAQ — P1
What products can you supply from Indonesia?
What is your MOQ?
Can you provide samples?
What packaging options are available?
Can you support private label / OEM?
Which Incoterms can you offer?
What is your port of loading?
Can you arrange inspection?
What export documents are available?
How do I request a quotation?
How long does quotation preparation take?
# 15. SEO & Technical Improvements — P1
# 16. Conversion Tracking — P1
Events to track:
view_product
click_request_quote
submit_quote
click_whatsapp
click_email
download_product_sheet
scroll_to_process
Goal: setelah 2–4 minggu, keputusan improvement dibuat dari buyer behavior, bukan sekadar feeling desain.
# 17. Legal & Business Information — P1
Privacy Policy
Terms / Website Terms
Contact / business identity
Cookie notice only if applicable to actual tracking implementation
Pastikan nama badan usaha, alamat, email, nomor kontak, dan legal claims konsisten dengan dokumen bisnis yang benar.
# 18. Design Direction
Premium B2B industrial/agri-export feel, bukan e-commerce retail.
Gunakan whitespace dan hierarchy yang kuat.
Product cards harus lebih informatif daripada dekoratif.
CTA utama konsisten di seluruh halaman.
Gunakan foto supply chain/port/refinery untuk credibility; foto produk untuk conversion.
Hindari terlalu banyak animasi.
Mobile-first: sticky or persistent Quote CTA dapat dipertimbangkan.
# 19. Implementation Order
# 20. Acceptance Checklist — Final V1
☐ Buyer can identify company positioning within first screen.
☐ Palm Cooking Oil is clearly presented as a core product.
☐ Coconut Oil is clearly presented as a core product.
☐ Every core product has a Request Quote CTA.
☐ Buyer can submit product + quantity + destination.
☐ Export process is visible and understandable.
☐ Quality/inspection capability is explained without false claims.
☐ Packaging/shipment information is available.
☐ WhatsApp/contact CTA works on mobile.
☐ No placeholder copy remains on production pages.
☐ No unverified certifications/customer logos/claims are published.
☐ Images are optimized and have useful alt text.
☐ SEO metadata is implemented.
☐ Privacy/Terms/Contact information is accessible.
☐ Analytics tracks quote and contact conversion.
# 21. What NOT to Build Yet
Full e-commerce checkout
Complex CMS if product count is still small
Customer account/login system
Multi-language system beyond what is actually needed
Large product catalog with unverified specifications
Artificial certification/trust badges
Complex animations that do not improve conversion
# 22. Final Product Strategy
Untuk V1, fokuskan website pada dua core products: Palm Cooking Oil dan Coconut Oil. Coconut Shell dan Coconut Charcoal Briquette dapat ditampilkan sebagai “Additional Sourcing / Available on Request” jika supply belum siap menjadi product line utama. Dengan demikian website tetap fleksibel sebagai sourcing/export partner tanpa membuat buyer bingung terhadap prioritas produk.

END OF IMPLEMENTATION DOCUMENT

## Tables

### Table 1
| Document | Value |
| --- | --- |
| Primary URL | https://exportglobalindonesia.netlify.app/ |
| Objective | Meningkatkan website dari company/sourcing landing page menjadi B2B export conversion website. |
| Primary audience | Importer, distributor, wholesaler, trader, food/oil buyer, dan calon B2B buyer internasional. |
| Core products | Palm Cooking Oil + Coconut Oil. |
| Optional / sourcing portfolio | Coconut Shell + Coconut Charcoal Briquette, hanya jika supply benar-benar siap. |
| Primary conversion | Request a Quote / Product Inquiry. |
| Priority | P0 = wajib; P1 = penting; P2 = setelah core flow stabil. |

### Table 2
| Priority | Improvement | Reason | Definition of Done |
| --- | --- | --- | --- |
| P0 | Product Portfolio | Buyer harus langsung tahu produk yang ditawarkan. | Palm Cooking Oil + Coconut Oil tampil jelas dengan CTA per produk. |
| P0 | Request a Quote | Konversi B2B harus punya jalur inquiry konkret. | Form inquiry dapat mengirim data buyer + product + quantity + destination. |
| P0 | Product Detail / Specs | Buyer B2B membutuhkan data sebelum kontak. | Setiap core product punya specification block yang konsisten. |
| P0 | Export Process | Mengurangi keraguan buyer tentang proses. | Flow inquiry → quotation → confirmation → production → inspection → loading → shipment jelas. |
| P0 | Trust & Credibility | Buyer internasional perlu alasan untuk percaya. | Ada quality, documentation, sourcing/export coordination tanpa klaim palsu. |
| P0 | Mobile CTA | Banyak inquiry awal datang via mobile/WhatsApp. | CTA Quote/WhatsApp mudah ditemukan dan usable di mobile. |
| P1 | Target Markets | Memperjelas positioning B2B. | Ada market/region section tanpa klaim volume yang tidak terbukti. |
| P1 | FAQ | Mengurangi repetitive questions. | MOQ, packaging, incoterm, lead time, samples, documentation dijawab. |
| P1 | SEO | Membantu discoverability. | Title, meta description, headings, image alt, OG metadata, sitemap/robots. |
| P1 | Legal | Meningkatkan trust dan basic compliance. | Privacy, Terms, Contact/business identity tersedia. |
| P2 | Downloadable Product Sheet | Memudahkan buyer meneruskan informasi internal. | PDF product sheet per core product. |
| P2 | CMS / dynamic catalog | Belum perlu jika SKU masih sedikit. | Hanya implement bila portfolio mulai bertambah. |

### Table 3
| Product | Position | Required Information | CTA |
| --- | --- | --- | --- |
| Palm Cooking Oil | Core | Type, grade/specification, packaging, MOQ, origin, loading port, incoterm availability, private label if applicable. | Request Palm Oil Quote |
| Coconut Oil | Core | Type, grade/specification, packaging, MOQ, origin, loading port, incoterm availability, private label if applicable. | Request Coconut Oil Quote |
| Coconut Shell | Optional | Only show if supply chain is ready; specify form/grade and application. | Ask for Availability |
| Coconut Charcoal Briquette | Optional | Ash/moisture/fixed carbon or other actual supplier specs; packaging and MOQ. | Ask for Specification |

### Table 4
| Field | Required? | Purpose |
| --- | --- | --- |
| Product | Yes | Menentukan inquiry. |
| Quantity | Yes | Menentukan quotation. |
| Packaging | Optional | Menentukan packing requirement. |
| Destination Country | Yes | Menentukan market. |
| Destination Port | Optional | Membantu freight/Incoterm calculation. |
| Incoterm | Optional | FOB/CFR/CIF atau sesuai kemampuan. |
| Target Delivery | Optional | Lead-time planning. |
| Company Name | Yes | Buyer identification. |
| Contact Person | Yes | Follow-up. |
| Business Email | Yes | Quotation communication. |
| WhatsApp / Phone | Optional | Fast follow-up. |
| Message | Optional | Special requirements. |

### Table 5
| Asset | Recommended Use | Placement |
| --- | --- | --- |
| PalmTree.jpg | Origin / Indonesia sourcing visual | Hero / Palm Oil section |
| PalmOilRefinery.jpg | Processing / supply chain | Palm Oil detail / Process |
| CoconutOil.jpg | Core product | Coconut Oil section |
| CocoBriquette.jpg | Optional product | Optional portfolio card |
| CoconutShells.jpg | Optional sourcing product | Optional portfolio card |
| inspection.jpg | Quality/inspection | Quality section |
| TerminalContainerAerial.jpg | Export logistics | Shipment/process |
| AerialContainerPort.jpg | Port logistics | Shipment/process |
| loadingPort.jpg | Container loading | Export process |
| endproduct.jpg | Finished product / presentation | Product section if relevant |
| refinery.jpg | Industrial supply chain | Process / credibility |

### Table 6
| Item | Implementation |
| --- | --- |
| Title | Export Global Indonesia | Indonesian Sourcing & Export Partner |
| Meta description | Source Indonesian products for international markets with Export Global Indonesia. Explore palm cooking oil, coconut oil and export sourcing support. |
| H1 | Source. Supply. Export from Indonesia. |
| H2 structure | Products, Why Us, Export Process, Quality, FAQ, Request a Quote. |
| Image alt | Describe actual image + product/context; avoid keyword stuffing. |
| Open Graph | Add og:title, og:description, og:image, og:url. |
| Canonical | Canonicalize the production URL. |
| Sitemap | Generate sitemap.xml if the site has multiple indexable pages. |
| Robots | Ensure robots.txt does not accidentally block important pages. |
| Performance | Compress images, WebP/AVIF where supported, lazy-load below-the-fold images. |
| Accessibility | Keyboard navigation, labels, contrast, semantic headings, form error messages. |
| Analytics | Track page view, product CTA click, quote submission, WhatsApp click. |

### Table 7
| Phase | Work | Output |
| --- | --- | --- |
| Sprint 1 | Hero + Header + Product Portfolio + Product Detail | Buyer memahami offering. |
| Sprint 2 | Request Quote + Success state + Contact/WhatsApp | Buyer bisa inquiry. |
| Sprint 3 | Export Process + Quality + Shipment + Trust | Buyer memahami operating model. |
| Sprint 4 | FAQ + Target Market + Legal | Trust + objection handling. |
| Sprint 5 | SEO + performance + accessibility + analytics | Production readiness. |
| Sprint 6 | Product sheet / additional catalog | Sales enablement, optional. |
