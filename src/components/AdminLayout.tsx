import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ExternalLink, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { BRAND } from '@/constants'

/** Kerangka halaman admin: topbar + info peran + keluar. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/admin/products" className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 shrink-0">
              <LayoutDashboard size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold truncate">{BRAND.name}</span>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400">Admin Panel</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200 truncate max-w-52">
              {user?.email}
            </span>
            <span className="rounded-full bg-brand-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-100 ring-1 ring-brand-500/30">
              {role}
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ExternalLink size={15} />
              <span className="hidden sm:inline">Lihat Situs</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
        {location.pathname.startsWith('/admin/') && (
          <nav className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
              {[
                { to: '/admin/products', label: 'Products', match: '/admin/products' },
                { to: '/admin/content', label: 'Content', match: '/admin/content' },
                { to: '/admin/solutions', label: 'Solutions', match: '/admin/solutions' },
                { to: '/admin/suppliers', label: 'Suppliers', match: '/admin/suppliers' },
                ...(role === 'admin'
                  ? [{ to: '/admin/logs', label: 'Logs', match: '/admin/logs' }]
                  : []),
              ].map(t => {
                const active = location.pathname === t.to || location.pathname.startsWith(t.match + '/')
                return (
                  <Link
                    key={t.to}
                    to={t.to}
                    className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                      active
                        ? 'text-white border-brand-500'
                        : 'text-slate-400 border-transparent hover:text-white'
                    }`}
                  >
                    {t.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
