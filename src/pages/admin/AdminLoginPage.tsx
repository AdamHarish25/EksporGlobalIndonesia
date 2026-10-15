import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogIn, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import AdminDesktopGate from '@/components/AdminDesktopGate'
import { BRAND } from '@/constants'

export default function AdminLoginPage() {
  const { signIn, user, role, loading, configured } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  const location = useLocation() as { state?: { from?: string } }

  // Sudah login + punya peran → langsung ke panel
  if (!loading && user && role) {
    navigate(location.state?.from ?? '/admin/products', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const { error: msg } = await signIn(email.trim(), password)
    setBusy(false)
    if (msg) {
      setError(msg)
    } else {
      navigate(location.state?.from ?? '/admin/products', { replace: true })
    }
  }

  return (
    <AdminDesktopGate>
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600">
            <LayoutDashboard size={22} className="text-white" />
          </span>
          <div>
            <div className="font-extrabold text-slate-900">{BRAND.name}</div>
            <div className="text-xs uppercase tracking-wider text-slate-500">Admin Panel</div>
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-slate-900">Masuk</h1>
        <p className="mt-1 text-sm text-slate-600">Kelola katalog produk dan aset website.</p>

        {!configured && (
          <div className="mt-4 rounded-xl bg-gold-500/10 ring-1 ring-gold-500/30 px-4 py-3 text-sm text-gold-600">
            Supabase belum dikonfigurasi — isi <code className="font-mono">.env.local</code> dulu.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
            />
          </div>
          {error && (
            <div className="rounded-xl bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors"
          >
            <LogIn size={17} />
            {busy ? 'Memeriksa...' : 'Masuk'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-brand-700">
            ← Kembali ke situs
          </Link>
        </div>
      </div>
    </div>
    </AdminDesktopGate>
  )
}
