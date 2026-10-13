import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { CheckCircle2, Send, ArrowLeft, ArrowRight } from 'lucide-react'
import { SOLUTIONS, getSolutionBySlug } from '@/constants/solutions'
import { CONTACT } from '@/constants'
import ImageCarousel from '@/components/ImageCarousel'

export default function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const solution = slug ? getSolutionBySlug(slug) : undefined

  const [form, setForm] = useState({
    product: '',
    specification: '',
    quantity: '',
    packaging: '',
    destination: '',
    application: '',
    message: '',
  })

  if (!solution) {
    return <Navigate to="/solutions" replace />
  }

  const others = SOLUTIONS.filter((s) => s.slug !== solution.slug)
  const Icon = solution.icon

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = Object.entries(form)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    window.open(
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(`[Custom Sourcing] ${form.product}`)}&body=${encodeURIComponent(body)}`,
      '_blank',
    )
  }

  const privateLabelSteps = [
    { step: '01', title: 'Share Your Requirements', desc: 'Tell us your product, packaging, and branding needs.' },
    { step: '02', title: 'Design & Sampling', desc: 'We coordinate label design and produce samples for approval.' },
    { step: '03', title: 'Production', desc: 'Once approved, production begins at our partner facility.' },
    { step: '04', title: 'Export & Delivery', desc: 'We handle documentation and ship to your destination.' },
  ]

  return (
    <>
      {/* Hero — tiap solution punya URL & hero sendiri */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Link to="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white">
            <ArrowLeft size={16} /> All Solutions
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Solutions / {solution.title}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">{solution.title}</h1>
            <p className="mt-4 text-lg text-slate-300">{solution.longDesc}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Icon size={26} className="text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">What&apos;s included</h2>
            <ul className="mt-8 space-y-4">
              {solution.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{f}</span>
                </li>
              ))}
            </ul>

            {solution.slug === 'private-label' && (
              <div className="mt-10 space-y-6">
                {privateLabelSteps.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-sm font-black text-white">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{s.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <Link
                to="/request-a-quote"
                className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
              >
                {solution.cta}
              </Link>
            </div>
          </div>

          <div>
            {solution.carousel && solution.carousel.length > 0 ? (
              <ImageCarousel slides={solution.carousel} />
            ) : (
              <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
                <img src={solution.image} alt={solution.imageAlt} className="h-80 w-full object-cover" loading="eager" />
              </div>
            )}

            {solution.showForm && (
              <form onSubmit={handleSubmit} className="mt-8 rounded-2xl ring-1 ring-slate-200 bg-white p-6 lg:p-8 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900">Request Custom Sourcing</h3>
                <div className="mt-6 grid gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Product Required</label>
                    <input name="product" value={form.product} onChange={handleChange} required placeholder="e.g., Refined Sugar, Spice Extracts..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Specification</label>
                      <input name="specification" value={form.specification} onChange={handleChange} placeholder="Grade, quality, standards..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Quantity</label>
                      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g., 20 MT, 1 container..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Packaging Preference</label>
                      <input name="packaging" value={form.packaging} onChange={handleChange} placeholder="Bulk, retail, private label..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Destination</label>
                      <input name="destination" value={form.destination} onChange={handleChange} placeholder="Country or port..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Application / Use Case</label>
                    <input name="application" value={form.application} onChange={handleChange} placeholder="Food manufacturing, retail, etc." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Additional Details</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any other requirements..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none" />
                  </div>
                  <button type="submit" className="mt-2 w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5">
                    <Send size={18} />
                    Submit Custom Sourcing Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Navigasi ke solution lain — tetap via route, bukan anchor */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-extrabold text-slate-900">Explore other solutions</h3>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {others.map((o) => (
              <Link key={o.slug} to={`/solutions/${o.slug}`} className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-lg transition-all flex items-center justify-between gap-4">
                <div>
                  <div className="font-extrabold text-slate-900 group-hover:text-brand-700">{o.title}</div>
                  <div className="mt-1 text-sm text-slate-600 line-clamp-2">{o.desc}</div>
                </div>
                <ArrowRight size={20} className="text-brand-600 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
