import {
  MapPin, Award, Droplets, Ship,
  Factory, ShieldCheck, Handshake,
  Droplet, Package, FlaskConical,
  TestTubeDiagonal, Leaf, Globe, FileSignature,
  type LucideIcon,
} from 'lucide-react'

import type {
  NavLink, TrustMetric, WhyCard, CertCard,
} from '@/types'

/* -------------------------------------------------------------------------- */
/*                              CONTACT & BRAND                               */
/* -------------------------------------------------------------------------- */

export const BRAND = {
  name: 'Export Global Indonesia',
  tagline: 'B2B Indonesian Sourcing & Export Partner',
  heroBadge: '🇮🇩 Indonesian Sourcing & Export Partner',
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
    'Hello Export Global Indonesia, I am interested in your products. Please send me more information.',
  )}`,
  whatsAppFloat: `https://wa.me/${CONTACT.whatsAppId}?text=${encodeURIComponent(
    'Hello Export Global Indonesia, I would like to inquire about your products.',
  )}`,
  whatsAppDirect: `https://wa.me/${CONTACT.whatsAppId}`,
} as const

/* -------------------------------------------------------------------------- */
/*                                  NAVBAR                                    */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Coconut Oil', href: '/products/coconut-oil' },
      { label: 'Coconut Shell Charcoal Briquettes', href: '/products/coconut-shell-charcoal-briquettes' },
    ],
  },
  {
    label: 'Markets',
    href: '/markets',
    children: [
      { label: 'Saudi Arabia', href: '/markets/saudi-arabia' },
      { label: 'United Arab Emirates', href: '/markets/united-arab-emirates' },
      { label: 'GCC Markets', href: '/markets/gcc' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Bulk Supply', href: '/solutions#bulk-supply' },
      { label: 'Private Label', href: '/solutions#private-label' },
      { label: 'Custom Sourcing', href: '/solutions#custom-sourcing' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
]

/* -------------------------------------------------------------------------- */
/*                              TRUST METRICS                                 */
/* -------------------------------------------------------------------------- */

export const TRUST_METRICS: TrustMetric[] = [
  {
    icon: MapPin,
    label: 'Indonesia-Based',
    value: '100% Indonesian',
    desc: 'Origin Products',
  },
  {
    icon: Award,
    label: 'Export-Ready',
    value: 'Products',
    desc: 'Quality Standards',
  },
  {
    icon: Droplets,
    label: 'B2B International',
    value: 'Supply',
    desc: 'Global Buyers',
  },
  {
    icon: Ship,
    label: 'Export',
    value: 'Coordination',
    desc: 'Documentation & Logistics',
  },
]

/* -------------------------------------------------------------------------- */
/*                            WHY PARTNER SECTION                             */
/* -------------------------------------------------------------------------- */

export const WHY_CARDS: WhyCard[] = [
  {
    icon: Factory,
    title: 'Indonesian Sourcing',
    desc: 'Access products sourced from Indonesian manufacturers and suppliers across the archipelago.',
    highlight: 'Direct Source',
  },
  {
    icon: ShieldCheck,
    title: 'Buyer-Specific Requirements',
    desc: 'Product specifications, packaging and quantity can be discussed according to buyer requirements.',
    highlight: 'Flexible',
  },
  {
    icon: Handshake,
    title: 'Export Coordination',
    desc: 'Coordinate documentation, logistics and shipment preparation with relevant partners.',
    highlight: 'End-to-End',
  },
  {
    icon: Globe,
    title: 'Transparent Communication',
    desc: 'Clear product information, quotation and transaction requirements.',
    highlight: 'Clear Process',
  },
]

/* -------------------------------------------------------------------------- */
/*                               CERTIFICATIONS                               */
/* -------------------------------------------------------------------------- */

export const CERT_CARDS: CertCard[] = [
  {
    icon: TestTubeDiagonal,
    title: 'Certificate of Analysis',
    acronym: 'CoA',
    desc: 'Official lab results per lot covering key parameters.',
    color: 'brand',
  },
  {
    icon: Leaf,
    title: 'Halal Certificate',
    acronym: 'Halal',
    desc: 'Issued by recognized Indonesian Halal certification body.',
    color: 'emerald',
  },
  {
    icon: Globe,
    title: 'Certificate of Origin',
    acronym: 'COO / Form E',
    desc: 'Proof of Indonesian origin for customs clearance.',
    color: 'gold',
  },
  {
    icon: FileSignature,
    title: 'Bill of Lading',
    acronym: 'B/L',
    desc: 'Clean on-board ocean B/L for cargo release.',
    color: 'slate',
  },
]

export const CERT_PALETTE: Record<CertCard['color'], string> = {
  brand: 'from-brand-500 to-brand-700 shadow-brand-500/30',
  emerald: 'from-emerald-500 to-emerald-700 shadow-emerald-500/30',
  gold: 'from-gold-500 to-amber-600 shadow-gold-500/30',
  slate: 'from-slate-600 to-slate-800 shadow-slate-500/30',
}

/* -------------------------------------------------------------------------- */
/*                              EXPORT DOCUMENTS                              */
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
/*                                  FAQ                                       */
/* -------------------------------------------------------------------------- */

export const FAQ_DATA = [
  {
    question: 'What products does Export Global Indonesia supply?',
    answer: 'We supply two main product lines: Coconut Oil and Coconut Shell Charcoal Briquettes. Our architecture supports additional Indonesian products upon buyer request.',
  },
  {
    question: 'What are the minimum order quantities (MOQ)?',
    answer: 'MOQ varies by product. Please contact us for specific requirements.',
  },
  {
    question: 'Which incoterms do you offer?',
    answer: 'We primarily offer FOB (Tanjung Priok / Belawan) terms. Other incoterms can be discussed based on buyer requirements and destination.',
  },
  {
    question: 'Do you provide private label services?',
    answer: 'Yes, private label is available for all our product lines. We can accommodate custom packaging, labeling, and branding requirements through our manufacturing partners.',
  },
  {
    question: 'What documentation is provided with each shipment?',
    answer: 'Standard documentation includes Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, Halal Certificate, and Certificate of Analysis. Additional documents are available upon request.',
  },
  {
    question: 'How do I request a quotation?',
    answer: 'You can request a quotation through our Request a Quote page, by WhatsApp, or by email. Provide your product requirements, quantity, destination, and any specific needs.',
  },
  {
    question: 'What payment terms do you accept?',
    answer: 'We accept L/C (Letter of Credit) at Sight and T/T (Telegraphic Transfer). Payment terms can be discussed based on order size and buyer profile.',
  },
  {
    question: 'Do you supply to Saudi Arabia and UAE?',
    answer: 'Yes, Saudi Arabia and UAE are our primary target markets. We also serve other GCC countries including Qatar, Kuwait, Oman, and Bahrain.',
  },
]

export const HOW_IT_WORKS_STEPS = [
  { step: '01', title: 'Inquiry', desc: 'Tell us what product and quantity you need.' },
  { step: '02', title: 'Requirement Review', desc: 'We review your specifications and requirements.' },
  { step: '03', title: 'Supplier Sourcing', desc: 'We match with suitable Indonesian suppliers.' },
  { step: '04', title: 'Quotation', desc: 'Receive a detailed quotation with pricing.' },
  { step: '05', title: 'Sample / Verification', desc: 'Request samples for quality verification.' },
  { step: '06', title: 'Order Confirmation', desc: 'Confirm order and arrange payment.' },
  { step: '07', title: 'Production / Preparation', desc: 'Supplier prepares your order.' },
  { step: '08', title: 'Export Preparation', desc: 'Documentation and logistics coordination.' },
  { step: '09', title: 'Shipment', desc: 'Cargo is shipped to your destination port.' },
]

export type { LucideIcon }
