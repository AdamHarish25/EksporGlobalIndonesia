import {
  MapPin, Award, Droplets, Ship,
  Factory, ShieldCheck, Handshake,
  Droplet, Package, FlaskConical,
  TestTubeDiagonal, Leaf, Globe, FileSignature,
  type LucideIcon,
} from 'lucide-react'

import type {
  NavLink, TrustMetric, ProductSpec, PackagingOption,
  WhyCard, CertCard, PackagingOptionValue,
} from '@/types'

/* -------------------------------------------------------------------------- */
/*                              CONTACT & BRAND                               */
/* -------------------------------------------------------------------------- */

export const BRAND = {
  name: 'Export Global Indonesia',
  tagline: 'Premier Agro-Commodity Exporter',
  heroBadge: '🇮🇩 Premier Indonesian Agro-Commodity Exporter',
} as const

export const CONTACT = {
  directorName: 'Adam Harish A.',
  email: 'adam.eksporglobalindonesia@gmail.com',
  whatsAppNumber: '+62 856-1488-756',
  whatsAppId: '628561488756',
  location: 'Indonesia 🇮🇩',
} as const

export const LINKS = {
  specSheet: '#',
  whatsAppGeneric: `https://wa.me/${CONTACT.whatsAppId}?text=${encodeURIComponent(
    'Hello Export Global Indonesia, I am interested in your RBD Palm Olein CP8/CP10. Please send me the latest offer and FCO.',
  )}`,
  whatsAppFloat: `https://wa.me/${CONTACT.whatsAppId}?text=${encodeURIComponent(
    'Hello Export Global Indonesia, I would like to inquire about your RBD Palm Olein CP8/CP10 export offer.',
  )}`,
  whatsAppDirect: `https://wa.me/${CONTACT.whatsAppId}`,
} as const

export const HS_CODE = '1511.90'
export const SHIPPING_TERMS = 'FOB Tanjung Priok / Belawan'

/* -------------------------------------------------------------------------- */
/*                                  NAVBAR                                    */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS: NavLink[] = [
  { label: 'Products', href: '#products' },
  { label: 'Specifications', href: '#specs' },
  { label: 'Quality & Certs', href: '#certifications' },
  { label: 'About Us', href: '#why-us' },
]

/* -------------------------------------------------------------------------- */
/*                              TRUST METRICS                                 */
/* -------------------------------------------------------------------------- */

export const TRUST_METRICS: TrustMetric[] = [
  {
    icon: MapPin,
    label: 'Origin',
    value: '100% Indonesian',
    desc: 'Refined Palm Oil',
  },
  {
    icon: Award,
    label: 'Product Grade',
    value: 'CP8 / CP10',
    desc: 'RBD Palm Olein',
  },
  {
    icon: Droplets,
    label: 'Moisture & Impurities',
    value: 'Max 0.1%',
    desc: 'Premium Standard',
  },
  {
    icon: Ship,
    label: 'Shipping Terms',
    value: 'FOB',
    desc: 'Tanjung Priok / Belawan',
  },
]

/* -------------------------------------------------------------------------- */
/*                              PRODUCT SECTION                               */
/* -------------------------------------------------------------------------- */

export const PRODUCT_SPECS: ProductSpec[] = [
  { param: 'Free Fatty Acid (FFA)', cp8: 'Max 0.1%', cp10: 'Max 0.1%' },
  { param: 'Iodine Value (IV)', cp8: 'Min 58', cp10: 'Min 56' },
  { param: 'Color (5.25" Lovibond Red)', cp8: 'Max 3.0', cp10: 'Max 3.0' },
  { param: 'Melting Point', cp8: 'Max 24°C', cp10: 'Max 24°C' },
  { param: 'Moisture & Impurities', cp8: 'Max 0.1%', cp10: 'Max 0.1%' },
  { param: 'Peroxide Value (meq/kg)', cp8: 'Max 1.0', cp10: 'Max 1.0' },
]

export const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    icon: Droplet,
    size: '1L PET Bottle',
    pack: '12 Bottles / Master Carton',
    detail: 'Retail-ready • 12L net / ctns',
  },
  {
    icon: Droplet,
    size: '2L PET Bottle',
    pack: '6 Bottles / Master Carton',
    detail: 'Retail-ready • 12L net / ctns',
  },
  {
    icon: Package,
    size: '18L / 20L Jerry Can',
    pack: 'Stackable HDPE Can',
    detail: 'Food-grade • HoReCa & bulk use',
  },
  {
    icon: FlaskConical,
    size: 'Flexitank / ISO Tank',
    pack: '20ft FCL Bulk',
    detail: '19.5 – 20 MT per container',
  },
]

export const FORM_PACKAGING_OPTIONS: PackagingOptionValue[] = [
  { value: '', label: 'Select packaging...' },
  { value: '1L PET Bottle (12/carton)', label: '1L PET Bottle (12/carton)' },
  { value: '2L PET Bottle (6/carton)', label: '2L PET Bottle (6/carton)' },
  { value: '18L / 20L Jerry Can', label: '18L / 20L Jerry Can' },
  { value: 'Flexitank / ISO Tank (bulk)', label: 'Flexitank / ISO Tank (bulk)' },
  { value: 'Mixed / Custom Packaging', label: 'Mixed / Custom Packaging' },
]

/* -------------------------------------------------------------------------- */
/*                            WHY PARTNER SECTION                             */
/* -------------------------------------------------------------------------- */

export const WHY_CARDS: WhyCard[] = [
  {
    icon: Factory,
    title: 'Direct Refinery Network',
    desc: 'Direct sourcing from refinery partners across Sumatra & Java to guarantee year-round supply security with zero middlemen.',
    highlight: 'Supply Security',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    desc: 'Official laboratory Certificate of Analysis (CoA) issued per lot, ensuring every loaded container meets international quality standards.',
    highlight: 'Lot-by-Lot CoA',
  },
  {
    icon: Handshake,
    title: 'Flexible Export Terms',
    desc: 'Accommodates both L/C at Sight and T/T payment terms with fully transparent export document processing (COO, Health Certificate, B/L).',
    highlight: 'L/C • T/T Accepted',
  },
]

/* -------------------------------------------------------------------------- */
/*                               LOGISTICS                                    */
/* -------------------------------------------------------------------------- */

export const EXPORT_DOCUMENTS: string[] = [
  'Commercial Invoice',
  'Packing List',
  'Bill of Lading (B/L)',
  'Certificate of Origin (COO / Form E / SKI)',
  'Halal Certificate',
  'Certificate of Analysis (CoA)',
  'Health / Phytosanitary Certificate (if required)',
]

export const EXTRA_STANDARDS: string[] = [
  'ISO 22000:2018 (Food Safety)',
  'GMP Certified Production',
  'HACCP Compliance',
  'SNI Standard (Indonesia)',
]

/* -------------------------------------------------------------------------- */
/*                             CERTIFICATIONS                                 */
/* -------------------------------------------------------------------------- */

export const CERT_CARDS: CertCard[] = [
  {
    icon: TestTubeDiagonal,
    title: 'Certificate of Analysis',
    acronym: 'CoA',
    desc: 'Official lab results per lot covering FFA, IV, color, moisture & all key parameters.',
    color: 'brand',
  },
  {
    icon: Leaf,
    title: 'Halal Certificate',
    acronym: 'Halal',
    desc: 'Issued by recognized Indonesian Halal certification body for MUI & global Halal markets.',
    color: 'emerald',
  },
  {
    icon: Globe,
    title: 'Certificate of Origin',
    acronym: 'COO / Form E',
    desc: 'Proof of Indonesian origin — valid for ASEAN preferential tariffs & customs clearance.',
    color: 'gold',
  },
  {
    icon: FileSignature,
    title: 'Bill of Lading',
    acronym: 'B/L',
    desc: 'Clean on-board ocean B/L — negotiable document of title for cargo release.',
    color: 'slate',
  },
]

export const CERT_PALETTE: Record<CertCard['color'], string> = {
  brand: 'from-brand-500 to-brand-700 shadow-brand-500/30',
  emerald: 'from-emerald-500 to-emerald-700 shadow-emerald-500/30',
  gold: 'from-gold-500 to-amber-600 shadow-gold-500/30',
  slate: 'from-slate-600 to-slate-800 shadow-slate-500/30',
}

export type { LucideIcon }
