import { Link } from 'react-router-dom'
import {
  ShoppingCart, MessageCircle, ArrowRight,
  CheckCircle2, Globe, Package,
} from 'lucide-react'

const FLOW_STEPS = [
  { step: '01', title: 'Tell Us What You Need', desc: 'Share your product requirements, quantity, destination, and any specific needs through our quote form or WhatsApp.' },
  { step: '02', title: 'Receive a Quotation', desc: 'We review your requirements and provide a detailed quotation with pricing, lead time, and product specifications.' },
  { step: '03', title: 'Sample Verification', desc: 'Request samples for quality verification before confirming your order. We coordinate sample delivery from Indonesian suppliers.' },
  { step: '04', title: 'Confirm & Pay', desc: 'Confirm your order and arrange payment via L/C at Sight or T/T. We begin preparation upon payment confirmation.' },
  { step: '05', title: 'Production & Preparation', desc: 'Our supplier prepares your order with lot-by-lot quality verification and proper documentation.' },
  { step: '06', title: 'Export & Delivery', desc: 'We coordinate export documentation, customs clearance, and ship to your destination port.' },
]

const BUYER_TYPES = [
  { icon: ShoppingCart, title: 'Importers', desc: 'Direct supply for import businesses seeking reliable Indonesian sourcing partners.' },
  { icon: Package, title: 'Distributors', desc: 'Consistent bulk supply to fuel your distribution network across target markets.' },
  { icon: Globe, title: 'Wholesalers', desc: 'Competitive pricing and flexible MOQ for wholesale operations.' },
  { icon: MessageCircle, title: 'Private Label Buyers', desc: 'Custom branding and packaging through our manufacturing partners.' },
]

export default function ForBuyersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              For Buyers
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Source Indonesian Products with Confidence
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              A simple, transparent process for international B2B buyers to access quality Indonesian products.
            </p>
          </div>
        </div>
      </section>

      {/* Buyer Types */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Who We Serve
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Trusted by International Buyers
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUYER_TYPES.map(bt => (
              <div key={bt.title} className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 mx-auto group-hover:scale-105 transition-transform">
                  <bt.icon size={26} className="text-white" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-slate-900">{bt.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{bt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Steps */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              How It Works
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Simple 6-Step Process
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From inquiry to delivery, we make sourcing easy.
            </p>
          </div>
          <div className="mt-12 max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLOW_STEPS.map(s => (
              <div key={s.step} className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 hover:ring-brand-500 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-lg font-black text-white">
                    {s.step}
                  </div>
                  <h3 className="font-extrabold text-slate-900">{s.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
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
            Ready to Source?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Start Your Inquiry Today
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
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors backdrop-blur-sm"
            >
              <ArrowRight size={20} />
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
