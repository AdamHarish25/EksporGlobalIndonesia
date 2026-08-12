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

        <div className="mt-14 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-slate-200 bg-slate-900 shadow-xl">
              <img src="/refinery.jpg" alt="Refinery and production infrastructure" className="h-[34rem] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-200">Why Partner With EGI</div>
                <div className="mt-2 text-2xl font-extrabold leading-tight">Refinery-backed supply, export-minded execution.</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">Lot-by-lot CoA</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">Flexible terms</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">Fast response</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            {WHY_CARDS.map((c, index) => (
              <div
                key={c.title}
                className={`group relative rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all ${
                  index === WHY_CARDS.length - 1 ? 'md:col-span-2' : ''
                }`}
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
      </div>
    </section>
  )
}
