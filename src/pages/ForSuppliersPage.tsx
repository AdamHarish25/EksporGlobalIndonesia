import { useState } from 'react'
import {
  Factory, Send, CheckCircle2, Upload, X,
} from 'lucide-react'
import { CONTACT, LINKS } from '@/constants'
import { isSupabaseConfigured } from '@/lib/supabase'
import {
  submitSupplierRegistration, uploadSupplierPhotos,
  MAX_PHOTOS, MAX_PHOTO_BYTES,
} from '@/lib/suppliersDb'

interface SupplierFormState {
  companyName: string
  companyType: string
  factoryLocation: string
  product: string
  productDetails: string
  productionCapacity: string
  moq: string
  packaging: string
  certifications: string
  exportExperience: string
  website: string
  contactName: string
  contactEmail: string
  contactPhone: string
  message: string
}

const INITIAL_FORM: SupplierFormState = {
  companyName: '',
  companyType: '',
  factoryLocation: '',
  product: '',
  productDetails: '',
  productionCapacity: '',
  moq: '',
  packaging: '',
  certifications: '',
  exportExperience: '',
  website: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  message: '',
}

const COMPANY_TYPES = ['PT', 'CV', 'UD', 'Koperasi', 'Lainnya']

const BENEFITS = [
  'Access to international B2B buyers',
  'Professional export coordination',
  'Documentation and logistics support',
  'Long-term partnership opportunities',
  'Market exposure to China & wider Asia',
]

export default function ForSuppliersPage() {
  const [form, setForm] = useState<SupplierFormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof SupplierFormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sentVia, setSentVia] = useState<'database' | 'email'>('database')
  const [submitting, setSubmitting] = useState(false)
  const [photos, setPhotos] = useState<File[]>([])
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('') // anti-spam: manusia tidak mengisi ini

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof SupplierFormState]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SupplierFormState, string>> = {}
    if (!form.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!form.factoryLocation.trim()) newErrors.factoryLocation = 'Factory location is required'
    if (!form.product.trim()) newErrors.product = 'Product is required'
    if (!form.contactName.trim()) newErrors.contactName = 'Contact name is required'
    if (!form.contactEmail.trim()) newErrors.contactEmail = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) newErrors.contactEmail = 'Invalid email address'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePhotos = (files: FileList | null) => {
    if (!files) return
    setPhotoError(null)
    const next = [...photos]
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        setPhotoError(`"${file.name}" bukan file gambar.`)
        continue
      }
      if (file.size > MAX_PHOTO_BYTES) {
        setPhotoError(`"${file.name}" melebihi 5 MB.`)
        continue
      }
      if (next.length >= MAX_PHOTOS) {
        setPhotoError(`Maksimal ${MAX_PHOTOS} foto.`)
        break
      }
      next.push(file)
    }
    setPhotos(next)
  }

  const openMailtoFallback = () => {
    const body = [
      `Company Name: ${form.companyName} (${form.companyType})`,
      `Factory Location: ${form.factoryLocation}`,
      `Product: ${form.product}`,
      `Product Details: ${form.productDetails}`,
      `Production Capacity: ${form.productionCapacity}`,
      `MOQ: ${form.moq}`,
      `Packaging: ${form.packaging}`,
      `Certifications: ${form.certifications}`,
      `Export Experience: ${form.exportExperience}`,
      `Website: ${form.website}`,
      `Contact Name: ${form.contactName}`,
      `Contact Email: ${form.contactEmail}`,
      `Contact Phone: ${form.contactPhone}`,
      `Message: ${form.message}`,
    ].join('\n')

    window.open(
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(`[Supplier Registration] ${form.companyName}`)}&body=${encodeURIComponent(body)}`,
      '_blank'
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || submitting) return

    // Honeypot terisi → bot: anggap sukses tanpa menyimpan apa pun.
    if (honeypot.trim() !== '') {
      setSentVia('database')
      setSubmitted(true)
      return
    }

    // Tanpa Supabase → fallback email seperti sebelumnya.
    if (!isSupabaseConfigured) {
      openMailtoFallback()
      setSentVia('email')
      setSubmitted(true)
      return
    }

    setSubmitting(true)
    try {
      const paths = photos.length > 0 ? await uploadSupplierPhotos(photos) : []
      await submitSupplierRegistration(
        {
          companyName: form.companyName,
          companyType: form.companyType,
          factoryLocation: form.factoryLocation,
          product: form.product,
          productDetails: form.productDetails,
          productionCapacity: form.productionCapacity,
          moq: form.moq,
          packaging: form.packaging,
          certifications: form.certifications,
          exportExperience: form.exportExperience,
          website: form.website,
          contactName: form.contactName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          message: form.message,
        },
        paths,
      )
      setSentVia('database')
      setSubmitted(true)
    } catch {
      // DB/upload gagal → jangan hilangkan data: kirim via email.
      openMailtoFallback()
      setSentVia('email')
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setForm(INITIAL_FORM)
    setPhotos([])
    setPhotoError(null)
    setHoneypot('')
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              For Suppliers
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Partner with Harvestora Global Indonesia
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Expand your market reach through our international B2B buyer network.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-500/10 text-gold-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-gold-500/20">
              Why Partner With Us
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Supplier Benefits
            </h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto space-y-3">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
                <CheckCircle2 size={18} className="text-brand-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-brand-500/10 text-brand-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/20">
              Supplier Registration
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Register as a Supplier
            </h2>
          </div>
          <div className="mt-12 max-w-2xl mx-auto">
            {submitted ? (
              <div className="rounded-2xl bg-brand-50 ring-1 ring-brand-200 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} className="text-brand-600" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold text-slate-900">Registration Submitted</h3>
                <p className="mt-2 text-slate-600">
                  Thank you for your interest. We will review your registration and get back to you shortly.
                  {sentVia === 'email' && (
                    <span className="block mt-1 text-sm text-slate-500">
                      (Sent via email fallback — please complete sending in your mail app.)
                    </span>
                  )}
                </p>
                <button
                  onClick={resetForm}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Submit Another Registration
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl ring-1 ring-slate-200 bg-white p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                    <Factory size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">Company Information</h3>
                </div>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-[1fr_160px] gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name *</label>
                      <input name="companyName" value={form.companyName} onChange={handleChange} required placeholder="Your company name" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.companyName ? 'border-red-400' : 'border-slate-200'}`} />
                      {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
                      <select name="companyType" value={form.companyType} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500">
                        <option value="">Select...</option>
                        {COMPANY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Factory Location *</label>
                    <input name="factoryLocation" value={form.factoryLocation} onChange={handleChange} required placeholder="City, Province, Indonesia" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.factoryLocation ? 'border-red-400' : 'border-slate-200'}`} />
                    {errors.factoryLocation && <p className="mt-1 text-xs text-red-500">{errors.factoryLocation}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Product *</label>
                    <input name="product" value={form.product} onChange={handleChange} required placeholder="e.g., Shallots, Palm Sugar, Charcoal Briquettes" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.product ? 'border-red-400' : 'border-slate-200'}`} />
                    {errors.product && <p className="mt-1 text-xs text-red-500">{errors.product}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Product Details</label>
                    <textarea name="productDetails" value={form.productDetails} onChange={handleChange} rows={3} placeholder="Specs, grades, variants, uniqueness of your product..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Production Capacity</label>
                      <input name="productionCapacity" value={form.productionCapacity} onChange={handleChange} placeholder="e.g., 500 MT/month" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">MOQ</label>
                      <input name="moq" value={form.moq} onChange={handleChange} placeholder="e.g., 1×20ft FCL" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Packaging Options</label>
                    <input name="packaging" value={form.packaging} onChange={handleChange} placeholder="e.g., Mesh bag, Retail pouch, Export carton" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Certifications</label>
                    <input name="certifications" value={form.certifications} onChange={handleChange} placeholder="e.g., ISO 22000, HACCP, Halal, SNI" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Export Experience</label>
                    <input name="exportExperience" value={form.exportExperience} onChange={handleChange} placeholder="e.g., Exported to China, Malaysia, Vietnam" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Website</label>
                    <input name="website" value={form.website} onChange={handleChange} placeholder="https://your-company.com" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Product Photos <span className="font-normal text-slate-400">(max {MAX_PHOTOS}, 5 MB each)</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 hover:border-brand-500 hover:text-brand-700 cursor-pointer">
                      <Upload size={16} />
                      {photos.length > 0 ? `${photos.length} photo(s) selected` : 'Choose product photos...'}
                      <input type="file" accept="image/*" multiple className="hidden" onChange={e => handlePhotos(e.target.files)} />
                    </label>
                    {photoError && <p className="mt-1 text-xs text-red-500">{photoError}</p>}
                    {photos.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {photos.map((f, i) => (
                          <div key={`${f.name}-${i}`} className="relative group rounded-xl overflow-hidden ring-1 ring-slate-200">
                            <img src={URL.createObjectURL(f)} alt={f.name} className="h-20 w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setPhotos(prev => prev.filter((_, j) => j !== i))}
                              className="absolute top-1 right-1 p-1 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-4 mt-2">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Contact Information</h4>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Name *</label>
                    <input name="contactName" value={form.contactName} onChange={handleChange} required placeholder="Full name" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.contactName ? 'border-red-400' : 'border-slate-200'}`} />
                    {errors.contactName && <p className="mt-1 text-xs text-red-500">{errors.contactName}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
                      <input name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} required placeholder="email@company.com" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${errors.contactEmail ? 'border-red-400' : 'border-slate-200'}`} />
                      {errors.contactEmail && <p className="mt-1 text-xs text-red-500">{errors.contactEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                      <input name="contactPhone" value={form.contactPhone} onChange={handleChange} placeholder="+62 ..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Additional Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any additional information..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none" />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                  >
                    <Send size={18} />
                    {submitting ? 'Submitting...' : 'Submit Registration'}
                  </button>
                  {/* Honeypot anti-spam: disembunyikan, manusia tidak mengisi */}
                  <input
                    type="text"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
