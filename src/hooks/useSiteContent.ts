import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '@/lib/supabase'
import { subscribeShared } from '@/lib/realtime'
import { fetchContentMap } from '@/lib/contentDb'

/**
 * useSiteContent — peta key → value live dari Supabase + Realtime.
 * Gagal/kosong → map kosong (pemanggil memakai fallback statis per key).
 */
export function useSiteContent(): Record<string, string> {
  const [map, setMap] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false

    const load = async () => {
      try {
        const m = await fetchContentMap()
        if (!cancelled && Object.keys(m).length > 0) setMap(m)
      } catch {
        // Fallback statis dipertahankan.
      }
    }

    load()

    const unsubscribe = subscribeShared(
      'site-content-changes',
      [{ event: '*', schema: 'public', table: 'site_content' }],
      load,
    )

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  return map
}

/** Ambil 1 teks: nilai live jika ada, fallback statis jika tidak. */
export function useContent(key: string, fallback: string): string {
  const map = useSiteContent()
  return map[key] ?? fallback
}
