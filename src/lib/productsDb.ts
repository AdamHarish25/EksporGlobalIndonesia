import {
  Droplet, Package, FlaskConical,
  type LucideIcon,
} from 'lucide-react'
import type {
  Product, ProductSpecification, ProductPackaging,
  SpecificationStatus,
} from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/* -------------------------------------------------------------------------- */
/*                              DB row types                                  */
/* -------------------------------------------------------------------------- */

export interface DbProductRow {
  id: string
  slug: string
  name: string
  category: string
  category_color: string
  short_description: string
  description: string
  applications: string[]
  moq: string
  supply_capacity: string
  origin: string
  image_url: string
  gallery: string[]
  incoterms: string[]
  destination_markets: string[]
  documentation: string[]
  certifications: string[]
  private_label: boolean
  status: string
}

export interface DbSpecRow {
  product_id: string
  param: string
  value: string
  status: string
  unit: string | null
  sort_order: number
}

export interface DbPackRow {
  product_id: string
  size: string
  pack: string
  detail: string
  sort_order: number
}

/* -------------------------------------------------------------------------- */
/*                              Mapper DB → Product                           */
/* -------------------------------------------------------------------------- */

const CATEGORY_COLORS = ['brand', 'gold', 'slate'] as const
const SPEC_STATUSES: SpecificationStatus[] = ['TARGET', 'VERIFIED', 'AVAILABLE']

/** Ikon packaging tidak disimpan di DB — disimpulkan dari kata kunci (sesuai data statis). */
export function inferPackagingIcon(size: string, pack: string): LucideIcon {
  const t = `${size} ${pack}`.toLowerCase()
  if (t.includes('private label') || t.includes('custom') || t.includes('bulk')) return FlaskConical
  if (t.includes('pouch') || t.includes('droplet') || t.includes('liquid')) return Droplet
  return Package
}

export function mapDbProduct(
  row: DbProductRow,
  specs: DbSpecRow[],
  packs: DbPackRow[],
): Product {
  const specifications: ProductSpecification[] = specs
    .filter(s => s.product_id === row.id)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(s => ({
      param: s.param,
      value: {
        value: s.value,
        status: (SPEC_STATUSES as string[]).includes(s.status)
          ? (s.status as SpecificationStatus)
          : 'TARGET',
      },
      unit: s.unit ?? undefined,
    }))

  const packaging: ProductPackaging[] = packs
    .filter(p => p.product_id === row.id)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(p => ({
      icon: inferPackagingIcon(p.size, p.pack),
      size: p.size,
      pack: p.pack,
      detail: p.detail,
    }))

  return {
    id: row.slug,
    name: row.name,
    slug: row.slug,
    category: row.category,
    categoryColor: (CATEGORY_COLORS as readonly string[]).includes(row.category_color)
      ? (row.category_color as Product['categoryColor'])
      : 'brand',
    shortDescription: row.short_description,
    description: row.description,
    applications: row.applications ?? [],
    specifications,
    packaging,
    moq: row.moq,
    supplyCapacity: row.supply_capacity,
    origin: row.origin,
    incoterms: row.incoterms ?? [],
    destinationMarkets: row.destination_markets ?? [],
    documentation: row.documentation ?? [],
    certifications: row.certifications ?? [],
    privateLabelAvailable: row.private_label,
    image: row.image_url,
    gallery: row.gallery ?? [],
  }
}

/* -------------------------------------------------------------------------- */
/*                              Fetch                                         */
/* -------------------------------------------------------------------------- */

export async function fetchProductsFromDb(publishedOnly = true): Promise<Product[]> {
  let query = supabase.from('products').select('*').order('name')
  if (publishedOnly) query = query.eq('status', 'published')
  const [{ data: rows, error: e1 }, { data: specRows, error: e2 }, { data: packRows, error: e3 }] =
    await Promise.all([
      query,
      supabase.from('product_specs').select('product_id,param,value,status,unit,sort_order'),
      supabase.from('product_packaging').select('product_id,size,pack,detail,sort_order'),
    ])
  if (e1 || e2 || e3) throw new Error(e1?.message ?? e2?.message ?? e3?.message ?? 'Supabase fetch failed')
  return ((rows ?? []) as DbProductRow[]).map(r =>
    mapDbProduct(r, (specRows ?? []) as DbSpecRow[], (packRows ?? []) as DbPackRow[]),
  )
}

/** Ambil 1 produk by slug TANPA filter status — RLS yang menentukan (editor bisa baca draft untuk preview). */
export async function fetchProductBySlugFromDb(slug: string): Promise<Product | null> {
  const [{ data: row, error: e1 }, { data: specRows, error: e2 }, { data: packRows, error: e3 }] =
    await Promise.all([
      supabase.from('products').select('*').eq('slug', slug).maybeSingle(),
      supabase.from('product_specs').select('product_id,param,value,status,unit,sort_order'),
      supabase.from('product_packaging').select('product_id,size,pack,detail,sort_order'),
    ])
  if (e1 || e2 || e3) throw new Error(e1?.message ?? e2?.message ?? e3?.message ?? 'Supabase fetch failed')
  if (!row) return null
  return mapDbProduct(row as DbProductRow, (specRows ?? []) as DbSpecRow[], (packRows ?? []) as DbPackRow[])
}

export { isSupabaseConfigured }

/* -------------------------------------------------------------------------- */
/*                              Write (editor+)                               */
/* -------------------------------------------------------------------------- */

export interface SpecInput {
  param: string
  value: string
  status: string
  unit: string
}

export interface PackInput {
  size: string
  pack: string
  detail: string
}

export interface ProductFormData {
  id?: string
  slug: string
  name: string
  category: string
  category_color: string
  short_description: string
  description: string
  applications: string[]
  moq: string
  supply_capacity: string
  origin: string
  image_url: string
  gallery: string[]
  incoterms: string[]
  destination_markets: string[]
  documentation: string[]
  certifications: string[]
  private_label: boolean
  status: string
  specs: SpecInput[]
  packaging: PackInput[]
}

/** Simpan produk + ganti specs/packaging (pola delete-insert agar urutan rapi). Return id. */
export async function saveProduct(data: ProductFormData): Promise<string> {
  const row = {
    slug: data.slug,
    name: data.name,
    category: data.category,
    category_color: data.category_color,
    short_description: data.short_description,
    description: data.description,
    applications: data.applications,
    moq: data.moq,
    supply_capacity: data.supply_capacity,
    origin: data.origin,
    image_url: data.image_url,
    gallery: data.gallery,
    incoterms: data.incoterms.length > 0 ? data.incoterms : ['FOB'],
    destination_markets: data.destination_markets,
    documentation: data.documentation,
    certifications: data.certifications,
    private_label: data.private_label,
    status: data.status,
  }

  let id = data.id
  if (id) {
    const { error } = await supabase.from('products').update(row).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { data: inserted, error } = await supabase.from('products').insert(row).select('id').single()
    if (error || !inserted) throw new Error(error?.message ?? 'Insert failed')
    id = inserted.id as string
  }

  // Ganti children (RLS: editor+; delete+insert lebih sederhana dari diff parsial)
  const del1 = await supabase.from('product_specs').delete().eq('product_id', id)
  if (del1.error) throw new Error(del1.error.message)
  const del2 = await supabase.from('product_packaging').delete().eq('product_id', id)
  if (del2.error) throw new Error(del2.error.message)

  const validStatuses = ['TARGET', 'VERIFIED', 'AVAILABLE']
  const specs = data.specs
    .filter(s => s.param.trim() !== '')
    .map((s, i) => ({
      product_id: id as string,
      param: s.param.trim(),
      value: s.value.trim(),
      status: validStatuses.includes(s.status) ? s.status : 'TARGET',
      unit: s.unit.trim() === '' ? null : s.unit.trim(),
      sort_order: i + 1,
    }))
  if (specs.length > 0) {
    const { error } = await supabase.from('product_specs').insert(specs)
    if (error) throw new Error(error.message)
  }

  const packs = data.packaging
    .filter(p => p.size.trim() !== '' || p.pack.trim() !== '')
    .map((p, i) => ({
      product_id: id as string,
      size: p.size.trim(),
      pack: p.pack.trim(),
      detail: p.detail.trim(),
      sort_order: i + 1,
    }))
  if (packs.length > 0) {
    const { error } = await supabase.from('product_packaging').insert(packs)
    if (error) throw new Error(error.message)
  }

  return id
}

export async function deleteProductById(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

/** Upload foto ke bucket product-images. Return public URL. */
export async function uploadProductImage(file: File, slug: string): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `products/${slug}-${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('product-images').upload(path, file, {
    contentType: file.type || undefined,
  })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from('product-images').getPublicUrl(path)
  return data.publicUrl
}
