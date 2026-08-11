import { Package, Thermometer, Palette, Beaker } from 'lucide-react'
import { PRODUCT_SPECS, PACKAGING_OPTIONS, HS_CODE } from '@/constants'

export default function FeaturedProduct() {
  return (
    <section id="products" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span
            id="specs"
            className="inline-block rounded-full bg-brand-50 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-200/50"
          >
            Featured Product
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Refined, Bleached &amp; Deodorized (RBD) Palm Olein
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Premium cooking oil grade suitable for frying, cooking, and food manufacturing. Available in CP8 &amp; CP10 to match
            your market requirements.
          </p>
          <div className="mt-4 inline-flex items-center gap-3 rounded-lg bg-slate-900 text-white px-5 py-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">HS Code</span>
            <span className="text-xl font-black">{HS_CODE}</span>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 rounded-2xl ring-1 ring-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-brand-50 border-b border-slate-200 flex items-center gap-3">
              <Beaker size={20} className="text-brand-700" />
              <h3 className="font-bold text-slate-900">Technical Specifications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-6 py-3 font-bold uppercase tracking-wider text-xs">Parameter</th>
                    <th className="text-left px-6 py-3 font-bold uppercase tracking-wider text-xs text-brand-800">CP8</th>
                    <th className="text-left px-6 py-3 font-bold uppercase tracking-wider text-xs text-brand-800">CP10</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PRODUCT_SPECS.map((s, i) => (
                    <tr key={s.param} className={i % 2 ? 'bg-slate-50/50' : ''}>
                      <td className="px-6 py-3.5 font-medium text-slate-700">{s.param}</td>
                      <td className="px-6 py-3.5 font-semibold text-slate-900">{s.cp8}</td>
                      <td className="px-6 py-3.5 font-semibold text-slate-900">{s.cp10}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <Palette size={14} />
              *Values typical of production. Final CoA issued per lot.
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Package size={20} className="text-brand-700" />
              Available Packaging
            </h3>
            <div className="space-y-3">
              {PACKAGING_OPTIONS.map(p => (
                <div
                  key={p.size}
                  className="group rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all p-4 bg-white flex gap-4 items-center"
                >
                  <div className="shrink-0 rounded-xl bg-gradient-to-br from-brand-50 to-gold-400/20 p-3 ring-1 ring-brand-100 group-hover:ring-brand-300 transition-all">
                    <p.icon size={24} className="text-brand-700" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900">{p.size}</div>
                    <div className="text-sm font-medium text-brand-700 mt-0.5">{p.pack}</div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Thermometer size={12} />
                      {p.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
