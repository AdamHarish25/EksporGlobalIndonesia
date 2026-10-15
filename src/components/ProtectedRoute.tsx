import { Link, Navigate, useLocation } from 'react-router-dom'
import { ShieldAlert, LogOut } from 'lucide-react'
import { useAuth, roleAtLeast, type AdminRole } from '@/hooks/useAuth'
import PageLoader from '@/components/PageLoader'
import AdminDesktopGate from '@/components/AdminDesktopGate'

/** Kunci route admin: wajib login + peran cukup. Keamanan data tetap di RLS. */
export default function ProtectedRoute({
  children,
  requireRole = 'editor',
}: {
  children: React.ReactNode
  requireRole?: AdminRole
}) {
  const { user, role, loading, configured, signOut } = useAuth()
  const location = useLocation()

  if (!configured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center rounded-2xl bg-white ring-1 ring-slate-200 p-8">
          <h1 className="text-xl font-extrabold text-slate-900">Supabase belum dikonfigurasi</h1>
          <p className="mt-2 text-sm text-slate-600">
            Isi <code className="font-mono bg-slate-100 px-1 rounded">VITE_SUPABASE_URL</code> dan{' '}
            <code className="font-mono bg-slate-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> di{' '}
            <code className="font-mono bg-slate-100 px-1 rounded">.env.local</code> lalu restart dev server.
          </p>
        </div>
      </div>
    )
  }

  if (loading) return <PageLoader />

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  if (!roleAtLeast(role, requireRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center rounded-2xl bg-white ring-1 ring-slate-200 p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
            <ShieldAlert size={24} className="text-red-600" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-slate-900">Akses ditolak</h1>
          <p className="mt-2 text-sm text-slate-600">
            Akun <span className="font-semibold">{user.email}</span> tidak punya peran yang cukup.
            Minta admin untuk menetapkan peran via tabel <code className="font-mono bg-slate-100 px-1 rounded">user_roles</code>.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/" className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700">
              Ke Beranda
            </Link>
            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDesktopGate>{children}</AdminDesktopGate>
}
