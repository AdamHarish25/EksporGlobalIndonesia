import { Ship, Container, FileText, Anchor, Compass, Boxes } from 'lucide-react'
import { EXPORT_DOCUMENTS } from '@/constants'

export default function Logistics() {
  return (
    <section className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
            Export Logistics & Shipping
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Reliable Loading, Transparent Documentation
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Backed by Indonesia&apos;s major port network and streamlined export administration.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 p-6 hover:ring-brand-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center shrink-0">
                  <Anchor size={24} className="text-brand-400" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading Ports</div>
                  <h3 className="mt-1 text-xl font-extrabold text-white">Tanjung Priok &amp; Belawan</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Jakarta &amp; Medan — Indonesia&apos;s two primary export gateways in Java &amp; Sumatra Islands.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-md bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-brand-300 ring-1 ring-slate-700 flex items-center gap-1.5">
                      <Compass size={12} /> Tanjung Priok (Jakarta)
                    </span>
                    <span className="rounded-md bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-brand-300 ring-1 ring-slate-700 flex items-center gap-1.5">
                      <Compass size={12} /> Belawan (Medan)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 p-6 hover:ring-brand-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center shrink-0">
                  <Container size={24} className="text-gold-400" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Container Capacity</div>
                  <h3 className="mt-1 text-xl font-extrabold text-white flex items-baseline gap-2">
                    19.5 – 20 MT
                    <span className="text-sm font-semibold text-slate-400">per 20ft FCL</span>
                  </h3>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-slate-900/60 p-3 ring-1 ring-slate-700">
                      <Boxes size={16} className="mx-auto text-gold-400" />
                      <div className="mt-1 text-[10px] text-slate-400 font-semibold uppercase">20ft</div>
                      <div className="text-sm font-black">FCL</div>
                    </div>
                    <div className="rounded-lg bg-slate-900/60 p-3 ring-1 ring-slate-700">
                      <Ship size={16} className="mx-auto text-brand-400" />
                      <div className="mt-1 text-[10px] text-slate-400 font-semibold uppercase">Terms</div>
                      <div className="text-sm font-black">FOB / CIF</div>
                    </div>
                    <div className="rounded-lg bg-slate-900/60 p-3 ring-1 ring-slate-700">
                      <FileText size={16} className="mx-auto text-slate-300" />
                      <div className="mt-1 text-[10px] text-slate-400 font-semibold uppercase">Lead Time</div>
                      <div className="text-sm font-black">14-21 Days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center">
                <FileText size={24} className="text-brand-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Export Documentation</div>
                <h3 className="text-xl font-extrabold text-white">Complete Set Provided</h3>
              </div>
            </div>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {EXPORT_DOCUMENTS.map(d => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-lg bg-slate-900/40 ring-1 ring-slate-700/50 p-3 hover:ring-brand-500/40 transition-colors"
                >
                  <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" className="text-brand-400" fill="currentColor">
                      <path
                        d="M2 5 L4 7 L8 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-200">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
