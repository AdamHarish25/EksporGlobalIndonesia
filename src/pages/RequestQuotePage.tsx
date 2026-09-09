import { useState } from 'react'
import {
  MessageCircle, Send, CheckCircle2,
} from 'lucide-react'
import { CONTACT } from '@/constants'
import { PRODUCTS } from '@/constants/products'

const INCOTERMS = ['FOB', 'Other']

interface FormState {
  company: string
  country: string
  contact: string
  email: string
  phone: string
  product: string
  specification: string
  quantity: string
  unit: string
  packaging: string
  destinationCountry: string
  destinationPort: string
  incoterm: string
  privateLabel: string
  targetPrice: string
  additionalRequirements: string
}

const INITIAL_FORM: FormState = {
  company: '',
  country: '',
  contact: '',
  email: '',
  phone: '',
  product: '',
  specification: '',
  quantity: '',
  unit: '',
  packaging: '',
  destinationCountry: '',
  destinationPort: '',
  incoterm: 'FOB',
  privateLabel: 'No',
  targetPrice: '',
  additionalRequirements: '',
}

const UNITS = ['MT (Metric Tons)', 'KG', 'Liters', 'Cartons', 'Containers', 'Other']

export default function RequestQuotePage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.company.trim()) newErrors.company = 'Company name is required'
    if (!form.country.trim()) newErrors.country = 'Country is required'
    if (!form.contact.trim()) newErrors.contact = 'Contact name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address'
    if (!form.product.trim()) newErrors.product = 'Product is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const body = [
      '=== COMPANY INFORMATION ===',
      `Company: ${form.company}`,
      `Country: ${form.country}`,
      `Contact: ${form.contact}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      '',
      '=== PRODUCT REQUIREMENTS ===',
      `Product: ${form.product}`,
      `Specification: ${form.specification}`,
      `Quantity: ${form.quantity} ${form.unit}`,
      `Packaging: ${form.packaging}`,
      `Destination Country: ${form.destinationCountry}`,
      `Destination Port: ${form.destinationPort}`,
      `Incoterm: ${form.incoterm}`,
      `Private Label: ${form.privateLabel}`,
      `Target Price: ${form.targetPrice}`,
      `Additional Requirements: ${form.additionalRequirements}`,
    ].join('\n')

    const subject = `[Quote Request] ${form.company} - ${form.product} - ${form.country}`

    window.open(
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    )
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Request a Quote
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Get a Detailed Quotation
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Tell us your requirements and we will provide a comprehensive quote within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="rounded-2xl bg-brand-50 ring-1 ring-brand-200 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} className="text-brand-600" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold text-slate-900">Quote Request Sent</h3>
                <p className="mt-2 text-slate-600">
                  Your quote request has been submitted via email. We will review your requirements and respond within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(INITIAL_FORM) }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl ring-1 ring-slate-200 bg-white p-6 lg:p-8 shadow-sm">
                {/* Company Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4">Company Information</h3>
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name *</label>
                        <input name="company" value={form.company} onChange={handleChange} required placeholder="Your company name" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.company ? 'border-red-400' : 'border-slate-200'}`} />
                        {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Country *</label>
                        <input name="country" value={form.country} onChange={handleChange} required placeholder="e.g., Saudi Arabia, UAE" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.country ? 'border-red-400' : 'border-slate-200'}`} />
                        {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Name *</label>
                      <input name="contact" value={form.contact} onChange={handleChange} required placeholder="Full name" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.contact ? 'border-red-400' : 'border-slate-200'}`} />
                      {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="email@company.com" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.email ? 'border-red-400' : 'border-slate-200'}`} />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+966 ..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4">Product Requirements</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Product *</label>
                      <input
                        type="text"
                        name="product"
                        value={form.product}
                        onChange={handleChange}
                        required
                        list="products"
                        placeholder="Type or select a product..."
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.product ? 'border-red-400' : 'border-slate-200'}`}
                      />
                      <datalist id="products">
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.name} />
                        ))}
                        <option value="Custom Product" />
                      </datalist>
                      {errors.product && <p className="mt-1 text-xs text-red-500">{errors.product}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Specification</label>
                      <input name="specification" value={form.specification} onChange={handleChange} placeholder="Grade, quality, standards..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Quantity</label>
                        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g., 20" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Unit</label>
                        <select name="unit" value={form.unit} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500">
                          <option value="">Select unit</option>
                          {UNITS.map(u => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Packaging</label>
                        <input name="packaging" value={form.packaging} onChange={handleChange} placeholder="e.g., 1L PET, Bulk" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Destination Country</label>
                        <input name="destinationCountry" value={form.destinationCountry} onChange={handleChange} placeholder="e.g., Saudi Arabia" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Destination Port</label>
                        <input name="destinationPort" value={form.destinationPort} onChange={handleChange} placeholder="e.g., Jeddah Islamic Port" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Incoterm</label>
                        <div className="flex gap-3 mt-2">
                          {INCOTERMS.map(inc => (
                            <label key={inc} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="incoterm"
                                value={inc}
                                checked={form.incoterm === inc}
                                onChange={handleChange}
                                className="w-4 h-4 text-brand-600 border-slate-300 focus:ring-brand-500"
                              />
                              <span className="text-sm text-slate-700">{inc}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Private Label</label>
                        <select name="privateLabel" value={form.privateLabel} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500">
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                          <option value="Discuss">Discuss</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Target Price</label>
                        <input name="targetPrice" value={form.targetPrice} onChange={handleChange} placeholder="e.g., USD 1,200/MT" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Additional Requirements</label>
                      <textarea name="additionalRequirements" value={form.additionalRequirements} onChange={handleChange} rows={3} placeholder="Any other requirements, certifications, or special instructions..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Send size={18} />
                  Send Quote Request
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  Your quote request will be sent via email to {CONTACT.email}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
