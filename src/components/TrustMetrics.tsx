import { TRUST_METRICS } from '@/constants'

export default function TrustMetrics() {
  return (
    <section className="bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_METRICS.map(m => (
            <div key={m.label} className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-brand-600/20 p-2.5 ring-1 ring-brand-500/30">
                <m.icon size={22} className="text-brand-500" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{m.label}</div>
                <div className="text-xl font-extrabold text-white mt-0.5">{m.value}</div>
                <div className="text-sm text-slate-400">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
