import { Link } from 'react-router-dom'
import { Crown, Settings2, Wallet, ArrowRight, MessageCircle } from 'lucide-react'
import { BRAND } from '@/constants'

const LEADERS = [
  {
    name: 'Adam Harish Abdurrahman',
    role: 'Chief Executive Officer (CEO)',
    short: 'CEO',
    icon: Crown,
    photo: '/team/CEO-adha.jpeg',
    bg: '#5A0908',
    desc: 'Leads the company strategy, global partnerships, and export business development.',
    accent: 'from-brand-500 to-brand-700 shadow-brand-500/30',
    ring: 'ring-brand-500/30',
  },
  {
    name: 'Rizky Pangestu',
    role: 'Chief Operating Officer (COO)',
    short: 'COO',
    icon: Settings2,
    photo: '/team/COO-iky.jpeg',
    bg: '#FFFFFF',
    desc: 'Manages daily operations, sourcing, quality control, and logistics coordination.',
    accent: 'from-slate-600 to-slate-800 shadow-slate-500/30',
    ring: 'ring-slate-300',
  },
  {
    name: 'Muhammad Ragil Wicaksono',
    role: 'Chief Financial Officer (CFO)',
    short: 'CFO',
    icon: Wallet,
    photo: '/team/CFO-Ragil.jpeg',
    bg: '#EDF1F2',
    desc: 'Manages finance, pricing, payments, and export transaction administration.',
    accent: 'from-gold-500 to-amber-600 shadow-gold-500/30',
    ring: 'ring-gold-500/30',
  },
] as const

function LeaderCard({ index }: { index: number }) {
  const leader = LEADERS[index]
  return (
    <div
      className={`relative rounded-2xl bg-white p-6 text-center ring-1 ${leader.ring} shadow-lg hover:shadow-xl transition-shadow`}
    >
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
        {leader.short}
      </span>
      <div
        className={`mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${leader.accent} shadow-lg`}
      >
        <leader.icon size={26} className="text-white" />
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-slate-900">{leader.name}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-700">{leader.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{leader.desc}</p>
    </div>
  )
}

export default function OrganizationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-400 ring-1 ring-brand-500/30">
              Our Organization
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Corporate Organizational Structure
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              {BRAND.name} — led by our CEO and supported by the COO and CFO
              for solid operations and finance.
            </p>
          </div>
        </div>
      </section>

      {/* Org Chart */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-brand-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 ring-1 ring-brand-500/20">
              Organization Chart
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Leadership Structure
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              A lean structure for fast decision-making and responsive export
              coordination.
            </p>
          </div>

          {/* Tree */}
          <div className="mt-12 flex flex-col items-center">
            {/* CEO node */}
            <div className="w-full max-w-sm">
              <LeaderCard index={0} />
            </div>

            {/* Connector: vertical stem */}
            <div className="h-10 w-px bg-slate-300" aria-hidden="true" />

            {/* Connector: horizontal branch (desktop) */}
            <div className="relative hidden w-full max-w-2xl sm:block" aria-hidden="true">
              <div className="mx-12 h-px bg-slate-300" />
              <div className="absolute left-12 top-0 h-8 w-px -translate-x-1/2 bg-slate-300" />
              <div className="absolute right-12 top-0 h-8 w-px translate-x-1/2 bg-slate-300" />
            </div>
            {/* Connector: vertical (mobile) */}
            <div className="h-8 w-px bg-slate-300 sm:hidden" aria-hidden="true" />

            {/* Branch nodes */}
            <div className="grid w-full max-w-2xl gap-6 pt-0 sm:grid-cols-2 sm:gap-8 sm:pt-8">
              <LeaderCard index={1} />
              <LeaderCard index={2} />
            </div>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-gold-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-600 ring-1 ring-gold-500/20">
              Our Leaders
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Leadership Photos
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              The leadership team driving {BRAND.name} toward trusted global
              export partnerships.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERS.map((leader) => (
              <div
                key={leader.name}
                className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-xl transition-shadow"
              >
                {/* Photo — full vertical, no crop, bg follows photo backdrop */}
                <div className="relative aspect-[5/6] overflow-hidden" style={{ backgroundColor: leader.bg }}>
                  <img
                    src={leader.photo}
                    alt={`${leader.name} — ${leader.role}`}
                    className="h-full w-full object-contain object-bottom"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
                    {leader.short}
                  </span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-extrabold text-slate-900">{leader.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-700">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-slate-300"
            >
              <ArrowRight size={20} />
              About the Company
            </Link>
            <Link
              to="/request-a-quote"
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              <MessageCircle size={20} className="fill-white/20" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
