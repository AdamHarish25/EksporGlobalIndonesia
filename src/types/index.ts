import { LucideIcon } from 'lucide-react'

export interface NavLink {
  label: string
  href: string
}

export interface TrustMetric {
  icon: LucideIcon
  label: string
  value: string
  desc: string
}

export interface ProductSpec {
  param: string
  cp8: string
  cp10: string
}

export interface PackagingOption {
  icon: LucideIcon
  size: string
  pack: string
  detail: string
}

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

export interface PackagingOptionValue {
  value: string
  label: string
}

export interface InquiryFormState {
  name: string
  company: string
  country: string
  packaging: string
  volume: string
  message: string
}
