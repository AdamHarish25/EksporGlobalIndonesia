import {
  Droplet, Package, FlaskConical,
  Leaf, Flame, Wind,
  type LucideIcon,
} from 'lucide-react'
import type { Product, ProductSpecification } from '@/types'

/* -------------------------------------------------------------------------- */
/*                       PALM COOKING OIL SPECIFICATIONS                      */
/* -------------------------------------------------------------------------- */

const palmOilSpecs: ProductSpecification[] = [
  { param: 'Free Fatty Acid (FFA)', value: { value: 'Max 0.1%', status: 'VERIFIED' } },
  { param: 'Iodine Value (IV)', value: { value: 'Min 58', status: 'VERIFIED' } },
  { param: 'Color (5.25" Lovibond Red)', value: { value: 'Max 3.0', status: 'VERIFIED' } },
  { param: 'Melting Point', value: { value: 'Max 24°C', status: 'VERIFIED' } },
  { param: 'Moisture & Impurities', value: { value: 'Max 0.1%', status: 'VERIFIED' } },
  { param: 'Peroxide Value', value: { value: 'Max 1.0 meq/kg', status: 'VERIFIED' } },
]

/* -------------------------------------------------------------------------- */
/*                        COCONUT OIL SPECIFICATIONS                          */
/* -------------------------------------------------------------------------- */

const coconutOilSpecs: ProductSpecification[] = [
  { param: 'Free Fatty Acid (FFA)', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Moisture & Volatile Matter', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Color (Lovibond)', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Iodine Value', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Saponification Value', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Peroxide Value', value: { value: 'Available upon request', status: 'TARGET' } },
]

/* -------------------------------------------------------------------------- */
/*                    COCONUT SHELL CHARCOAL BRIQUETTES SPECS                 */
/* -------------------------------------------------------------------------- */

const charcoalSpecs: ProductSpecification[] = [
  { param: 'Calorific Value', value: { value: 'Min 7,000–7,500', status: 'TARGET' }, unit: 'kcal/kg' },
  { param: 'Moisture', value: { value: 'Max 5–6%', status: 'TARGET' } },
  { param: 'Ash Content', value: { value: '1.7–2.5%', status: 'TARGET' } },
  { param: 'Ash Color', value: { value: 'White / Snow White', status: 'TARGET' } },
  { param: 'Fixed Carbon', value: { value: '75–85%', status: 'TARGET' } },
  { param: 'Volatile Matter', value: { value: '12–15%', status: 'TARGET' } },
  { param: 'Burning Time', value: { value: '>2 hours', status: 'TARGET' }, unit: '90–120 min' },
  { param: 'Burning Temperature', value: { value: 'Min 600°C', status: 'TARGET' } },
  { param: 'Shape', value: { value: 'Cube', status: 'TARGET' } },
  { param: 'Size', value: { value: '25×25×25 / 26×26×26', status: 'TARGET' }, unit: 'mm' },
  { param: 'Hardness', value: { value: 'Drop-test resistant', status: 'TARGET' } },
]

/* -------------------------------------------------------------------------- */
/*                              PRODUCT DATA                                  */
/* -------------------------------------------------------------------------- */

export const PRODUCTS: Product[] = [
  {
    id: 'palm-cooking-oil',
    name: 'Palm Cooking Oil',
    slug: 'palm-cooking-oil',
    category: 'Food & Edible Oil',
    categoryColor: 'gold',
    shortDescription: 'Premium Indonesian palm-based cooking oil for retail, wholesale and commercial requirements.',
    description: 'Export Global Indonesia supplies premium RBD Palm Olein (CP8 & CP10) sourced directly from Indonesian refineries. Our palm cooking oil meets international quality standards and is available in retail, bulk, and custom packaging formats for global B2B buyers.',
    applications: [
      'Retail Cooking Oil',
      'Food Service / HoReCa',
      'Commercial Food Manufacturing',
      'Institutional Supply',
      'Private Label Retail',
    ],
    specifications: palmOilSpecs,
    packaging: [
      { icon: Droplet, size: '1L PET Bottle', pack: '12 Bottles / Master Carton', detail: 'Retail-ready' },
      { icon: Droplet, size: '2L PET Bottle', pack: '6 Bottles / Master Carton', detail: 'Retail-ready' },
      { icon: Package, size: '18L / 20L Jerry Can', pack: 'Stackable HDPE Can', detail: 'HoReCa & bulk use' },
      { icon: FlaskConical, size: 'Flexitank / ISO Tank', pack: '20ft FCL Bulk', detail: '19.5–20 MT per container' },
    ],
    moq: '1×20ft FCL (approx. 18–20 MT)',
    supplyCapacity: 'Subject to supplier confirmation',
    origin: 'Indonesia',
    incoterms: ['FOB'],
    destinationMarkets: ['Global'],
    documentation: [
      'Commercial Invoice',
      'Packing List',
      'Bill of Lading (B/L)',
      'Certificate of Origin (COO / Form E)',
      'Halal Certificate',
      'Certificate of Analysis (CoA)',
      'Health / Phytosanitary Certificate (if required)',
    ],
    certifications: ['CoA', 'Halal', 'COO / Form E'],
    privateLabelAvailable: true,
    image: '/cp8.jpg',
    gallery: ['/cp8.jpg', '/cp10.jpg', '/endproduct.jpg'],
    hsCode: '1511.90',
  },
  {
    id: 'coconut-oil',
    name: 'Coconut Oil',
    slug: 'coconut-oil',
    category: 'Food & Edible Oil',
    categoryColor: 'brand',
    shortDescription: 'Indonesian coconut oil for food, commercial and private-label applications.',
    description: 'Export Global Indonesia offers Indonesian coconut oil suitable for food, commercial, and private-label applications. Available types include Refined Coconut Oil and Virgin Coconut Oil, with buyer-specific specifications accommodated upon request.',
    applications: [
      'Food Manufacturing',
      'Baking & Confectionery',
      'Food Service / HoReCa',
      'Cosmetics & Personal Care',
      'Private Label Retail',
    ],
    specifications: coconutOilSpecs,
    packaging: [
      { icon: Droplet, size: '500ml / 1L PET Bottle', pack: 'Retail Packaging', detail: 'Available upon request' },
      { icon: Package, size: '5L / 10L Jerry Can', pack: 'Food-grade Container', detail: 'Commercial use' },
      { icon: FlaskConical, size: 'Flexitank / ISO Tank', pack: '20ft FCL Bulk', detail: 'Subject to supplier confirmation' },
    ],
    moq: 'Available upon request',
    supplyCapacity: 'Subject to supplier confirmation',
    origin: 'Indonesia',
    incoterms: ['FOB'],
    destinationMarkets: ['Global'],
    documentation: [
      'Commercial Invoice',
      'Packing List',
      'Bill of Lading (B/L)',
      'Certificate of Origin (COO / Form E)',
      'Certificate of Analysis (CoA)',
      'Halal Certificate',
    ],
    certifications: ['CoA', 'Halal'],
    privateLabelAvailable: true,
    image: '/refinery.jpg',
    gallery: ['/refinery.jpg'],
  },
  {
    id: 'coconut-shell-charcoal-briquettes',
    name: 'Coconut Shell Charcoal Briquettes',
    slug: 'coconut-shell-charcoal-briquettes',
    category: 'Shisha / BBQ / Hospitality',
    categoryColor: 'slate',
    shortDescription: 'Indonesian coconut shell charcoal briquettes for shisha, hookah, BBQ and hospitality applications.',
    description: 'Export Global Indonesia supplies Indonesian coconut shell charcoal briquettes designed for shisha, hookah, BBQ, and hospitality applications. Our briquettes are manufactured from premium coconut shells with target specifications aligned to UAE and Saudi market requirements.',
    applications: [
      'Shisha / Hookah',
      'BBQ & Grilling',
      'Hospitality & Restaurants',
      'Cafés & Lounges',
      'Private Label Retail',
    ],
    specifications: charcoalSpecs,
    packaging: [
      { icon: Package, size: '1kg Bag', pack: 'Export Carton', detail: 'Retail / Hospitality' },
      { icon: Package, size: '5kg / 10kg Carton', pack: 'Corrugated Box', detail: 'Wholesale' },
      { icon: Package, size: 'Custom Private Label', pack: 'Buyer Specification', detail: 'Private label available' },
      { icon: FlaskConical, size: 'Palletized Bulk', pack: 'Container Load', detail: 'Subject to supplier confirmation' },
    ],
    moq: 'Available upon request',
    supplyCapacity: 'Subject to supplier confirmation',
    origin: 'Indonesia',
    incoterms: ['FOB'],
    destinationMarkets: ['Middle East', 'GCC', 'Asia Pacific'],
    documentation: [
      'Commercial Invoice',
      'Packing List',
      'Bill of Lading (B/L)',
      'Certificate of Origin (COO)',
      'Certificate of Analysis (CoA)',
      'Lab Test Report',
    ],
    certifications: ['CoA'],
    privateLabelAvailable: true,
    image: '/endproduct.jpg',
    gallery: ['/endproduct.jpg'],
  },
]

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getSpecificationDisclaimer(): string {
  return 'Specifications shown are target specifications based on market requirements and may vary according to buyer specification, supplier capability and final laboratory testing.'
}
