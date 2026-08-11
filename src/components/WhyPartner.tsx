import { WHY_CARDS } from '@/constants'

export default function WhyPartner() {
  return (
    <section id="why-us" className="py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
            Why Partner With Us
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Built for Long-Term B2B Partnerships
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We understand importers&apos; needs for supply security, consistent quality, and fast document turnaround.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CARDS.map(c => (
            <div
              key={c.title}
              className="group relative rounded-2xl bg-white p-8 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all"
            >
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
  )
}
