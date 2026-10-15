import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase client singleton (Phase 0).
 *
 * Membutuhkan env:
 *   VITE_SUPABASE_URL      — Project URL (Project Settings → API)
 *   VITE_SUPABASE_ANON_KEY — anon public key (BOLEH terekspos; keamanan di RLS)
 *
 * Jangan pernah memakai service_role key di frontend.
 * Jika env belum diisi (mis. saat develop awal), client tetap dibuat dengan
 * string kosong dan query akan gagal diam-diam — hook data wajib fallback
 * ke konstanta statis agar situs tidak pernah rusak.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

if (!isSupabaseConfigured) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi. ' +
      'Hook data akan memakai fallback statis. Lihat .env.example.',
  )
}

export const supabase: SupabaseClient = createClient(url ?? '', anonKey ?? '')
