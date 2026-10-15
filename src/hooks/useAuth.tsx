import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

export type AdminRole = 'admin' | 'editor'

interface AuthContextValue {
  user: User | null
  role: AdminRole | null
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

/** 'admin' memenuhi semua syarat peran (implikasi peran, sama seperti has_role di DB). */
export function roleAtLeast(role: AdminRole | null, required: AdminRole): boolean {
  if (!role) return false
  if (required === 'editor') return role === 'editor' || role === 'admin'
  return role === 'admin'
}

// Cek env TANPA mengimpor supabase-js — modul ini dipakai Navbar (main bundle),
// jadi client Supabase hanya di-load dinamis saat benar-benar dibutuhkan (halaman admin).
const configured = Boolean(
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) &&
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined),
)

async function getClient(): Promise<SupabaseClient> {
  const m = await import('@/lib/supabase')
  return m.supabase
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  role: null,
  loading: true,
  configured,
  signIn: async () => ({ error: 'Supabase belum dikonfigurasi' }),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<AdminRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!configured) {
      setLoading(false)
      return
    }
    let cancelled = false
    let unsubscribe: (() => void) | null = null

    const fetchRole = async (client: SupabaseClient, userId: string | undefined) => {
      if (cancelled || !userId) {
        if (!cancelled) setRole(null)
        return
      }
      const { data } = await client
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle()
      if (!cancelled) {
        setRole(data?.role === 'admin' || data?.role === 'editor' ? data.role : null)
      }
    }

    getClient().then(async client => {
      if (cancelled) return
      const { data } = await client.auth.getSession()
      if (cancelled) return
      setUser(data.session?.user ?? null)
      await fetchRole(client, data.session?.user?.id)
      if (cancelled) return
      setLoading(false)
      const { data: listener } = client.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null)
        await fetchRole(client, session?.user?.id)
      })
      unsubscribe = () => listener.subscription.unsubscribe()
    })

    return () => {
      cancelled = true
      unsubscribe?.()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!configured) return { error: 'Supabase belum dikonfigurasi (.env).' }
    const client = await getClient()
    const { error } = await client.auth.signInWithPassword({ email, password })
    return { error: error ? error.message : null }
  }

  const signOut = async () => {
    if (configured) {
      const client = await getClient()
      await client.auth.signOut()
    }
    setUser(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, configured, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext)
}
