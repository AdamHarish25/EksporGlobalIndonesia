import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { HOW_IT_WORKS_STEPS } from '@/constants'

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              How It Works
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              From Inquiry to Shipment
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              A structured 9-step process to ensure reliable and transparent transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 to-brand-700" />

              <div className="space-y-12">
                {HOW_IT_WORKS_STEPS.map((s, i) => (
                  <div key={s.step} className="relative flex gap-6 sm:gap-8">
                    <div className="relative z-10 shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                        <span className="text-lg sm:text-xl font-black text-white">{s.step}</span>
                      </div>
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-lg hover:shadow-brand-500/5 transition-all">
                        <h3 className="text-xl font-extrabold text-slate-900">{s.title}</h3>
                        <p className="mt-2 text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            Begin Your First Step
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Tell us what you need and we will guide you through the entire process.
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
