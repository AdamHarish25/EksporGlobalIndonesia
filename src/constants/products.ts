import {
  Droplet, Package, FlaskConical,
  Leaf, Flame, Wind,
  type LucideIcon,
} from 'lucide-react'
import type { Product, ProductSpecification } from '@/types'

/* -------------------------------------------------------------------------- */
/*                          SHALLOTS (BAWANG MERAH) SPECS                     */
/*  Target specs — final values subject to buyer spec, supplier capability    */
/*  and lot laboratory testing.                                               */
/* -------------------------------------------------------------------------- */

const shallotSpecs: ProductSpecification[] = [
  { param: 'Variety', value: { value: 'Indonesian Red Shallot (Bawang Merah)', status: 'TARGET' } },
  { param: 'Size / Diameter', value: { value: 'Graded S/M/L, typically 2–4 cm', status: 'TARGET' } },
  { param: 'Condition', value: { value: 'Fresh, clean, dry, sprout-free', status: 'TARGET' } },
  { param: 'Moisture', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Shelf Life', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Purity / Sorting', value: { value: 'Sorted, foreign matter minimized', status: 'TARGET' } },
]

/* -------------------------------------------------------------------------- */
/*                          PALM SUGAR (GULA AREN) SPECS                      */
/* -------------------------------------------------------------------------- */

const palmSugarSpecs: ProductSpecification[] = [
  { param: 'Raw Material', value: { value: 'Aren palm (Arenga pinnata) sap', status: 'TARGET' } },
  { param: 'Form', value: { value: 'Granulated / Block / Liquid (per buyer spec)', status: 'TARGET' } },
  { param: 'Moisture', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Sucrose Content', value: { value: 'Available upon request', status: 'TARGET' } },
  { param: 'Color & Aroma', value: { value: 'Typical caramel-brown, characteristic aren aroma', status: 'TARGET' } },
  { param: 'Shelf Life', value: { value: 'Available upon request', status: 'TARGET' } },
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
    id: 'shallots',
    name: 'Shallots (Bawang Merah)',
    slug: 'shallots',
    category: 'Fresh Produce',
    categoryColor: 'brand',
    shortDescription: 'Indonesian red shallots for wholesale, retail, food manufacturing and distribution.',
    description: 'Export Global Indonesia offers Indonesian red shallots (bawang merah) for wholesale, retail, food manufacturing, and distribution applications. Grading, packaging, and quantity can be discussed according to buyer requirements and supplier availability.',
    applications: [
      'Wholesale Markets',
      'Retail & Supermarkets',
      'Food Manufacturing',
      'Food Service / HoReCa',
      'Distribution & Re-export',
    ],
    specifications: shallotSpecs,
    packaging: [
      { icon: Package, size: '5kg / 10kg Mesh Bag', pack: 'Ventilated Bag', detail: 'Wholesale / market use' },
      { icon: Package, size: '25kg / 50kg Sack', pack: 'Jute / Mesh Sack', detail: 'Bulk shipment' },
      { icon: Package, size: 'Carton Box', pack: 'Buyer Specification', detail: 'Retail / export grade' },
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
      'Certificate of Origin (COO)',
      'Certificate of Analysis (CoA, if required)',
      'Phytosanitary Certificate (if required)',
    ],
    certifications: ['CoA'],
    privateLabelAvailable: false,
    image: '/Shallots1.webp',
    gallery: ['/Shallots1.webp', '/shallots2.webp'],
  },
  {
    id: 'palm-sugar',
    name: 'Palm Sugar (Gula Aren)',
    slug: 'palm-sugar',
    category: 'Natural Sweetener',
    categoryColor: 'gold',
    shortDescription: 'Indonesian aren palm sugar for food, beverage, retail and private-label applications.',
    description: 'Export Global Indonesia supplies Indonesian palm sugar (gula aren) derived from aren palm sap, suitable for food, beverage, retail, and private-label applications. Form, packaging, and specifications can be discussed according to buyer requirements.',
    applications: [
      'Food & Beverage Manufacturing',
      'Baking & Confectionery',
      'Food Service / HoReCa',
      'Retail & Supermarkets',
      'Private Label Retail',
    ],
    specifications: palmSugarSpecs,
    packaging: [
      { icon: Droplet, size: '500g / 1kg Pouch', pack: 'Retail Packaging', detail: 'Available upon request' },
      { icon: Package, size: '25kg / 50kg Sack', pack: 'Food-grade Sack', detail: 'Bulk / manufacturing use' },
      { icon: FlaskConical, size: 'Custom Private Label', pack: 'Buyer Specification', detail: 'Private label available' },
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
      'Certificate of Origin (COO)',
      'Certificate of Analysis (CoA)',
      'Halal Certificate',
    ],
    certifications: ['CoA', 'Halal'],
    privateLabelAvailable: true,
    image: '/BrownSurga3.webp',
    gallery: ['/BrownSurga3.webp', '/BrownSurga2.webp', '/BrownSurga.webp'],
  },
  {
    id: 'coconut-shell-charcoal-briquettes',
    name: 'Coconut Shell Charcoal Briquettes',
    slug: 'coconut-shell-charcoal-briquettes',
    category: 'Shisha / BBQ / Hospitality',
    categoryColor: 'slate',
    shortDescription: 'Indonesian coconut shell charcoal briquettes for shisha, hookah, BBQ and hospitality applications.',
    description: 'Export Global Indonesia supplies Indonesian coconut shell charcoal briquettes designed for shisha, hookah, BBQ, and hospitality applications. Our briquettes are manufactured from premium coconut shells with target specifications aligned to China and wider Asian market requirements.',
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
    destinationMarkets: ['China', 'Southeast Asia', 'Asia-Pacific'],
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
    image: '/CocoBriquette.webp',
    gallery: ['/CocoBriquette.webp', '/CoconutShells.webp'],
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
