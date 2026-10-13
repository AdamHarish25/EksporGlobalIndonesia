import { Loader2 } from 'lucide-react'

/** Fallback loading setiap ganti halaman (dipakai Suspense + lazy route). */
export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-white">
      <Loader2 size={36} className="animate-spin text-brand-600" />
      <p className="text-sm font-semibold text-slate-500">Loading page...</p>
    </div>
  )
}
