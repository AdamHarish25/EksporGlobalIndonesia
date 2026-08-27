import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { MARKETS } from '@/constants/markets'

export default function MarketsPage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Target Markets
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Serving the Middle East &amp; Beyond
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Our primary export markets include Saudi Arabia, UAE, and the broader GCC region.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {MARKETS.map(m => (
              <Link
                key={m.id}
                to={`/markets/${m.slug}`}
                className="group rounded-2xl bg-white p-6 lg:p-8 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all"
              >
                <div className="text-4xl mb-4">{m.flag}</div>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {m.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {m.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.buyerTypes.slice(0, 3).map(bt => (
                    <span key={bt} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {bt}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                  View Market Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
