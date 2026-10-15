import { useEffect, useState } from 'react'
import type { SolutionDetail } from '@/constants/solutions'
import { SOLUTIONS as STATIC_SOLUTIONS } from '@/constants/solutions'
import { isSupabaseConfigured } from '@/lib/supabase'
import { subscribeShared } from '@/lib/realtime'
import { fetchSolutionsFromDb, fetchSolutionBySlugFromDb } from '@/lib/solutionsDb'

/**
 * useSolutions — daftar solutions live + Realtime, fallback statis.
 * Pola sama seperti useProducts: render instan, gagal → statis.
 */
export function useSolutions(): { solutions: SolutionDetail[]; live: boolean } {
  const [solutions, setSolutions] = useState<SolutionDetail[]>(STATIC_SOLUTIONS)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false

    const load = async () => {
      try {
        const mapped = await fetchSolutionsFromDb()
        if (!cancelled && mapped.length > 0) {
          setSolutions(mapped)
          setLive(true)
        }
      } catch {
        // Fallback statis dipertahankan.
      }
    }

    load()

    const unsubscribe = subscribeShared(
      'solutions-changes',
      [{ event: '*', schema: 'public', table: 'solutions' }],
      load,
    )

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  return { solutions, live }
}

/** Satu solution by slug; editor bisa preview draft (RLS), anon tetap null. */
export function useSolution(slug: string | undefined): {
  solution: SolutionDetail | undefined
  others: SolutionDetail[]
  live: boolean
  loading: boolean
} {
  const { solutions, live } = useSolutions()
  const [extra, setExtra] = useState<SolutionDetail | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (slug && isSupabaseConfigured && !solutions.some(s => s.slug === slug)) {
      setPending(true)
      fetchSolutionBySlugFromDb(slug)
        .then(setExtra)
        .catch(() => setExtra(null))
        .finally(() => setPending(false))
    } else {
      setExtra(null)
      setPending(false)
    }
  }, [slug, solutions])

  const solution = solutions.find(s => s.slug === slug) ?? extra ?? undefined
  return {
    solution,
    others: solutions.filter(s => s.slug !== slug),
    live,
    loading: pending && !solution,
  }
}
