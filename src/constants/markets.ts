import type { Market } from '@/types'

export const MARKETS: Market[] = [
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    slug: 'saudi-arabia',
    flag: '🇸🇦',
    description: 'Saudi Arabia represents one of the largest import markets for Indonesian food and hospitality products. The Kingdom\'s growing hospitality sector and large consumer base create strong demand for quality cooking oils and charcoal briquettes.',
    relevantProducts: ['palm-cooking-oil', 'coconut-oil', 'coconut-shell-charcoal-briquettes'],
    buyerTypes: [
      'Importers & Distributors',
      'Food Service Companies',
      'Hospitality & Hotel Groups',
      'Retail Chains',
      'Shisha Lounge Operators',
    ],
    productRequirements: [
      'Halal certification required',
      'SASO compliance for food products',
      'COO (Certificate of Origin) required',
      'Lab test documentation',
      'Arabic labeling may be required for retail',
    ],
    packagingNotes: [
      'Retail packaging with Arabic labels for consumer products',
      'Bulk packaging for food service and manufacturing',
      'Private label packaging available per buyer specification',
    ],
    documentationNotes: [
      'Certificate of Origin (COO)',
      'Bill of Lading',
      'Commercial Invoice & Packing List',
      'Halal Certificate',
      'Certificate of Analysis (CoA)',
      'SASO Certificate (for food products)',
    ],
    shippingConsiderations: [
      'Primary ports: Jeddah Islamic Port, King Abdulaziz Port (Dammam)',
      'Transit time from Indonesia: approximately 12–18 days',
      'FOB terms available',
    ],
  },
  {
    id: 'united-arab-emirates',
    name: 'United Arab Emirates',
    slug: 'united-arab-emirates',
    flag: '🇦🇪',
    description: 'The UAE is a major re-export hub for the Middle East and Africa region. Dubai and Abu Dhabi serve as gateways for Indonesian products reaching wider GCC and MENA markets. Strong demand for cooking oils and charcoal briquettes across food service and hospitality sectors.',
    relevantProducts: ['palm-cooking-oil', 'coconut-oil', 'coconut-shell-charcoal-briquettes'],
    buyerTypes: [
      'Importers & Re-exporters',
      'Distributors',
      'Food Service & Catering',
      'Hotel & Restaurant Groups',
      'Shisha & Café Operators',
      'Retail Chains',
    ],
    productRequirements: [
      'ESMA/ESQS compliance for food products',
      'Halal certification required',
      'Emirates Quality Mark (EQM) where applicable',
      'COO required',
      'Arabic and English labeling',
    ],
    packagingNotes: [
      'Retail packaging with Arabic/English labels',
      'Bulk packaging for food manufacturing',
      'Private label solutions available',
    ],
    documentationNotes: [
      'Certificate of Origin (COO)',
      'Bill of Lading',
      'Commercial Invoice & Packing List',
      'Halal Certificate',
      'Certificate of Analysis (CoA)',
      'ESMA compliance documents (food products)',
    ],
    shippingConsiderations: [
      'Primary ports: Jebel Ali (Dubai), Khalifa Port (Abu Dhabi)',
      'Transit time from Indonesia: approximately 10–15 days',
      'FOB terms available',
      'Jebel Ali free zone for re-export opportunities',
    ],
  },
  {
    id: 'gcc',
    name: 'GCC Markets',
    slug: 'gcc',
    flag: '🌐',
    description: 'The Gulf Cooperation Council (GCC) region — including Qatar, Kuwait, Oman, and Bahrain — represents a collective market with growing demand for Indonesian commodity products. These markets share similar quality requirements and cultural preferences.',
    relevantProducts: ['palm-cooking-oil', 'coconut-oil', 'coconut-shell-charcoal-briquettes'],
    buyerTypes: [
      'Importers & Distributors',
      'Food Service Companies',
      'Hospitality Groups',
      'Retail Chains',
      'Wholesalers',
    ],
    productRequirements: [
      'Halal certification required across all GCC states',
      'Country-specific import regulations apply',
      'COO and standard export documentation required',
      'Lab test results may be requested',
    ],
    packagingNotes: [
      'Retail packaging per destination country requirements',
      'Bulk and institutional packaging available',
      'Private label available for GCC-wide distribution',
    ],
    documentationNotes: [
      'Certificate of Origin (COO)',
      'Bill of Lading',
      'Commercial Invoice & Packing List',
      'Halal Certificate',
      'Certificate of Analysis (CoA)',
      'Country-specific certificates as required',
    ],
    shippingConsiderations: [
      'Multiple port options across GCC states',
      'Transit time varies by destination',
      'FOB terms available',
      'Consolidation possible through UAE hub',
    ],
  },
]

export function getMarketBySlug(slug: string): Market | undefined {
  return MARKETS.find(m => m.slug === slug)
}
