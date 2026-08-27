import { useParams, Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, Globe, Package,
  FileText, Truck, MessageCircle,
} from 'lucide-react'
import { getMarketBySlug } from '@/constants/markets'
import { PRODUCTS } from '@/constants/products'

export default function MarketDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const market = getMarketBySlug(slug ?? '')

  if (!market) {
    return (
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Market Not Found</h1>
          <p className="mt-4 text-slate-600">The market you are looking for does not exist.</p>
          <Link to="/markets" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
            <ArrowRight size={16} className="rotate-180" /> Back to Markets
          </Link>
        </div>
      </section>
    )
  }

  const relevantProducts = PRODUCTS.filter(p => market.relevantProducts.includes(p.id))

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-4">{market.flag}</div>
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Target Market
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">{market.name}</h1>
            <p className="mt-4 text-lg text-slate-300">{market.description}</p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Market Overview
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {market.name} Market Overview
            </h2>
          </div>
        </div>
      </section>

      {/* Relevant Products */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Relevant Products
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Products for {market.name}
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {relevantProducts.map(p => (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all"
              >
                <div className="h-40 rounded-xl overflow-hidden ring-1 ring-slate-200">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors">{p.name}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{p.shortDescription}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                  View Product <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Types */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Buyer Types
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Who Buys in {market.name}?
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {market.buyerTypes.map(bt => (
              <div key={bt} className="flex items-center gap-3 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-5">
                <CheckCircle2 size={18} className="text-brand-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">{bt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Requirements */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Product Requirements
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Import Requirements
            </h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto space-y-3">
            {market.productRequirements.map((req, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
                <CheckCircle2 size={18} className="text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging Notes */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Packaging Notes
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Packaging for {market.name}
            </h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto space-y-3">
            {market.packagingNotes.map((note, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-5">
                <Package size={18} className="text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Notes */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Documentation
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Required Documentation
            </h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto space-y-3">
            {market.documentationNotes.map((doc, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
                <FileText size={18} className="text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Considerations */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Shipping
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Shipping Considerations
            </h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto space-y-3">
            {market.shippingConsiderations.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-5">
                <Truck size={18} className="text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
            Ready to Start?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Export to {market.name}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Tell us your requirements and receive a detailed quotation for {market.name} delivery.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/request-a-quote"
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="fill-white/20" />
              Request a Quote
            </Link>
            <Link
              to="/markets"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors backdrop-blur-sm"
            >
              <Globe size={20} />
              View All Markets
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
