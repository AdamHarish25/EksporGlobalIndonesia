import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MonitorSmartphone } from 'lucide-react'

/** Batas tablet: breakpoint md Tailwind (768px). */
const DESKTOP_QUERY = '(min-width: 768px)'

function useIsDesktop(): boolean {
  const [ok, setOk] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_QUERY).matches : true,
  )

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const onChange = (e: MediaQueryListEvent) => setOk(e.matches)
    setOk(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return ok
}

/** Admin Panel hanya untuk tablet–desktop. Mobile mendapat pemberitahuan. */
export default function AdminDesktopGate({ children }: { children: React.ReactNode }) {
  const isDesktop = useIsDesktop()

  if (isDesktop) return <>{children}</>

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm text-center rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <MonitorSmartphone size={28} className="text-slate-500" />
        </div>
        <h1 className="mt-4 text-xl font-extrabold text-slate-900">Butuh Layar Lebih Besar</h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Admin Panel hanya bisa diakses dari <span className="font-semibold">tablet atau desktop</span>.
          Silakan buka halaman ini dari perangkat dengan layar lebih besar.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white w-full"
        >
          Kembali ke Situs
        </Link>
      </div>
    </div>
  )
}
