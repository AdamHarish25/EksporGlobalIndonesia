import React, { useState, type FormEvent } from 'react'
import {
  Mail, Phone, MapPin, User, Send, Building2,
  Plane, ShoppingBag, BarChart3,
} from 'lucide-react'
import {
  CONTACT, LINKS, BRAND, HS_CODE, SHIPPING_TERMS,
  FORM_PACKAGING_OPTIONS,
} from '@/constants'
import BrandLogo from '@/components/BrandLogo'
import type { InquiryFormState } from '@/types'

const EMPTY_FORM: InquiryFormState = {
  name: '',
  company: '',
  country: '',
  packaging: '',
  volume: '',
  message: '',
}

export default function Footer() {
  const [form, setForm] = useState<InquiryFormState>(EMPTY_FORM)

  const update = (field: keyof InquiryFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const buildMailtoBody = (data: InquiryFormState): string => {
    const orEmpty = (v: string) => (v.trim() ? v : '-')
    const signature = data.name || 'Prospective Buyer'
    const companyLine = data.company.trim() ? `— ${data.company}${data.country ? ` (${data.country})` : ''}` : ''

    return `Dear ${BRAND.name},

I am writing to request a quotation / FCO for RBD Palm Olein.

=============================
INQUIRY DETAILS
=============================
Full Name             : ${orEmpty(data.name)}
Company Name          : ${orEmpty(data.company)}
Destination Country   : ${orEmpty(data.country)}
Product Packaging     : ${orEmpty(data.packaging)}
Estimated Volume      : ${orEmpty(data.volume)}

Message / Requirements:
${orEmpty(data.message)}

=============================
CONTACT INFORMATION
=============================
Export Director: ${CONTACT.directorName}
Email          : ${CONTACT.email}
WhatsApp       : ${CONTACT.whatsAppNumber}
Website        : [Your Website]

Best regards,
${signature}
${companyLine}
`
  }

  const buildMailtoSubject = (data: InquiryFormState): string => {
    const companyOrName = data.company.trim() || data.name.trim() || 'New Inquiry'
    const country = data.country.trim() || 'Global'
    return `[RBD Palm Olein Inquiry] ${companyOrName} - ${country}`
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(buildMailtoSubject(form))
    const body = encodeURIComponent(buildMailtoBody(form))
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
  }

  return (
    <footer id="inquiry" className="relative pt-20 lg:pt-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl text-center mx-auto mb-14">
          <span className="inline-block rounded-full bg-brand-50 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-200/50">
            Request FCO / Quote
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Ready to Place Your Order?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Fill in your requirements and we&apos;ll respond within 24 hours with our best offer and Full Corporate Offer (FCO).
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT: Contact Card */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-brand-900 text-white p-7 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
                  <BrandLogo size={28} background={true} rounded={true} />
                </div>
                <div>
                  <div className="text-lg font-extrabold">{BRAND.name}</div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">{BRAND.tagline}</div>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 ring-1 ring-white/10">
                    <User size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Export Director</div>
                    <div className="font-bold text-white">{CONTACT.directorName}</div>
                  </div>
                </div>
                <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 ring-1 ring-white/10 group-hover:bg-brand-500/30 transition-colors">
                    <Mail size={18} className="text-brand-300" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email</div>
                    <div className="font-semibold text-white break-all group-hover:text-brand-300 transition-colors">{CONTACT.email}</div>
                  </div>
                </a>
                <a href={LINKS.whatsAppDirect} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-brand-600/30 flex items-center justify-center shrink-0 ring-1 ring-brand-500/30 group-hover:bg-brand-500/40 transition-colors">
                    <Phone size={18} className="text-brand-300" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">WhatsApp</div>
                    <div className="font-semibold text-white group-hover:text-brand-300 transition-colors">{CONTACT.whatsAppNumber}</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 ring-1 ring-white/10">
                    <MapPin size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Location</div>
                    <div className="font-bold text-white">{CONTACT.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-bold text-slate-900 mb-3">Fast Response</div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> Quote within 24 hours (Mon–Fri)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> FCO draft &amp; sample LOI ready
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> WhatsApp reply usually under 2h
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Inquiry Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-brand-50 ring-1 ring-brand-200 flex items-center justify-center">
                  <Send size={22} className="text-brand-700" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Inquiry Form</h3>
                  <p className="text-sm text-slate-500">
                    Sends directly to the Export Director&apos;s inbox via{' '}
                    <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-brand-700">mailto:</code>
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <User size={12} /> Full Name
                  </span>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <Building2 size={12} /> Company Name
                  </span>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => update('company', e.target.value)}
                    placeholder="e.g. Global Trading Ltd"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <Plane size={12} /> Target Destination Country
                  </span>
                  <input
                    type="text"
                    value={form.country}
                    onChange={e => update('country', e.target.value)}
                    placeholder="e.g. India, Bangladesh, Philippines..."
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <ShoppingBag size={12} /> Product Packaging
                  </span>
                  <select
                    value={form.packaging}
                    onChange={e => update('packaging', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  >
                    {FORM_PACKAGING_OPTIONS.map(opt => (
                      <option key={opt.value || 'default'} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <BarChart3 size={12} /> Estimated Volume
                  </span>
                  <input
                    type="text"
                    value={form.volume}
                    onChange={e => update('volume', e.target.value)}
                    placeholder="e.g. 5 x 20ft FCL (approx. 100 MT) / 100 MT trial order..."
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <Mail size={12} /> Message / Requirements
                  </span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Tell us more: desired terms (FOB/CIF), payment term preference (L/C or T/T), target delivery date, special labeling, etc..."
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors resize-y"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center w-full justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Send size={18} />
                  Send Inquiry
                </button>
                <p className="text-xs text-slate-500">
                  ✉️ This will open your default email app with pre-filled subject &amp; body. You can review and edit before sending.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Legal Footer Bar */}
      <div className="border-t border-slate-200 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-medium">
            <span>{BRAND.name}</span>
            <span className="text-slate-600">•</span>
            <span>HS Code {HS_CODE}</span>
            <span className="text-slate-600">•</span>
            <span>{SHIPPING_TERMS}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
