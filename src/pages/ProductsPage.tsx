import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PRODUCTS } from '@/constants/products'

export default function ProductsPage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Our Products
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Export-Ready Indonesian Products
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Three core product lines sourced from Indonesian manufacturers and suppliers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map(p => (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                className="group relative rounded-2xl overflow-hidden ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/10 transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ${
                      p.categoryColor === 'gold' ? 'bg-gold-500/20 text-gold-100 ring-gold-400/30' :
                      p.categoryColor === 'brand' ? 'bg-brand-500/20 text-brand-100 ring-brand-400/30' :
                      'bg-slate-500/20 text-slate-100 ring-slate-400/30'
                    } backdrop-blur-sm`}>
                      {p.category}
                    </span>
                  </div>
                  {p.privateLabelAvailable && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm ring-1 ring-white/20">
                        Private Label
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors">{p.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.certifications.map(c => (
                      <span key={c} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                    View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
