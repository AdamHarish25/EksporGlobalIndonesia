import { Link } from 'react-router-dom'
import {
  MapPin, Phone, Mail, Users, Globe,
  ShieldCheck, Handshake, MessageCircle, ArrowRight,
} from 'lucide-react'
import { BRAND, CONTACT } from '@/constants'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              About Us
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              {BRAND.name}
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              {BRAND.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
                Our Story
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Connecting Indonesia to the World
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Export Global Indonesia is an Indonesia-based B2B sourcing and export partner connecting international buyers with quality Indonesian products. We specialize in palm cooking oil, coconut oil, and coconut shell charcoal briquettes.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Our mission is to provide reliable, transparent, and efficient export services. From sourcing to documentation to shipment, we coordinate every step so international buyers can access Indonesian products with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/request-a-quote"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle size={20} className="fill-white/20" />
                  Get in Touch
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors"
                >
                  <ArrowRight size={20} />
                  View Products
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
              <img src="/refinery.jpg" alt="Export Global Indonesia operations" className="h-[28rem] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">Indonesia-Based Export Partner</div>
                <div className="mt-2 text-xl font-extrabold leading-tight">Connecting Indonesia to the World</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Reliable B2B Sourcing from Indonesia
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              To provide international buyers with reliable access to quality Indonesian products through transparent communication, efficient sourcing, and professional export coordination.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Our Values
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              What We Stand For
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Transparency', desc: 'Clear product information, quotation, and transaction requirements.' },
              { icon: Handshake, title: 'Reliability', desc: 'Consistent supply and professional export coordination.' },
              { icon: Globe, title: 'Global Reach', desc: 'Serving buyers across Middle East, GCC, Asia Pacific, and beyond.' },
              { icon: Users, title: 'Partnership', desc: 'Building long-term B2B relationships based on trust.' },
            ].map(v => (
              <div key={v.title} className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 mx-auto group-hover:scale-105 transition-transform">
                  <v.icon size={26} className="text-white" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-slate-900">{v.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Contact Us
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Get in Touch
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
              <MapPin size={20} className="text-brand-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{CONTACT.location}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
              <Users size={20} className="text-brand-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Director</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{CONTACT.directorName}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
              <Phone size={20} className="text-brand-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">WhatsApp</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{CONTACT.whatsAppNumber}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
              <Mail size={20} className="text-brand-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</div>
                <div className="mt-1 text-sm font-semibold text-slate-900 break-all">{CONTACT.email}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
