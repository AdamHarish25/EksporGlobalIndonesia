import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Globe,
  MapPin,
  Ship,
  Award,
  Package,
  FileText,
  ShieldCheck,
  Handshake,
  Factory,
  Droplet,
  Users,
  ShoppingCart,
  Tag,
  Boxes,
  Warehouse,
  Send,
  HelpCircle,
  Phone,
  Mail,
} from 'lucide-react'
import { BRAND, CONTACT, LINKS, TRUST_METRICS, WHY_CARDS, CERT_CARDS, CERT_PALETTE, FAQ_DATA, HOW_IT_WORKS_STEPS, EXPORT_DOCUMENTS } from '@/constants'
import { PRODUCTS } from '@/constants/products'
import { MARKETS } from '@/constants/markets'

const BUYER_TYPES = [
  { icon: ShoppingCart, title: 'Importers', desc: 'Direct supply for import businesses seeking reliable Indonesian sourcing partners.' },
  { icon: Boxes, title: 'Distributors', desc: 'Consistent bulk supply to fuel your distribution network across target markets.' },
  { icon: Warehouse, title: 'Wholesalers', desc: 'Competitive pricing and flexible MOQ for wholesale operations.' },
  { icon: Tag, title: 'Private Label Buyers', desc: 'Custom branding and packaging through our manufacturing partners.' },
]

const SOLUTIONS = [
  {
    id: 'bulk-supply',
    icon: Package,
    title: 'Bulk Supply',
    desc: 'Full-container-load (FCL) supply of palm cooking oil, coconut oil, and charcoal briquettes with competitive FOB pricing.',
    features: ['FCL quantities (18–20 MT per container)',       'FOB terms available', 'Lot-by-lot quality verification', 'Flexible shipping schedules'],
    cta: 'Request Bulk Quote',
  },
  {
    id: 'private-label',
    icon: Tag,
    title: 'Private Label',
    desc: 'Custom-branded packaging and labeling through our manufacturing partners. From concept to delivered product.',
    features: ['Custom label design', 'Retail-ready packaging', 'Small & large batch runs', 'Multiple format options'],
    cta: 'Discuss Private Label',
  },
  {
    id: 'custom-sourcing',
    icon: Globe,
    title: 'Custom Sourcing',
    desc: 'Need a specific Indonesian product? We source and export additional product lines based on buyer requirements.',
    features: ['Product specification matching', 'Supplier verification', 'Quality sampling', 'Documentation support'],
    cta: 'Start Custom Sourcing',
  },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [sourcingForm, setSourcingForm] = useState({
    product: '',
    specification: '',
    quantity: '',
    packaging: '',
    destination: '',
    application: '',
    message: '',
  })

  const handleSourcingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSourcingForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      {/* ──────────────────────── HERO ──────────────────────── */}
      <section id="home" className="relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(8,18,13,0.92), rgba(8,18,13,0.72)), url('/PalmTree.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(34,197,94,0.35) 1.5px, transparent 1.5px), radial-gradient(circle at 80% 60%, rgba(234,179,8,0.35) 1.5px, transparent 1.5px)',
            backgroundSize: '34px 34px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs sm:text-sm font-semibold text-brand-200 backdrop-blur-sm">
              {BRAND.heroBadge}
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02]">
              Connecting Global Buyers with{' '}
              <span className="text-brand-300">Quality Products from Indonesia</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
              Source export-ready Indonesian products through a reliable B2B sourcing and export partner.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/request-a-quote"
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
                Explore Products
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" /> FOB Tanjung Priok / Belawan
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500" /> L/C at Sight &bull; T/T Accepted
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-4">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/25 ring-1 ring-white/10 bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
                <img src="/cp8.jpg" alt="Indonesian export products" className="h-[28rem] w-full object-cover" loading="eager" />
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7">
                  <div className="flex flex-wrap gap-2">
                    {PRODUCTS.map(p => (
                      <span key={p.id} className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/10">
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-sm">
                  <img src="/refinery.jpg" alt="Refinery" className="h-40 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">Indonesian Origin</div>
                    <div className="mt-1 font-bold text-white">Refinery-backed supply</div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-sm">
                  <img src="/loadingPort.jpg" alt="Export port" className="h-40 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">Export Ready</div>
                    <div className="mt-1 font-bold text-white">FOB Terms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── TRUST STRIP ──────────────────── */}
      <section className="bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {TRUST_METRICS.map(m => (
              <div key={m.label} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 rounded-2xl bg-slate-800/45 p-3.5 sm:rounded-none sm:bg-transparent sm:p-0">
                <div className="shrink-0 rounded-xl bg-brand-600/20 p-2.5 ring-1 ring-brand-500/30">
                  <m.icon size={22} className="text-brand-500" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">{m.label}</div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 break-words">{m.value}</div>
                  <div className="text-xs sm:text-sm text-slate-400 break-words">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── WHO WE SERVE ──────────────────── */}
      <section id="who-we-serve" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Who We Serve
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Trusted by International Buyers
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We work with a diverse range of B2B buyers across global markets.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUYER_TYPES.map(bt => (
              <div key={bt.title} className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                  <bt.icon size={26} className="text-white" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-slate-900">{bt.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{bt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── OUR PRODUCTS ──────────────────── */}
      <section id="products" className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Our Products
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Export-Ready Indonesian Products
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Three core product lines sourced from Indonesian manufacturers and suppliers.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {PRODUCTS.map(p => (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                className="group relative rounded-2xl overflow-hidden ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/10 transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">{p.shortDescription}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                    View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── PRODUCT COMPARISON ────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Product Comparison
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Compare Our Products
            </h2>
          </div>
          <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left font-bold text-slate-900">Feature</th>
                    {PRODUCTS.map(p => (
                      <th key={p.id} className="px-6 py-4 text-left font-bold text-slate-900">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-700">Category</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="px-6 py-4 text-slate-600">{p.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-700">MOQ</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="px-6 py-4 text-slate-600">{p.moq}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-700">Incoterms</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="px-6 py-4 text-slate-600">{p.incoterms.join(', ')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-700">Private Label</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="px-6 py-4">
                        {p.privateLabelAvailable ? (
                          <CheckCircle2 size={18} className="text-brand-600" />
                        ) : (
                          <span className="text-slate-400">&mdash;</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-700">Certifications</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="px-6 py-4 text-slate-600">{p.certifications.join(', ')}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── SOLUTIONS ──────────────────── */}
      <section id="solutions" className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Solutions
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Flexible Supply Solutions
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Choose the supply model that fits your business requirements.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {SOLUTIONS.map(s => (
              <div key={s.id} className="group relative rounded-2xl bg-white p-6 lg:p-8 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                  <s.icon size={26} className="text-white" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-slate-900">{s.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-brand-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    to="/request-a-quote"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    {s.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── PRIVATE LABEL ────────────────── */}
      <section id="private-label" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Private Label
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Your Brand, Our Products
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Launch your own branded product line with Indonesian manufacturing support.
            </p>
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
              <img src="/refinery.jpg" alt="Private label manufacturing" className="h-80 w-full object-cover" loading="lazy" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">How Private Label Works</h3>
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
                to="/request-a-quote"
                className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                Start Private Label Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── CUSTOM SOURCING ────────────────── */}
      <section id="custom-sourcing" className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Custom Sourcing
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Need Something Specific?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We source additional Indonesian products based on your requirements.
            </p>
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6">
                <h3 className="text-lg font-extrabold text-slate-900">How It Works</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    'Submit your product specification and requirements',
                    'We identify suitable Indonesian suppliers',
                    'Samples provided for quality verification',
                    'Quotation with pricing and lead time',
                    'Full export coordination upon order confirmation',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <form
              onSubmit={e => { e.preventDefault(); window.open(LINKS.whatsAppGeneric, '_blank') }}
              className="rounded-2xl ring-1 ring-slate-200 bg-white p-6 lg:p-8 shadow-sm"
            >
              <h3 className="text-lg font-extrabold text-slate-900">Request Custom Sourcing</h3>
              <div className="mt-6 grid gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Product Required</label>
                  <input name="product" value={sourcingForm.product} onChange={handleSourcingChange} placeholder="e.g., Refined Sugar, Spice Extracts..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Specification</label>
                    <input name="specification" value={sourcingForm.specification} onChange={handleSourcingChange} placeholder="Grade, quality, standards..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Quantity</label>
                    <input name="quantity" value={sourcingForm.quantity} onChange={handleSourcingChange} placeholder="e.g., 20 MT, 1 container..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Packaging Preference</label>
                    <input name="packaging" value={sourcingForm.packaging} onChange={handleSourcingChange} placeholder="Bulk, retail, private label..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Destination</label>
                    <input name="destination" value={sourcingForm.destination} onChange={handleSourcingChange} placeholder="Country or port..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Application / Use Case</label>
                  <input name="application" value={sourcingForm.application} onChange={handleSourcingChange} placeholder="Food manufacturing, retail, etc." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Additional Details</label>
                  <textarea name="message" value={sourcingForm.message} onChange={handleSourcingChange} rows={3} placeholder="Any other requirements..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none" />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Send size={18} />
                  Submit via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ──────────────── WHY EXPORT GLOBAL INDONESIA ──────────────── */}
      <section id="why-us" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Why Export Global Indonesia
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Built for Long-Term B2B Partnerships
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We understand importers&apos; needs for supply security, consistent quality, and fast document turnaround.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {WHY_CARDS.map(c => (
              <div key={c.title} className="group relative rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all">
                <div className="absolute top-4 right-4 rounded-full bg-brand-50 text-brand-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {c.highlight}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                  <c.icon size={26} className="text-white" />
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── HOW IT WORKS ────────────────── */}
      <section id="how-it-works" className="py-14 sm:py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              How It Works
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
              From Inquiry to Shipment
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              A structured 9-step process to ensure reliable and transparent transactions.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW_IT_WORKS_STEPS.map(s => (
              <div key={s.step} className="group rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 p-6 hover:ring-brand-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center text-lg font-black text-brand-400">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── QUALITY & DOCUMENTATION ──────────────── */}
      <section id="quality" className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Quality & Documentation
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Certified Quality at Every Step
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Full documentation set included for seamless customs clearance and regulatory compliance.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERT_CARDS.map(c => (
              <div key={c.acronym} className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${CERT_PALETTE[c.color]} shadow-lg`}>
                  <c.icon size={30} className="text-white" />
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">{c.acronym}</span>
                </div>
                <h3 className="mt-1 text-lg font-extrabold text-slate-900 leading-snug">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-brand-50 via-amber-50 to-brand-50 ring-1 ring-brand-100 p-6 lg:p-8">
            <h3 className="text-lg font-extrabold text-slate-900">Export Documentation Included</h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {EXPORT_DOCUMENTS.map(d => (
                <li key={d} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200 shadow-sm">
                  <CheckCircle2 size={16} className="text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ────────────────── TARGET MARKETS ────────────────── */}
      <section id="markets" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Target Markets
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Serving the Middle East &amp; Beyond
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our primary export markets include Saudi Arabia, UAE, and the broader GCC region.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {MARKETS.map(m => (
              <Link
                key={m.id}
                to={`/markets/${m.slug}`}
                className="group rounded-2xl bg-white p-6 lg:p-8 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all"
              >
                <div className="text-4xl mb-4">{m.flag}</div>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors">{m.name}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">{m.description}</p>
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

      {/* ──────────────────── ABOUT US ──────────────────── */}
      <section id="about" className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
                About Us
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {BRAND.name}
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                {BRAND.tagline}. We connect international B2B buyers with quality Indonesian products through reliable sourcing, export coordination, and transparent communication.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 p-4">
                  <MapPin size={20} className="text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{CONTACT.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 p-4">
                  <Users size={20} className="text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Director</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{CONTACT.directorName}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 p-4">
                  <Phone size={20} className="text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">WhatsApp</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{CONTACT.whatsAppNumber}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 p-4">
                  <Mail size={20} className="text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900 break-all">{CONTACT.email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
              <img src="/refinery.jpg" alt="Export Global Indonesia operations" className="h-[28rem] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">Indonesia-Based Export Partner</div>
                <div className="mt-2 text-xl font-extrabold leading-tight">Connecting Indonesia to the World</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── FAQ ───────────────────── */}
      <section id="faq" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Frequently Asked Questions
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Common Questions
            </h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-bold text-slate-900">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp size={20} className="text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── FINAL CTA ──────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
            Ready to Start?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Request a Quote Today
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Tell us your requirements and receive a detailed quotation within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/request-a-quote"
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="fill-white/20" />
              Request a Quote
            </Link>
            <a
              href={LINKS.whatsAppGeneric}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors backdrop-blur-sm"
            >
              <Phone size={20} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
