import { LucideIcon } from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*                                  NAVIGATION                                */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

/* -------------------------------------------------------------------------- */
/*                                TRUST METRICS                               */
/* -------------------------------------------------------------------------- */

export interface TrustMetric {
  icon: LucideIcon
  label: string
  value: string
  desc: string
}

/* -------------------------------------------------------------------------- */
/*                                   PRODUCTS                                 */
/* -------------------------------------------------------------------------- */

export type SpecificationStatus = 'TARGET' | 'VERIFIED' | 'AVAILABLE'

export interface SpecificationValue {
  value: string
  status: SpecificationStatus
}

export interface ProductSpecification {
  param: string
  value: SpecificationValue
  unit?: string
}

export interface ProductPackaging {
  icon: LucideIcon
  size: string
  pack: string
  detail: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  categoryColor: 'brand' | 'gold' | 'slate'
  shortDescription: string
  description: string
  applications: string[]
  specifications: ProductSpecification[]
  packaging: ProductPackaging[]
  moq: string
  supplyCapacity: string
  origin: string
  incoterms: string[]
  destinationMarkets: string[]
  documentation: string[]
  certifications: string[]
  privateLabelAvailable: boolean
  image: string
  gallery: string[]
  hsCode?: string
}

/* -------------------------------------------------------------------------- */
/*                                    MARKETS                                 */
/* -------------------------------------------------------------------------- */

export interface Market {
  id: string
  name: string
  slug: string
  flag: string
  description: string
  relevantProducts: string[]
  buyerTypes: string[]
  productRequirements: string[]
  packagingNotes: string[]
  documentationNotes: string[]
  shippingConsiderations: string[]
}

/* -------------------------------------------------------------------------- */
/*                                  SOLUTIONS                                 */
/* -------------------------------------------------------------------------- */

export interface Solution {
  id: string
  title: string
  slug: string
  description: string
  features: string[]
  cta: string
}

/* -------------------------------------------------------------------------- */
/*                                    FAQ                                     */
/* -------------------------------------------------------------------------- */

export interface FAQItem {
  question: string
  answer: string
}

/* -------------------------------------------------------------------------- */
/*                                  FORMS                                     */
/* -------------------------------------------------------------------------- */

export interface PackagingOptionValue {
  value: string
  label: string
}

export interface InquiryFormState {
  name: string
  company: string
  country: string
  product: string
  specification: string
  quantity: string
  unit: string
  packaging: string
  destinationCountry: string
  destinationPort: string
  incoterm: string
  privateLabel: string
  targetPrice: string
  message: string
}

export interface SupplierFormState {
  companyName: string
  factoryLocation: string
  product: string
  productionCapacity: string
  moq: string
  packaging: string
  certifications: string
  exportExperience: string
  website: string
  contactName: string
  contactEmail: string
  contactPhone: string
  message: string
}

export interface CustomSourcingFormState {
  product: string
  specification: string
  quantity: string
  packaging: string
  destination: string
  application: string
  targetPrice: string
  message: string
}

/* -------------------------------------------------------------------------- */
/*                              LEGACY COMPAT                                 */
/* -------------------------------------------------------------------------- */

export interface WhyCard {
  icon: LucideIcon
  title: string
  desc: string
  highlight: string
}

export interface CertCard {
  icon: LucideIcon
  title: string
  acronym: string
  desc: string
  color: 'brand' | 'emerald' | 'gold' | 'slate'
}
