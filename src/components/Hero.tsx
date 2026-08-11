import { MessageCircle, Download } from 'lucide-react'
import { BRAND, LINKS, HS_CODE } from '@/constants'

const SPEC_HIGHLIGHTS: Array<{ k: string; v: string }> = [
  { k: 'FFA', v: 'Max 0.1%' },
  { k: 'IV CP8', v: 'Min 58' },
  { k: 'Color', v: 'Red 3.0 Max' },
  { k: 'Melt Pt', v: '24°C Max' },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-amber-50">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #15803d 2px, transparent 2px), radial-gradient(circle at 80% 60%, #eab308 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-100 px-4 py-1.5 text-xs sm:text-sm font-semibold text-brand-800 shadow-sm">
            {BRAND.heroBadge}
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Reliable Bulk Supplier of{' '}
            <span className="text-brand-700">Premium RBD Palm Olein</span> &amp; Cooking Oil
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            Delivering top-grade refined palm cooking oil (CP8 &amp; CP10) directly from Indonesia&apos;s finest refineries to
            international markets. Flexible FOB/CIF terms and guaranteed quality compliance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={LINKS.whatsAppGeneric}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="fill-white/20" />
              Get Instant Offer (WhatsApp)
            </a>
            <a
              href={LINKS.specSheet}
              download
              className="inline-flex items-center gap-2.5 rounded-xl border-2 border-slate-300 hover:border-brand-600 hover:text-brand-700 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors"
            >
              <Download size={20} />
              Download Spec Sheet (PDF)
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500" /> FOB Tanjung Priok / Belawan
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" /> L/C at Sight • T/T Accepted
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/60">
            <div className="aspect-[4/3] bg-gradient-to-br from-brand-700 via-brand-600 to-gold-500 p-8 flex flex-col justify-between relative">
              <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-gold-400/30 blur-2xl" />
              <div className="relative">
                <div className="text-white/70 text-xs font-bold uppercase tracking-[0.18em]">Premium Cooking Oil</div>
                <div className="mt-2 text-white font-black text-3xl">RBD Palm Olein</div>
                <div className="mt-1 flex gap-2">
                  <span className="inline-block rounded-md bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold text-white">CP8</span>
                  <span className="inline-block rounded-md bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold text-white">CP10</span>
                </div>
              </div>
              <div className="relative grid grid-cols-2 gap-3">
                {SPEC_HIGHLIGHTS.map(s => (
                  <div key={s.k} className="rounded-xl bg-white/95 backdrop-blur p-3">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{s.k}</div>
                    <div className="text-brand-800 font-extrabold text-lg mt-0.5">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 px-5 py-4 hidden sm:block">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">HS Code</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{HS_CODE}</div>
          </div>
          <div className="absolute -top-5 -right-5 bg-gold-500 rounded-2xl shadow-xl px-4 py-3 hidden sm:block">
            <div className="text-xs text-white/90 font-bold uppercase tracking-wide">100%</div>
            <div className="text-sm font-black text-white">Indonesian Origin</div>
          </div>
        </div>
      </div>
    </section>
  )
}
