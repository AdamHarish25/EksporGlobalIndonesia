import { useParams, Link } from 'react-router-dom'
import { PRODUCTS, getSpecificationDisclaimer } from '@/constants/products'
import {
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Package,
  Globe,
  FileText,
  Tag,
  Truck,
  Boxes,
  Factory,
  ClipboardList,
  ShieldCheck,
  Info,
} from 'lucide-react'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = PRODUCTS.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Product not found</h1>
          <p className="mt-4 text-slate-600">The product you are looking for does not exist.</p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
          >
            <ArrowRight size={18} />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    TARGET: 'bg-gold-500/10 text-gold-600 ring-gold-500/20',
    VERIFIED: 'bg-brand-500/10 text-brand-700 ring-brand-500/20',
    AVAILABLE: 'bg-blue-500/10 text-blue-700 ring-blue-500/20',
  }

  const categoryColors: Record<string, string> = {
    gold: 'bg-gold-500/10 text-gold-600 ring-gold-500/20',
    brand: 'bg-brand-500/10 text-brand-700 ring-brand-500/20',
    slate: 'bg-slate-500/10 text-slate-700 ring-slate-500/20',
  }

  return (
    <>
      {/* ──────────────────────── HERO ──────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(8,18,13,0.92), rgba(8,18,13,0.72)), url('${product.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ring-1 ${categoryColors[product.categoryColor]}`}>
                {product.category}
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02]">
                {product.name}
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                {product.shortDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={`/request-a-quote?product=${product.slug}`}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle size={20} className="fill-white/20" />
                  Request a Quote
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors backdrop-blur-sm"
                >
                  <ArrowRight size={20} />
                  All Products
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" /> {product.origin}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-500" /> {product.incoterms.join(' & ')}
                </div>
              </div>
            </div>
            {product.image && (
              <div className="relative">
                <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-black/25 ring-1 ring-white/10 bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
                  <img src={product.image} alt={product.name} className="h-[28rem] w-full object-cover" loading="eager" />
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7">
                    <div className="flex flex-wrap gap-2">
                      {product.applications.slice(0, 3).map(app => (
                        <span key={app} className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/10">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────── OVERVIEW ──────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Overview
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {product.name}
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────── APPLICATIONS ──────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Applications
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Use Cases & Applications
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Suitable for a wide range of commercial and industrial applications.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.applications.map(app => (
              <div
                key={app}
                className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-lg transition-all"
              >
                <CheckCircle2 size={18} className="text-brand-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── SPECIFICATIONS ──────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Specifications
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Technical Specifications
            </h2>
          </div>
          <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Parameter</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Value</th>
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {product.specifications.map((spec, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 font-semibold text-slate-700">{spec.param}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {spec.value.value}
                        {spec.unit && <span className="ml-1 text-slate-400">{spec.unit}</span>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase ring-1 ${statusColors[spec.value.status]}`}>
                          {spec.value.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-5">
            <Info size={18} className="text-slate-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 leading-relaxed">{getSpecificationDisclaimer()}</p>
          </div>
        </div>
      </section>

      {/* ──────────────────── PACKAGING ──────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Packaging
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Packaging Options
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.packaging.map((pkg, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                  <pkg.icon size={26} className="text-white" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-slate-900">{pkg.size}</h3>
                <p className="mt-2 text-sm text-slate-600">{pkg.pack}</p>
                <p className="mt-1 text-xs text-slate-500">{pkg.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── MOQ & SUPPLY ──────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              MOQ & Supply
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Order Requirements
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white p-6 lg:p-8 ring-1 ring-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Package size={26} className="text-white" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-slate-900">Minimum Order Quantity</h3>
              <p className="mt-3 text-lg font-semibold text-slate-700">{product.moq}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 lg:p-8 ring-1 ring-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Truck size={26} className="text-white" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-slate-900">Supply Capacity</h3>
              <p className="mt-3 text-lg font-semibold text-slate-700">{product.supplyCapacity}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── QUALITY & DOCUMENTATION ──────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Quality & Documentation
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Export Documentation
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Full documentation set included for seamless customs clearance and regulatory compliance.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {product.documentation.map(doc => (
              <div
                key={doc}
                className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200 shadow-sm"
              >
                <FileText size={18} className="text-brand-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">{doc}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.certifications.map(cert => (
              <span
                key={cert}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 ring-1 ring-brand-500/20"
              >
                <ShieldCheck size={12} />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── PRIVATE LABEL ──────────────────── */}
      {product.privateLabelAvailable && (
        <section className="py-14 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
                  Private Label
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  Your Brand, Our Products
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Launch your own branded product line with Indonesian manufacturing support.
                </p>
                <div className="mt-8 space-y-6">
                  {[
                    { step: '01', title: 'Share Your Requirements', desc: 'Tell us your product, packaging, and branding needs.' },
                    { step: '02', title: 'Design & Sampling', desc: 'We coordinate label design and produce samples for approval.' },
                    { step: '03', title: 'Production', desc: 'Once approved, production begins at our partner facility.' },
                    { step: '04', title: 'Export & Delivery', desc: 'We handle documentation and ship to your destination.' },
                  ].map(s => (
                    <div key={s.step} className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-sm font-black text-white">{s.step}</div>
                      <div>
                        <h4 className="font-bold text-slate-900">{s.title}</h4>
                        <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/request-a-quote?product=${product.slug}`}
                  className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Tag size={18} />
                  Start Private Label Inquiry
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
                <img src={product.image} alt="Private label manufacturing" className="h-80 w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────── EXPORT TERMS ──────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Export Terms
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Shipping & Terms
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center">
                <Globe size={22} className="text-brand-600" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-slate-900">Incoterms</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.incoterms.map(term => (
                  <span key={term} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {term}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center">
                <Factory size={22} className="text-brand-600" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-slate-900">Origin</h3>
              <p className="mt-3 text-sm font-semibold text-slate-700">{product.origin}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center">
                <Boxes size={22} className="text-brand-600" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-slate-900">Destination Markets</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.destinationMarkets.map(market => (
                  <span key={market} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {market}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── CTA ──────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
            Ready to Order?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Request a Quote for {product.name}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Tell us your requirements and receive a detailed quotation within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to={`/request-a-quote?product=${product.slug}`}
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="fill-white/20" />
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}