import { ShieldCheck, Award, BadgeCheck } from 'lucide-react'
import { CERT_CARDS, CERT_PALETTE, EXTRA_STANDARDS } from '@/constants'

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
            Quality & Certifications
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Certified Quality at Every Step
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Full documentation set included for seamless customs clearance and regulatory compliance at destination.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERT_CARDS.map(c => (
            <div
              key={c.acronym}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${CERT_PALETTE[c.color]} shadow-lg`}>
                <c.icon size={30} className="text-white" />
              </div>
              <div className="mt-5 flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">{c.acronym}</span>
                <BadgeCheck size={16} className="text-brand-600" />
              </div>
              <h3 className="mt-1 text-lg font-extrabold text-slate-900 leading-snug">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-brand-50 via-amber-50 to-brand-50 ring-1 ring-brand-100 p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm ring-1 ring-brand-200">
                <ShieldCheck size={28} className="text-brand-700" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-700">Additional Assurance</div>
                <h3 className="text-xl font-extrabold text-slate-900">International Standards</h3>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
              {EXTRA_STANDARDS.map(e => (
                <div key={e} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200 shadow-sm">
                  <Award size={16} className="text-gold-500 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">{e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
