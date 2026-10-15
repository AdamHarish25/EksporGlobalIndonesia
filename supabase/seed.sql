-- ============================================================================
-- Harvestora Global Indonesia — Seed katalog produk (mirror src/constants/products.ts)
-- Cara pakai: jalankan SETELAH schema.sql. Aman diulang (upsert + reset specs).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Products (UUID tetap agar seed idempotent)
-- ----------------------------------------------------------------------------
insert into public.products (
  id, slug, name, category, category_color,
  short_description, description, applications,
  moq, supply_capacity, origin, image_url, gallery,
  incoterms, destination_markets, documentation, certifications,
  private_label, status
) values
(
  '11111111-1111-4111-8111-111111111111',
  'shallots',
  'Shallots (Bawang Merah)',
  'Fresh Produce', 'brand',
  'Indonesian red shallots for wholesale, retail, food manufacturing and distribution.',
  'Harvestora Global Indonesia offers Indonesian red shallots (bawang merah) for wholesale, retail, food manufacturing, and distribution applications. Grading, packaging, and quantity can be discussed according to buyer requirements and supplier availability.',
  ARRAY['Wholesale Markets','Retail & Supermarkets','Food Manufacturing','Food Service / HoReCa','Distribution & Re-export'],
  'Available upon request', 'Subject to supplier confirmation', 'Indonesia',
  '/Shallots1.webp', ARRAY['/Shallots1.webp','/shallots2.webp'],
  ARRAY['FOB'], ARRAY['Global'],
  ARRAY['Commercial Invoice','Packing List','Bill of Lading (B/L)','Certificate of Origin (COO)','Certificate of Analysis (CoA, if required)','Phytosanitary Certificate (if required)'],
  ARRAY['CoA'],
  false, 'published'
),
(
  '22222222-2222-4222-8222-222222222222',
  'palm-sugar',
  'Palm Sugar (Gula Aren)',
  'Natural Sweetener', 'brand',
  'Indonesian aren palm sugar for food, beverage, retail and private-label applications.',
  'Harvestora Global Indonesia supplies Indonesian palm sugar (gula aren) derived from aren palm sap, suitable for food, beverage, retail, and private-label applications. Form, packaging, and specifications can be discussed according to buyer requirements.',
  ARRAY['Food & Beverage Manufacturing','Baking & Confectionery','Food Service / HoReCa','Retail & Supermarkets','Private Label Retail'],
  'Available upon request', 'Subject to supplier confirmation', 'Indonesia',
  '/GulaAren.jpeg', ARRAY['/GulaAren.jpeg','/GulaAren2.jpeg'],
  ARRAY['FOB'], ARRAY['Global'],
  ARRAY['Commercial Invoice','Packing List','Bill of Lading (B/L)','Certificate of Origin (COO)','Certificate of Analysis (CoA)','Halal Certificate'],
  ARRAY['CoA','Halal'],
  true, 'published'
),
(
  '33333333-3333-4333-8333-333333333333',
  'coconut-shell-charcoal-briquettes',
  'Coconut Shell Charcoal Briquettes',
  'Shisha / BBQ / Hospitality', 'slate',
  'Indonesian coconut shell charcoal briquettes for shisha, hookah, BBQ and hospitality applications.',
  'Harvestora Global Indonesia supplies Indonesian coconut shell charcoal briquettes designed for shisha, hookah, BBQ, and hospitality applications. Our briquettes are manufactured from premium coconut shells with target specifications aligned to China and wider Asian market requirements.',
  ARRAY['Shisha / Hookah','BBQ & Grilling','Hospitality & Restaurants','Cafés & Lounges','Private Label Retail'],
  'Available upon request', 'Subject to supplier confirmation', 'Indonesia',
  '/CocoBriquette.webp', ARRAY['/CocoBriquette.webp','/CoconutShells.webp'],
  ARRAY['FOB'], ARRAY['China','Southeast Asia','Asia-Pacific'],
  ARRAY['Commercial Invoice','Packing List','Bill of Lading (B/L)','Certificate of Origin (COO)','Certificate of Analysis (CoA)','Lab Test Report'],
  ARRAY['CoA'],
  true, 'published'
)
on conflict (id) do update set
  slug = excluded.slug, name = excluded.name, category = excluded.category,
  category_color = excluded.category_color,
  short_description = excluded.short_description, description = excluded.description,
  applications = excluded.applications, moq = excluded.moq,
  supply_capacity = excluded.supply_capacity, origin = excluded.origin,
  image_url = excluded.image_url, gallery = excluded.gallery,
  incoterms = excluded.incoterms, destination_markets = excluded.destination_markets,
  documentation = excluded.documentation, certifications = excluded.certifications,
  private_label = excluded.private_label, status = excluded.status;

-- ----------------------------------------------------------------------------
-- Specs: shallots
-- ----------------------------------------------------------------------------
delete from public.product_specs where product_id = '11111111-1111-4111-8111-111111111111';
insert into public.product_specs (product_id, param, value, status, unit, sort_order) values
  ('11111111-1111-4111-8111-111111111111', 'Variety', 'Indonesian Red Shallot (Bawang Merah)', 'TARGET', null, 1),
  ('11111111-1111-4111-8111-111111111111', 'Size / Diameter', 'Graded S/M/L, typically 2–4 cm', 'TARGET', null, 2),
  ('11111111-1111-4111-8111-111111111111', 'Condition', 'Fresh, clean, dry, sprout-free', 'TARGET', null, 3),
  ('11111111-1111-4111-8111-111111111111', 'Moisture', 'Available upon request', 'TARGET', null, 4),
  ('11111111-1111-4111-8111-111111111111', 'Shelf Life', 'Available upon request', 'TARGET', null, 5),
  ('11111111-1111-4111-8111-111111111111', 'Purity / Sorting', 'Sorted, foreign matter minimized', 'TARGET', null, 6);

-- ----------------------------------------------------------------------------
-- Specs: palm sugar
-- ----------------------------------------------------------------------------
delete from public.product_specs where product_id = '22222222-2222-4222-8222-222222222222';
insert into public.product_specs (product_id, param, value, status, unit, sort_order) values
  ('22222222-2222-4222-8222-222222222222', 'Raw Material', 'Aren palm (Arenga pinnata) sap', 'TARGET', null, 1),
  ('22222222-2222-4222-8222-222222222222', 'Form', 'Granulated / Block / Liquid (per buyer spec)', 'TARGET', null, 2),
  ('22222222-2222-4222-8222-222222222222', 'Moisture', 'Available upon request', 'TARGET', null, 3),
  ('22222222-2222-4222-8222-222222222222', 'Sucrose Content', 'Available upon request', 'TARGET', null, 4),
  ('22222222-2222-4222-8222-222222222222', 'Color & Aroma', 'Typical caramel-brown, characteristic aren aroma', 'TARGET', null, 5),
  ('22222222-2222-4222-8222-222222222222', 'Shelf Life', 'Available upon request', 'TARGET', null, 6);

-- ----------------------------------------------------------------------------
-- Specs: charcoal briquettes
-- ----------------------------------------------------------------------------
delete from public.product_specs where product_id = '33333333-3333-4333-8333-333333333333';
insert into public.product_specs (product_id, param, value, status, unit, sort_order) values
  ('33333333-3333-4333-8333-333333333333', 'Calorific Value', 'Min 7,000–7,500', 'TARGET', 'kcal/kg', 1),
  ('33333333-3333-4333-8333-333333333333', 'Moisture', 'Max 5–6%', 'TARGET', null, 2),
  ('33333333-3333-4333-8333-333333333333', 'Ash Content', '1.7–2.5%', 'TARGET', null, 3),
  ('33333333-3333-4333-8333-333333333333', 'Ash Color', 'White / Snow White', 'TARGET', null, 4),
  ('33333333-3333-4333-8333-333333333333', 'Fixed Carbon', '75–85%', 'TARGET', null, 5),
  ('33333333-3333-4333-8333-333333333333', 'Volatile Matter', '12–15%', 'TARGET', null, 6),
  ('33333333-3333-4333-8333-333333333333', 'Burning Time', '>2 hours', 'TARGET', '90–120 min', 7),
  ('33333333-3333-4333-8333-333333333333', 'Burning Temperature', 'Min 600°C', 'TARGET', null, 8),
  ('33333333-3333-4333-8333-333333333333', 'Shape', 'Cube', 'TARGET', null, 9),
  ('33333333-3333-4333-8333-333333333333', 'Size', '25×25×25 / 26×26×26', 'TARGET', 'mm', 10),
  ('33333333-3333-4333-8333-333333333333', 'Hardness', 'Drop-test resistant', 'TARGET', null, 11);

-- ----------------------------------------------------------------------------
-- Packaging: shallots
-- ----------------------------------------------------------------------------
delete from public.product_packaging where product_id = '11111111-1111-4111-8111-111111111111';
insert into public.product_packaging (product_id, size, pack, detail, sort_order) values
  ('11111111-1111-4111-8111-111111111111', '5kg / 10kg Mesh Bag', 'Ventilated Bag', 'Wholesale / market use', 1),
  ('11111111-1111-4111-8111-111111111111', '25kg / 50kg Sack', 'Jute / Mesh Sack', 'Bulk shipment', 2),
  ('11111111-1111-4111-8111-111111111111', 'Carton Box', 'Buyer Specification', 'Retail / export grade', 3);

-- ----------------------------------------------------------------------------
-- Packaging: palm sugar
-- ----------------------------------------------------------------------------
delete from public.product_packaging where product_id = '22222222-2222-4222-8222-222222222222';
insert into public.product_packaging (product_id, size, pack, detail, sort_order) values
  ('22222222-2222-4222-8222-222222222222', '500g / 1kg Pouch', 'Retail Packaging', 'Available upon request', 1),
  ('22222222-2222-4222-8222-222222222222', '25kg / 50kg Sack', 'Food-grade Sack', 'Bulk / manufacturing use', 2),
  ('22222222-2222-4222-8222-222222222222', 'Custom Private Label', 'Buyer Specification', 'Private label available', 3);

-- ----------------------------------------------------------------------------
-- Packaging: charcoal briquettes
-- ----------------------------------------------------------------------------
delete from public.product_packaging where product_id = '33333333-3333-4333-8333-333333333333';
insert into public.product_packaging (product_id, size, pack, detail, sort_order) values
  ('33333333-3333-4333-8333-333333333333', '1kg Bag', 'Export Carton', 'Retail / Hospitality', 1),
  ('33333333-3333-4333-8333-333333333333', '5kg / 10kg Carton', 'Corrugated Box', 'Wholesale', 2),
  ('33333333-3333-4333-8333-333333333333', 'Custom Private Label', 'Buyer Specification', 'Private label available', 3),
  ('33333333-3333-4333-8333-333333333333', 'Palletized Bulk', 'Container Load', 'Subject to supplier confirmation', 4);
