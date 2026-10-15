import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Factory, MapPin, Award, Mail, Phone, Globe,
  ArrowRight, Handshake, CheckCircle2,
} from 'lucide-react'
import { isSupabaseConfigured } from '@/lib/supabase'
import { subscribeShared } from '@/lib/realtime'
import {
  fetchSupplierDirectory, getSupplierPhotoPublicUrl,
  type SupplierDirectoryRow,
} from '@/lib/suppliersDb'

const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, '')}`

export default function SupplyPartnersPage() {
  const [partners, setPartners] = useState<SupplierDirectoryRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    let cancelled = false
    const load = async () => {
      try {
        const rows = await fetchSupplierDirectory()
        if (!cancelled) setPartners(rows)
      } catch {
        // Tetap tampil (empty state + CTA) walau DB tak terjangkau.
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    const unsubscribe = subscribeShared(
      'supplier-registrations-changes',
      [{ event: '*', schema: 'public', table: 'supplier_registrations' }],
      load,
    )
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              <Handshake size={13} className="mr-1.5" /> Partner Network
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Our Supply Partners
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Verified Indonesian manufacturers and suppliers in the Harvestora Global Indonesia network.
            </p>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center text-sm text-slate-500">Loading partners...</div>
          ) : partners.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center rounded-2xl bg-white ring-1 ring-slate-200 p-10 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto">
                <Factory size={30} className="text-brand-600" />
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-slate-900">Partner directory opening soon</h2>
              <p className="mt-2 text-slate-600">
                We are curating our first batch of verified supply partners.
                Supplier? Register now to be listed here.
              </p>
              <Link
                to="/for-suppliers"
                className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
              >
                Become Our Partner <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <>
              <p className="text-center text-sm text-slate-500">
                {partners.length} verified partner{partners.length > 1 ? 's' : ''} · contact them directly or request a consolidated quote.
              </p>
              <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map(p => {
                  const photo = p.product_photos?.[0]
                  return (
                    <article key={p.id} className="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                      {photo ? (
                        <div className="relative h-48 overflow-hidden">
                          <img src={getSupplierPhotoPublicUrl(photo)} alt={`${p.product} — ${p.company_name}`} className="h-full w-full object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-900">
                            <CheckCircle2 size={13} className="text-brand-600" /> Verified Partner
                          </span>
                        </div>
                      ) : (
                        <div className="h-28 bg-gradient-to-br from-brand-500/15 to-gold-500/10 flex items-center justify-center">
                          <Factory size={30} className="text-brand-600/50" />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="text-lg font-extrabold text-slate-900">
                          {p.company_name}
                          {p.company_type && <span className="ml-1.5 text-xs font-semibold text-slate-400">{p.company_type}</span>}
                        </h2>
                        {p.factory_location && (
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin size={13} /> {p.factory_location}
                          </p>
                        )}
                        <p className="mt-3 text-sm font-bold text-brand-700">{p.product}</p>
                        {p.product_details && (
                          <p className="mt-1 text-sm text-slate-600 leading-relaxed line-clamp-3">{p.product_details}</p>
                        )}
                        <div className="mt-3 space-y-1 text-xs text-slate-500">
                          {p.production_capacity && <p>Capacity: <span className="font-semibold text-slate-700">{p.production_capacity}</span></p>}
                          {p.moq && <p>MOQ: <span className="font-semibold text-slate-700">{p.moq}</span></p>}
                        </div>
                        {p.certifications && (
                          <p className="mt-3 flex items-start gap-1.5 text-xs text-slate-600">
                            <Award size={14} className="text-gold-600 shrink-0 mt-0.5" />
                            <span>{p.certifications}</span>
                          </p>
                        )}
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm">
                          <p className="text-xs font-semibold text-slate-500">Official Contact — {p.contact_name}</p>
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={`mailto:${p.contact_email}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-700"
                            >
                              <Mail size={14} /> Email
                            </a>
                            {p.contact_phone && (
                              <a
                                href={waLink(p.contact_phone)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-700"
                              >
                                <Phone size={14} /> {p.contact_phone}
                              </a>
                            )}
                            {p.website && (
                              <a
                                href={p.website.startsWith('http') ? p.website : `https://${p.website}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-700"
                              >
                                <Globe size={14} /> Website
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </>
          )}

          {/* CTA */}
          <div className="mt-14 max-w-3xl mx-auto text-center rounded-2xl bg-slate-950 text-white p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Are you an Indonesian producer?</h2>
            <p className="mt-2 text-slate-300">Join the network and get listed in this directory after verification.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/for-suppliers"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25"
              >
                Become Our Partner <ArrowRight size={16} />
              </Link>
              <Link
                to="/request-a-quote"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
