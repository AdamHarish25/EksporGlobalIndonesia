import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface ContentRow {
  key: string
  value: string
  label: string
  updated_at: string
}

/** Ambil seluruh site_content sebagai map key → value. */
export async function fetchContentMap(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from('site_content').select('key,value')
  if (error) throw new Error(error.message)
  const map: Record<string, string> = {}
  for (const r of (data ?? []) as { key: string; value: string }[]) {
    map[r.key] = r.value
  }
  return map
}

/** Daftar semua key + label + updated untuk halaman admin. */
export async function fetchContentRows(): Promise<ContentRow[]> {
  const { data, error } = await supabase
    .from('site_content')
    .select('key,value,label,updated_at')
    .order('key')
  if (error) throw new Error(error.message)
  return (data ?? []) as ContentRow[]
}

/** Simpan 1 key (insert atau update). */
export async function saveContent(key: string, value: string): Promise<void> {
  const { error } = await supabase
    .from('site_content')
    .upsert({ key, value }, { onConflict: 'key' })
  if (error) throw new Error(error.message)
}

export { isSupabaseConfigured }
