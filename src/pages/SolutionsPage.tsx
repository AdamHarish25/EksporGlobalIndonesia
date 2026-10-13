import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { SOLUTIONS } from '@/constants/solutions'

/**
 * Overview solutions — hanya kartu navigasi ke route terpisah.
 * Tidak lagi menggabung 3 solution dalam 1 halaman dengan id anchor.
 */
export default function SolutionsPage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Solutions
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">Flexible Supply Solutions</h1>
            <p className="mt-4 text-lg text-slate-300">
              Choose the supply model that fits your business requirements. Each solution has its own page.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {SOLUTIONS.map((s) => (
            <Link
              key={s.slug}
              to={`/solutions/${s.slug}`}
              className="group rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl overflow-hidden transition-all flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img src={s.image} alt={s.imageAlt} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <s.icon size={22} className="text-white" />
                </div>
                <h2 className="mt-4 text-xl font-extrabold text-slate-900 group-hover:text-brand-700">{s.title}</h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="text-brand-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                  Open {s.title} page <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
