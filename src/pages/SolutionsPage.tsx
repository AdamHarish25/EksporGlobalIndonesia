import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Package, Tag, Globe, CheckCircle2, Send,
} from 'lucide-react'

const SOLUTIONS = [
  {
    id: 'bulk-supply',
    icon: Package,
    title: 'Bulk Supply',
    desc: 'Full-container-load (FCL) supply of coconut oil and charcoal briquettes with competitive FOB pricing.',
    features: [
      'FCL quantities (18–20 MT per container)',
      'FOB terms available',
      'Lot-by-lot quality verification',
      'Flexible shipping schedules',
      'Certificate of Analysis (CoA) included',
      'Halal certification included',
    ],
    cta: 'Request Bulk Quote',
  },
  {
    id: 'private-label',
    icon: Tag,
    title: 'Private Label',
    desc: 'Custom-branded packaging and labeling through our manufacturing partners. From concept to delivered product.',
    features: [
      'Custom label design support',
      'Retail-ready packaging',
      'Small & large batch runs',
      'Multiple format options',
      'Arabic / English labeling available',
      'End-to-end export coordination',
    ],
    cta: 'Discuss Private Label',
  },
  {
    id: 'custom-sourcing',
    icon: Globe,
    title: 'Custom Sourcing',
    desc: 'Need a specific Indonesian product? We source and export additional product lines based on buyer requirements.',
    features: [
      'Product specification matching',
      'Supplier verification & vetting',
      'Quality sampling process',
      'Full documentation support',
      'Flexible MOQ discussion',
      'Long-term supply partnerships',
    ],
    cta: 'Start Custom Sourcing',
  },
]

export default function SolutionsPage() {
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

  const handleSourcingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      product: sourcingForm.product,
      specification: sourcingForm.specification,
      quantity: sourcingForm.quantity,
      packaging: sourcingForm.packaging,
      destination: sourcingForm.destination,
      application: sourcingForm.application,
      message: sourcingForm.message,
    })
    window.open(`mailto:adam.eksporglobalindonesia@gmail.com?subject=${encodeURIComponent(`[Custom Sourcing] ${sourcingForm.product}`)}&body=${encodeURIComponent(params.toString().replace(/&/g, '\n'))}`, '_blank')
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Solutions
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Flexible Supply Solutions
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Choose the supply model that fits your business requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Bulk Supply */}
      <section id="bulk-supply" className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Package size={26} className="text-white" />
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Bulk Supply</h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Full-container-load (FCL) supply of coconut oil and charcoal briquettes with competitive FOB pricing. Ideal for importers, distributors, and large-scale buyers.
              </p>
              <ul className="mt-8 space-y-4">
                {SOLUTIONS[0].features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to="/request-a-quote"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  Request Bulk Quote
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
              <img src="/TerminalContainerAerial.jpg" alt="Bulk supply shipping" className="h-80 w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Private Label */}
      <section id="private-label" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl order-2 lg:order-1">
              <img src="/endproduct.jpg" alt="Private label manufacturing" className="h-80 w-full object-cover" loading="lazy" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Tag size={26} className="text-white" />
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Private Label</h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Launch your own branded product line with Indonesian manufacturing support. Custom packaging, labeling, and branding from concept to delivered product.
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
                to="/request-a-quote"
                className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
              >
                Discuss Private Label
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Sourcing */}
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
              onSubmit={handleSourcingSubmit}
              className="rounded-2xl ring-1 ring-slate-200 bg-white p-6 lg:p-8 shadow-sm"
            >
              <h3 className="text-lg font-extrabold text-slate-900">Request Custom Sourcing</h3>
              <div className="mt-6 grid gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Product Required</label>
                  <input name="product" value={sourcingForm.product} onChange={handleSourcingChange} required placeholder="e.g., Refined Sugar, Spice Extracts..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
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
                  Submit Custom Sourcing Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
