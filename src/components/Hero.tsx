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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs sm:text-sm font-semibold text-brand-200 backdrop-blur-sm">
            {BRAND.heroBadge}
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02]">
            Reliable Bulk Supplier of{' '}
            <span className="text-brand-300">Premium RBD Palm Olein</span> &amp; Cooking Oil
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
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
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors backdrop-blur-sm"
            >
              <Download size={20} />
              Download Spec Sheet (PDF)
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500" /> FOB Tanjung Priok / Belawan
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" /> L/C at Sight • T/T Accepted
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-4">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/25 ring-1 ring-white/10 bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
              <img
                src="/cp8.jpg"
                alt="RBD Palm Olein CP8"
                className="h-[28rem] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/10">
                    CP8
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/10">
                    CP10
                  </span>
                  <span className="inline-flex items-center rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-100 backdrop-blur-sm ring-1 ring-brand-400/20">
                    100% Indonesian Origin
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 max-w-md">
                  {SPEC_HIGHLIGHTS.map(s => (
                    <div key={s.k} className="rounded-2xl bg-white/92 backdrop-blur p-3 text-slate-900">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/80 font-bold">{s.k}</div>
                      <div className="text-white font-extrabold text-lg mt-0.5">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-sm">
                <img src="/refinery.jpg" alt="Refinery and storage tanks" className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">Production</div>
                  <div className="mt-1 font-bold text-white">Refinery-backed supply</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-sm">
                <img src="/loadingPort.jpg" alt="Loading port and export terminal" className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">Export</div>
                  <div className="mt-1 font-bold text-white">Tanjung Priok / Belawan gateway</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 -left-5 bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 px-5 py-4 hidden sm:block">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">HS Code</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{HS_CODE}</div>
          </div>
          <div className="absolute -top-5 -right-5 bg-gold-500 rounded-2xl shadow-xl px-4 py-3 hidden sm:block">
            <div className="text-xs text-white/90 font-bold uppercase tracking-wide">Export Ready</div>
            <div className="text-sm font-black text-white">FOB / CIF</div>
          </div>
        </div>
      </div>
    </section>
  )
}
