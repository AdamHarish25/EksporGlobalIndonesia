import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Save, Upload } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { supabase } from '@/lib/supabase'
import {
  saveProduct, uploadProductImage,
  type ProductFormData, type SpecInput, type PackInput,
} from '@/lib/productsDb'

const SPEC_STATUSES = ['TARGET', 'VERIFIED', 'AVAILABLE']
const CATEGORY_COLORS = ['brand', 'gold', 'slate']

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const csvToArray = (s: string): string[] =>
  s.split(/[\n,]+/).map(x => x.trim()).filter(Boolean)

const arrayToCsv = (a: string[]): string => a.join(', ')

const EMPTY: ProductFormData = {
  slug: '', name: '', category: '', category_color: 'brand',
  short_description: '', description: '', applications: [],
  moq: 'Available upon request', supply_capacity: 'Subject to supplier confirmation',
  origin: 'Indonesia', image_url: '', gallery: [],
  incoterms: ['FOB'], destination_markets: ['Global'],
  documentation: [], certifications: [],
  private_label: false, status: 'draft',
  specs: [], packaging: [],
}

const inputCls =
  'w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 bg-white'

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
      <h2 className="text-base font-extrabold text-slate-900">{title}</h2>
      {desc && <p className="mt-1 text-xs text-slate-500">{desc}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export default function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = id === 'new' || !id
  const navigate = useNavigate()

  const [form, setForm] = useState<ProductFormData>(EMPTY)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  useEffect(() => {
    if (isNew || !id) return
    const load = async () => {
      setLoading(true)
      try {
        const [{ data: row, error: e1 }, { data: specs, error: e2 }, { data: packs, error: e3 }] =
          await Promise.all([
            supabase.from('products').select('*').eq('id', id).single(),
            supabase.from('product_specs').select('param,value,status,unit').eq('product_id', id).order('sort_order'),
            supabase.from('product_packaging').select('size,pack,detail').eq('product_id', id).order('sort_order'),
          ])
        if (e1 || !row) throw new Error(e1?.message ?? 'Produk tidak ditemukan')
        if (e2 || e3) throw new Error(e2?.message ?? e3?.message)
        setForm({
          id: row.id,
          slug: row.slug ?? '', name: row.name ?? '', category: row.category ?? '',
          category_color: row.category_color ?? 'brand',
          short_description: row.short_description ?? '', description: row.description ?? '',
          applications: row.applications ?? [],
          moq: row.moq ?? '', supply_capacity: row.supply_capacity ?? '', origin: row.origin ?? 'Indonesia',
          image_url: row.image_url ?? '', gallery: row.gallery ?? [],
          incoterms: row.incoterms ?? ['FOB'], destination_markets: row.destination_markets ?? ['Global'],
          documentation: row.documentation ?? [], certifications: row.certifications ?? [],
          private_label: Boolean(row.private_label), status: row.status ?? 'draft',
          specs: ((specs ?? []) as SpecInput[]).map(s => ({ ...s, status: s.status ?? 'TARGET', unit: s.unit ?? '' })),
          packaging: ((packs ?? []) as PackInput[]).map(p => ({ ...p, detail: p.detail ?? '' })),
        })
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Gagal memuat produk')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, isNew])

  const handleSave = async () => {
    setError(null)
    if (form.name.trim() === '') {
      setError('Nama produk wajib diisi.')
      return
    }
    const slug = form.slug.trim() === '' ? slugify(form.name) : slugify(form.slug)
    if (slug === '') {
      setError('Slug tidak valid.')
      return
    }
    setSaving(true)
    try {
      let imageUrl = form.image_url
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile, slug)
      }
      await saveProduct({ ...form, slug, image_url: imageUrl })
      navigate('/admin/products')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menyimpan')
      setSaving(false)
    }
  }

  const previewSrc = imageFile ? URL.createObjectURL(imageFile) : form.image_url

  if (loading) {
    return (
      <AdminLayout>
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-10 text-center text-sm text-slate-500">
          Memuat produk...
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/products" className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {isNew ? 'Produk Baru' : 'Ubah Produk'}
            </h1>
            <p className="mt-0.5 text-sm text-slate-600">
              Status <span className="font-bold">{form.status}</span> — yang published langsung live ke situs.
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
        >
          <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="space-y-6">
          <Section title="Info Dasar">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Produk *</label>
                <input value={form.name} onChange={e => {
                  const name = e.target.value
                  setForm(prev => ({ ...prev, name, slug: prev.slug === slugify(prev.name) || prev.slug === '' ? slugify(name) : prev.slug }))
                }} placeholder="Coconut Sugar" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Slug (URL)</label>
                <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="coconut-sugar" className={`${inputCls} font-mono`} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Kategori</label>
                <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="Natural Sweetener" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Warna Kategori</label>
                <select value={form.category_color} onChange={e => set('category_color', e.target.value)} className={inputCls}>
                  {CATEGORY_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Singkat</label>
              <input value={form.short_description} onChange={e => set('short_description', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Lengkap</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} className={inputCls} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">MOQ</label>
                <input value={form.moq} onChange={e => set('moq', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Kapasitas Suplai</label>
                <input value={form.supply_capacity} onChange={e => set('supply_capacity', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Origin</label>
                <input value={form.origin} onChange={e => set('origin', e.target.value)} className={inputCls} />
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
              <input type="checkbox" checked={form.private_label} onChange={e => set('private_label', e.target.checked)} className="h-4 w-4 accent-green-600" />
              Private label tersedia
            </label>
          </Section>

          <Section title="Spesifikasi" desc="Status: TARGET (target pasar) / VERIFIED (terverifikasi) / AVAILABLE (stok tersedia).">
            {form.specs.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1.4fr_auto_auto_auto] gap-2 items-center rounded-xl bg-slate-50 ring-1 ring-slate-100 p-2.5">
                <input value={s.param} onChange={e => set('specs', form.specs.map((x, j) => j === i ? { ...x, param: e.target.value } : x))} placeholder="Parameter" className={inputCls} />
                <input value={s.value} onChange={e => set('specs', form.specs.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="Nilai" className={inputCls} />
                <select value={s.status} onChange={e => set('specs', form.specs.map((x, j) => j === i ? { ...x, status: e.target.value } : x))} className={inputCls}>
                  {SPEC_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
                <input value={s.unit} onChange={e => set('specs', form.specs.map((x, j) => j === i ? { ...x, unit: e.target.value } : x))} placeholder="Unit" className={`${inputCls} sm:w-20`} />
                <button onClick={() => set('specs', form.specs.filter((_, j) => j !== i))} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600" title="Hapus baris">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button onClick={() => set('specs', [...form.specs, { param: '', value: '', status: 'TARGET', unit: '' }])} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-500 hover:text-brand-700">
              <Plus size={15} /> Tambah baris spec
            </button>
          </Section>

          <Section title="Kemasan (Packaging)">
            {form.packaging.map((p, i) => (
              <div key={i} className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center rounded-xl bg-slate-50 ring-1 ring-slate-100 p-2.5">
                <input value={p.size} onChange={e => set('packaging', form.packaging.map((x, j) => j === i ? { ...x, size: e.target.value } : x))} placeholder="Ukuran (cth. 25kg Sack)" className={inputCls} />
                <input value={p.pack} onChange={e => set('packaging', form.packaging.map((x, j) => j === i ? { ...x, pack: e.target.value } : x))} placeholder="Jenis pack" className={inputCls} />
                <input value={p.detail} onChange={e => set('packaging', form.packaging.map((x, j) => j === i ? { ...x, detail: e.target.value } : x))} placeholder="Detail" className={inputCls} />
                <button onClick={() => set('packaging', form.packaging.filter((_, j) => j !== i))} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600" title="Hapus baris">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button onClick={() => set('packaging', [...form.packaging, { size: '', pack: '', detail: '' }])} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-500 hover:text-brand-700">
              <Plus size={15} /> Tambah baris kemasan
            </button>
          </Section>

          <Section title="Daftar (List)" desc="Pisahkan dengan koma atau baris baru.">
            {([
              ['applications', 'Aplikasi'],
              ['incoterms', 'Incoterms'],
              ['destination_markets', 'Pasar Tujuan'],
              ['documentation', 'Dokumentasi'],
              ['certifications', 'Sertifikasi'],
              ['gallery', 'Galeri (URL gambar, pisahkan koma)'],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
                <textarea
                  value={arrayToCsv(form[key])}
                  onChange={e => set(key, csvToArray(e.target.value))}
                  rows={2}
                  className={`${inputCls} font-mono text-xs`}
                />
              </div>
            ))}
          </Section>
        </div>

        <div className="space-y-6 lg:sticky lg:top-32">
          <Section title="Publikasi">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className={inputCls}>
                <option value="draft">Draft (hanya editor)</option>
                <option value="published">Published (live ke situs)</option>
              </select>
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-sm">
              <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan produk'}
            </button>
            {!isNew && form.slug && (
              <Link to={`/products/${form.slug}`} target="_blank" className="block text-center text-xs font-semibold text-brand-700 hover:underline">
                Preview di situs ↗ {form.status === 'draft' ? '(hanya terlihat oleh editor)' : ''}
              </Link>
            )}
          </Section>

          <Section title="Foto Utama" desc="Format apa pun; tersimpan di Storage product-images.">
            {previewSrc ? (
              <img src={previewSrc} alt="" className="w-full aspect-video rounded-xl object-cover ring-1 ring-slate-200" />
            ) : (
              <div className="w-full aspect-video rounded-xl bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center text-xs text-slate-400">
                Belum ada foto
              </div>
            )}
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-300 cursor-pointer">
              <Upload size={15} />
              {imageFile ? imageFile.name : 'Pilih file foto...'}
              <input type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files?.[0] ?? null)} />
            </label>
            {form.image_url && !imageFile && (
              <p className="text-[11px] font-mono text-slate-400 break-all">{form.image_url}</p>
            )}
          </Section>
        </div>
      </div>
    </AdminLayout>
  )
}
