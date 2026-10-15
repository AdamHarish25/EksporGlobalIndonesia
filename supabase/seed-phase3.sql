-- ============================================================================
-- Seed Phase 3: solutions + site_content (mirror data statis saat ini)
-- Cara pakai: jalankan SETELAH phase3.sql. Aman diulang.
-- Catatan: menjalankan seed memicu audit_logs (actor null) — itu normal.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- solutions (UUID tetap agar idempotent)
-- ----------------------------------------------------------------------------
insert into public.solutions (
  id, slug, icon_name, title, description, long_desc, features,
  cta, image, image_alt, show_form, status, sort_order
) values
(
  '44444444-4444-4444-8444-444444444444',
  'bulk-supply', 'package',
  'Bulk Supply',
  'Full-container-load (FCL) supply of shallots, palm sugar and charcoal briquettes with competitive FOB pricing.',
  'Full-container-load (FCL) supply of shallots, palm sugar and charcoal briquettes with competitive FOB pricing. Ideal for importers, distributors, and large-scale buyers.',
  ARRAY['FCL quantities (subject to product & packaging)','FOB terms available','Lot-by-lot quality verification','Flexible shipping schedules','Certificate of Analysis (CoA) as applicable','Export documentation support'],
  'Request Bulk Quote',
  '/TerminalContainerAerial.webp', 'Bulk supply shipping',
  false, 'published', 1
),
(
  '55555555-5555-4555-8555-555555555555',
  'private-label', 'tag',
  'Private Label',
  'Custom-branded packaging and labeling through our manufacturing partners. From concept to delivered product.',
  'Launch your own branded product line with Indonesian manufacturing support. Custom packaging, labeling, and branding from concept to delivered product.',
  ARRAY['Custom label design support','Retail-ready packaging','Small & large batch runs','Multiple format options','Chinese / English labeling available','End-to-end export coordination'],
  'Discuss Private Label',
  '/GulaAren.jpeg', 'Private label palm sugar retail packaging',
  false, 'published', 2
),
(
  '66666666-6666-4666-8666-666666666666',
  'custom-sourcing', 'globe',
  'Custom Sourcing',
  'Need a specific Indonesian product? We source and export additional product lines based on buyer requirements.',
  'We source additional Indonesian products based on your requirements — from spec matching to supplier vetting and full export coordination.',
  ARRAY['Product specification matching','Supplier verification & vetting','Quality sampling process','Full documentation support','Flexible MOQ discussion','Long-term supply partnerships'],
  'Start Custom Sourcing',
  '/AerialContainerPort.webp', 'Custom sourcing export port',
  true, 'published', 3
)
on conflict (id) do update set
  slug = excluded.slug, icon_name = excluded.icon_name, title = excluded.title,
  description = excluded.description, long_desc = excluded.long_desc,
  features = excluded.features, cta = excluded.cta, image = excluded.image,
  image_alt = excluded.image_alt, show_form = excluded.show_form,
  status = excluded.status, sort_order = excluded.sort_order;

-- ----------------------------------------------------------------------------
-- site_content (mirror copy statis saat ini)
-- ----------------------------------------------------------------------------
insert into public.site_content (key, value, label) values
  ('hero_badge', '🇮🇩 Indonesian Sourcing & Export Partner', 'Homepage hero — badge di atas judul'),
  ('hero_title', 'Connecting Global Buyers with', 'Homepage hero — judul baris 1'),
  ('hero_title_highlight', 'Quality Products from Indonesia', 'Homepage hero — judul baris 2 (hijau)'),
  ('hero_subtitle', 'Source export-ready Indonesian products through a reliable B2B sourcing and export partner.', 'Homepage hero — subjudul'),
  ('footer_tagline', 'Connecting global buyers with quality products from Indonesia.', 'Footer — tagline di bawah logo'),
  ('contact_email', 'info.harvestoraglobalindonesia@gmail.com', 'Kontak — email (Footer + About)'),
  ('contact_location', 'Indonesia 🇮🇩', 'Kontak — lokasi (Footer + About)')
on conflict (key) do update set
  value = excluded.value, label = excluded.label;
