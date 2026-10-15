import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { supabase } from '@/lib/supabase'
import { saveSolution, SOLUTION_ICON_NAMES, type SolutionFormData } from '@/lib/solutionsDb'

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const csvToArray = (s: string): string[] =>
  s.split(/[\n,]+/).map(x => x.trim()).filter(Boolean)

const EMPTY: SolutionFormData = {
  slug: '', icon_name: 'package', title: '', description: '', long_desc: '',
  features: [], cta: '', image: '', image_alt: '', show_form: false,
  status: 'draft', sort_order: 99,
}

const inputCls =
  'w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 bg-white'

export default function AdminSolutionFormPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = id === 'new' || !id
  const navigate = useNavigate()

  const [form, setForm] = useState<SolutionFormData>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof SolutionFormData>(key: K, value: SolutionFormData[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  useEffect(() => {
    if (isNew || !id) return
    const load = async () => {
      setLoading(true)
      try {
        const { data: row, error: err } = await supabase
          .from('solutions').select('*').eq('id', id).single()
        if (err || !row) throw new Error(err?.message ?? 'Solution tidak ditemukan')
        setForm({
          id: row.id, slug: row.slug ?? '', icon_name: row.icon_name ?? 'package',
          title: row.title ?? '', description: row.description ?? '', long_desc: row.long_desc ?? '',
          features: row.features ?? [], cta: row.cta ?? '',
          image: row.image ?? '', image_alt: row.image_alt ?? '',
          show_form: Boolean(row.show_form), status: row.status ?? 'draft',
          sort_order: row.sort_order ?? 99,
        })
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Gagal memuat solution')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, isNew])

  const handleSave = async () => {
    setError(null)
    if (form.title.trim() === '') {
      setError('Judul solution wajib diisi.')
      return
    }
    const slug = form.slug.trim() === '' ? slugify(form.title) : slugify(form.slug)
    if (slug === '') {
      setError('Slug tidak valid.')
      return
    }
    setSaving(true)
    try {
      await saveSolution({ ...form, slug })
      navigate('/admin/solutions')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menyimpan')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-10 text-center text-sm text-slate-500">
          Memuat solution...
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/solutions" className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {isNew ? 'Solution Baru' : 'Ubah Solution'}
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
        <div className="mt-6 rounded-xl bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-900">Info Utama</h2>
            <div className="mt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Judul *</label>
                  <input value={form.title} onChange={e => {
                    const title = e.target.value
                    setForm(prev => ({ ...prev, title, slug: prev.slug === slugify(prev.title) || prev.slug === '' ? slugify(title) : prev.slug }))
                  }} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Slug (URL)</label>
                  <input value={form.slug} onChange={e => set('slug', e.target.value)} className={`${inputCls} font-mono`} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Ikon</label>
                  <select value={form.icon_name} onChange={e => set('icon_name', e.target.value)} className={inputCls}>
                    {SOLUTION_ICON_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Urutan tampil</label>
                  <input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi singkat</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi panjang</label>
                <textarea value={form.long_desc} onChange={e => set('long_desc', e.target.value)} rows={4} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Fitur (pisahkan koma / baris baru)</label>
                <textarea value={form.features.join(', ')} onChange={e => set('features', csvToArray(e.target.value))} rows={4} className={`${inputCls} font-mono text-xs`} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Teks tombol (CTA)</label>
                  <input value={form.cta} onChange={e => set('cta', e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Gambar (URL, cth. /namafile.webp)</label>
                  <input value={form.image} onChange={e => set('image', e.target.value)} className={`${inputCls} font-mono`} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Alt gambar</label>
                <input value={form.image_alt} onChange={e => set('image_alt', e.target.value)} className={inputCls} />
              </div>
              <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
                <input type="checkbox" checked={form.show_form} onChange={e => set('show_form', e.target.checked)} className="h-4 w-4 accent-green-600" />
                Tampilkan form inquiry di halaman detail
              </label>
            </div>
          </section>
        </div>

        <div className="space-y-6 lg:sticky lg:top-32">
          <section className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-900">Publikasi</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)} className={inputCls}>
                  <option value="draft">Draft (hanya editor)</option>
                  <option value="published">Published (live ke situs)</option>
                </select>
              </div>
              <button onClick={handleSave} disabled={saving} className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-sm">
                <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan solution'}
              </button>
              {!isNew && form.slug && (
                <Link to={`/solutions/${form.slug}`} target="_blank" className="block text-center text-xs font-semibold text-brand-700 hover:underline">
                  Preview di situs ↗ {form.status === 'draft' ? '(hanya terlihat oleh editor)' : ''}
                </Link>
              )}
            </div>
          </section>
          {form.image && (
            <section className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-900">Preview Gambar</h2>
              <img src={form.image} alt="" className="mt-3 w-full aspect-video rounded-xl object-cover ring-1 ring-slate-200" loading="lazy" />
            </section>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
