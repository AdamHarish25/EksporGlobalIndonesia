import { Package, Tag, Globe, type LucideIcon } from 'lucide-react'
import type { SolutionDetail } from '@/constants/solutions'
import { SOLUTIONS as STATIC_SOLUTIONS } from '@/constants/solutions'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/* -------------------------------------------------------------------------- */
/*                              DB row types                                  */
/* -------------------------------------------------------------------------- */

export interface DbSolutionRow {
  id: string
  slug: string
  icon_name: string
  title: string
  description: string
  long_desc: string
  features: string[]
  cta: string
  image: string
  image_alt: string
  show_form: boolean
  status: string
  sort_order: number
}

/* -------------------------------------------------------------------------- */
/*                              Mapper                                        */
/* -------------------------------------------------------------------------- */

/** Nama ikon di DB → komponen. Carousel multibahasa tetap dari data statis (per slug). */
const ICONS: Record<string, LucideIcon> = { package: Package, tag: Tag, globe: Globe }
export const SOLUTION_ICON_NAMES = Object.keys(ICONS)

export function mapDbSolution(row: DbSolutionRow): SolutionDetail {
  const fallback = STATIC_SOLUTIONS.find(s => s.slug === row.slug)
  return {
    id: row.slug,
    slug: row.slug,
    icon: ICONS[row.icon_name] ?? fallback?.icon ?? Package,
    title: row.title,
    desc: row.description,
    longDesc: row.long_desc,
    features: row.features ?? [],
    cta: row.cta,
    image: row.image,
    imageAlt: row.image_alt,
    showForm: row.show_form,
    carousel: fallback?.carousel,
  }
}

/* -------------------------------------------------------------------------- */
/*                              Fetch                                         */
/* -------------------------------------------------------------------------- */

export async function fetchSolutionsFromDb(publishedOnly = true): Promise<SolutionDetail[]> {
  let query = supabase.from('solutions').select('*').order('sort_order')
  if (publishedOnly) query = query.eq('status', 'published')
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return ((data ?? []) as DbSolutionRow[]).map(mapDbSolution)
}

export async function fetchSolutionBySlugFromDb(slug: string): Promise<SolutionDetail | null> {
  const { data, error } = await supabase.from('solutions').select('*').eq('slug', slug).maybeSingle()
  if (error) throw new Error(error.message)
  if (!data) return null
  return mapDbSolution(data as DbSolutionRow)
}

/* -------------------------------------------------------------------------- */
/*                              Write (editor+)                               */
/* -------------------------------------------------------------------------- */

export interface SolutionFormData {
  id?: string
  slug: string
  icon_name: string
  title: string
  description: string
  long_desc: string
  features: string[]
  cta: string
  image: string
  image_alt: string
  show_form: boolean
  status: string
  sort_order: number
}

export async function saveSolution(data: SolutionFormData): Promise<string> {
  const row = {
    slug: data.slug,
    icon_name: data.icon_name,
    title: data.title,
    description: data.description,
    long_desc: data.long_desc,
    features: data.features,
    cta: data.cta,
    image: data.image,
    image_alt: data.image_alt,
    show_form: data.show_form,
    status: data.status,
    sort_order: data.sort_order,
  }
  if (data.id) {
    const { error } = await supabase.from('solutions').update(row).eq('id', data.id)
    if (error) throw new Error(error.message)
    return data.id
  }
  const { data: inserted, error } = await supabase.from('solutions').insert(row).select('id').single()
  if (error || !inserted) throw new Error(error?.message ?? 'Insert failed')
  return inserted.id as string
}

export async function deleteSolutionById(id: string): Promise<void> {
  const { error } = await supabase.from('solutions').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export { isSupabaseConfigured }
