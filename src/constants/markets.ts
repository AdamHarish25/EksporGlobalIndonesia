import type { Market } from '@/types'

export const MARKETS: Market[] = [
  {
    id: 'china',
    name: 'China',
    slug: 'china',
    flag: '🇨🇳',
    description: 'China is our primary target market with large-scale demand for Indonesian food and hospitality products. Strong import appetite for quality shallots, palm sugar and charcoal briquettes across food manufacturing, beverage, retail and BBQ sectors.',
    relevantProducts: ['shallots', 'palm-sugar', 'coconut-shell-charcoal-briquettes'],
    buyerTypes: [
      'Importers & Distributors',
      'Food & Beverage Manufacturers',
      'Retail Chains & E-commerce',
      'Food Service Companies',
      'BBQ & Hospitality Groups',
    ],
    productRequirements: [
      'GACC registration / CIQ compliance may apply for food products',
      'COO Form E (ACFTA) where applicable',
      'Chinese labeling per GB standards may be required for retail',
      'Lab test / CoA documentation may be requested',
      'Halal certification where applicable to buyer segment',
    ],
    packagingNotes: [
      'Retail packaging with Chinese / English labels for consumer products',
      'Bulk packaging for food service and manufacturing',
      'Private label packaging available per buyer specification',
    ],
    documentationNotes: [
      'Certificate of Origin (COO / Form E)',
      'Bill of Lading',
      'Commercial Invoice & Packing List',
      'Certificate of Analysis (CoA)',
      'Health / Phytosanitary Certificate (where required)',
      'Halal Certificate (where applicable)',
    ],
    shippingConsiderations: [
      'Primary ports: Shanghai, Ningbo, Shenzhen, Guangzhou, Qingdao',
      'Transit time from Indonesia: approximately 7–12 days',
      'FOB terms available',
    ],
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    slug: 'southeast-asia',
    flag: '🌏',
    description: 'Southeast Asia (ASEAN) offers short transit times and familiar taste profiles for Indonesian products. Singapore, Malaysia, Vietnam, Thailand and the Philippines serve as strong markets for shallots, palm sugar and charcoal briquettes.',
    relevantProducts: ['shallots', 'palm-sugar', 'coconut-shell-charcoal-briquettes'],
    buyerTypes: [
      'Importers & Re-exporters',
      'Distributors & Wholesalers',
      'Food Service & Catering',
      'Hotel & Restaurant Groups',
      'Retail Chains',
    ],
    productRequirements: [
      'Country-specific food import regulations apply',
      'COO Form D / Form E where applicable',
      'Local-language labeling may be required for retail',
      'COO and standard export documentation required',
      'Lab test results may be requested',
    ],
    packagingNotes: [
      'Retail packaging per destination country requirements',
      'Bulk packaging for food manufacturing',
      'Private label solutions available',
    ],
    documentationNotes: [
      'Certificate of Origin (COO)',
      'Bill of Lading',
      'Commercial Invoice & Packing List',
      'Certificate of Analysis (CoA)',
      'Health / Phytosanitary Certificate (where required)',
      'Halal Certificate (where applicable)',
    ],
    shippingConsiderations: [
      'Primary ports: Singapore, Port Klang, Ho Chi Minh / Haiphong, Laem Chabang, Manila',
      'Transit time from Indonesia: approximately 3–8 days',
      'FOB terms available',
      'Consolidation possible through Singapore hub',
    ],
  },
  {
    id: 'wider-asia',
    name: 'Wider Asia',
    slug: 'wider-asia',
    flag: '🌏',
    description: 'Wider Asia — including Japan, South Korea, Taiwan, Hong Kong and broader Asia-Pacific — represents diversified demand for Indonesian shallots, palm sugar and premium charcoal briquettes across retail, F&B and BBQ segments.',
    relevantProducts: ['shallots', 'palm-sugar', 'coconut-shell-charcoal-briquettes'],
    buyerTypes: [
      'Importers & Distributors',
      'Food Service Companies',
      'Hospitality Groups',
      'Retail Chains',
      'BBQ & Specialty Buyers',
    ],
    productRequirements: [
      'Country-specific import and food safety regulations apply',
      'COO and standard export documentation required',
      'Local-language labeling may be required for retail',
      'Lab test / CoA documentation may be requested',
    ],
    packagingNotes: [
      'Retail packaging per destination country requirements',
      'Bulk and institutional packaging available',
      'Private label available for Asia-wide distribution',
    ],
    documentationNotes: [
      'Certificate of Origin (COO)',
      'Bill of Lading',
      'Commercial Invoice & Packing List',
      'Certificate of Analysis (CoA)',
      'Health / Phytosanitary Certificate (where required)',
      'Country-specific certificates as required',
    ],
    shippingConsiderations: [
      'Primary ports: Busan, Tokyo / Yokohama, Kaohsiung, Hong Kong',
      'Transit time varies by destination',
      'FOB terms available',
      'Consolidation possible through regional hubs',
    ],
  },
]

export function getMarketBySlug(slug: string): Market | undefined {
  return MARKETS.find(m => m.slug === slug)
}
