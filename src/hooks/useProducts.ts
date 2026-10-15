import { useEffect, useState } from 'react'
import type { Product } from '@/types'
import { PRODUCTS } from '@/constants/products'
import { isSupabaseConfigured } from '@/lib/supabase'
import { subscribeShared } from '@/lib/realtime'
import { fetchProductsFromDb, fetchProductBySlugFromDb } from '@/lib/productsDb'

/**
 * useProducts — katalog produk live dari Supabase + Realtime, fallback statis.
 *
 * - Render pertama memakai konstanta statis (instan, tanpa layout shift).
 * - Lalu fetch Supabase; jika kosong/gagal → tetap pakai statis (situs tak pernah blank,
 *   mis. saat project Free sedang pause).
 * - Subscribe Realtime (products/specs/packaging) → refetch otomatis saat editor
 *   menyimpan perubahan di /admin. Semua pengunjung melihat update tanpa refresh.
 */
export function useProducts(): { products: Product[]; live: boolean } {
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false

    const load = async () => {
      try {
        const mapped = await fetchProductsFromDb()
        if (!cancelled && mapped.length > 0) {
          setProducts(mapped)
          setLive(true)
        }
      } catch {
        // Fallback statis dipertahankan — cukup diam, jangan blank.
      }
    }

    load()

    // Satu channel bersama per nama (lihat src/lib/realtime.ts) — aman walau
    // banyak hook/instans dalam satu halaman atau StrictMode double-mount.
    const unsubscribe = subscribeShared(
      'products-changes',
      [
        { event: '*', schema: 'public', table: 'products' },
        { event: '*', schema: 'public', table: 'product_specs' },
        { event: '*', schema: 'public', table: 'product_packaging' },
      ],
      load,
    )

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  return { products, live }
}

/** Cari satu produk by slug dari katalog live (fallback statis ikut serta). */
export function useProduct(slug: string | undefined): {
  product: Product | undefined
  live: boolean
  loading: boolean
} {
  const { products, live } = useProducts()
  const [extra, setExtra] = useState<Product | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    // Jika slug tidak ada di katalog published, coba fetch langsung —
    // RLS yang menentukan: editor melihat draft (preview), anon tetap null.
    if (slug && isSupabaseConfigured && !products.some(p => p.slug === slug)) {
      setPending(true)
      fetchProductBySlugFromDb(slug)
        .then(setExtra)
        .catch(() => setExtra(null))
        .finally(() => setPending(false))
    } else {
      setExtra(null)
      setPending(false)
    }
  }, [slug, products])

  const product = products.find(p => p.slug === slug) ?? extra ?? undefined
  return { product, live, loading: pending && !product }
}
