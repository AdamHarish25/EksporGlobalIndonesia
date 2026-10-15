import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw, Trash2, Eye, X, Mail, Phone, Globe, MapPin, Factory, Award, Package } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { subscribeShared } from '@/lib/realtime'
import {
  fetchSupplierRegistrations, updateSupplierStatus, deleteSupplierRegistration,
  getSupplierPhotoUrl, type SupplierRegistration, type SupplierStatus,
} from '@/lib/suppliersDb'

const STATUS_STYLE: Record<SupplierStatus, string> = {
  new: 'bg-blue-500/10 text-blue-700 ring-blue-500/20',
  reviewed: 'bg-gold-500/10 text-gold-600 ring-gold-500/20',
  approved: 'bg-brand-500/10 text-brand-700 ring-brand-500/20',
  rejected: 'bg-red-500/10 text-red-600 ring-red-500/20',
}

const STATUS_ORDER: SupplierStatus[] = ['new', 'reviewed', 'approved', 'rejected']

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  if (!value) return null
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
      <div className={`mt-0.5 text-sm text-slate-800 ${mono ? 'font-mono break-all' : ''}`}>{value}</div>
    </div>
  )
}

export default function AdminSuppliersPage() {
  const [rows, setRows] = useState<SupplierRegistration[]>([])
  const [selected, setSelected] = useState<SupplierRegistration | null>(null)
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [acting, setActing] = useState(false)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      setRows(await fetchSupplierRegistrations())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat pendaftar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // Live: daftar bertambah otomatis saat ada pendaftar baru.
    const unsubscribe = subscribeShared(
      'supplier-registrations-changes',
      [{ event: '*', schema: 'public', table: 'supplier_registrations' }],
      load,
    )
    return unsubscribe
  }, [])

  const openDetail = async (row: SupplierRegistration) => {
    setSelected(row)
    setPhotoUrls([])
    try {
      const urls = await Promise.all(row.product_photos.map(p => getSupplierPhotoUrl(p)))
      setPhotoUrls(urls)
    } catch {
      // Foto gagal di-resolve — tampilkan tanpa foto, data tetap bisa dibaca.
    }
  }

  const handleStatus = async (id: string, status: SupplierStatus) => {
    setActing(true)
    try {
      await updateSupplierStatus(id, status)
      setRows(prev => prev.map(r => (r.id === id ? { ...r, status } : r)))
      setSelected(prev => (prev && prev.id === id ? { ...prev, status } : prev))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Gagal mengubah status')
    } finally {
      setActing(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus pendaftaran "${name}"? Tindakan ini permanen.`)) return
    setActing(true)
    try {
      await deleteSupplierRegistration(id)
      setRows(prev => prev.filter(r => r.id !== id))
      setSelected(null)
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Gagal menghapus')
    } finally {
      setActing(false)
    }
  }

  const counts = STATUS_ORDER.map(s => ({ s, n: rows.filter(r => r.status === s).length }))

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Suppliers</h1>
          <p className="mt-1 text-sm text-slate-600">
            {rows.length} pendaftar · {counts.map(c => `${c.n} ${c.s}`).join(' · ')} · daftar live (realtime).
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300"
        >
          <RefreshCw size={16} /> Muat ulang
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">Memuat pendaftar...</div>
          ) : rows.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Belum ada pendaftaran supplier.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-5 py-3.5 font-bold text-slate-900">Perusahaan</th>
                    <th className="px-5 py-3.5 font-bold text-slate-900">Produk</th>
                    <th className="px-5 py-3.5 font-bold text-slate-900">Status</th>
                    <th className="px-5 py-3.5 font-bold text-slate-900">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map(r => (
                    <tr
                      key={r.id}
                      onClick={() => openDetail(r)}
                      className={`cursor-pointer hover:bg-slate-50/60 ${selected?.id === r.id ? 'bg-brand-50/50' : ''}`}
                    >
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">
                          {r.company_name}
                          {r.company_type && <span className="ml-1.5 text-xs font-semibold text-slate-400">{r.company_type}</span>}
                        </div>
                        <div className="text-xs text-slate-500">{r.contact_name} · {r.contact_email}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{r.product}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ring-1 ${STATUS_STYLE[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-32">
          {!selected ? (
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-8 text-center text-sm text-slate-500">
              <Eye size={22} className="mx-auto text-slate-300" />
              <p className="mt-2">Klik baris untuk melihat detail pendaftar.</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">{selected.company_name}</h2>
                  <p className="text-xs text-slate-500">
                    {new Date(selected.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                  <X size={17} />
                </button>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {STATUS_ORDER.map(s => (
                    <button
                      key={s}
                      disabled={acting || selected.status === s}
                      onClick={() => handleStatus(selected.id, s)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase ring-1 transition-all disabled:opacity-100 ${
                        selected.status === s
                          ? STATUS_STYLE[s]
                          : 'bg-white text-slate-400 ring-slate-200 hover:ring-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {photoUrls.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Foto Produk</div>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {photoUrls.map((u, i) => (
                      <a key={i} href={u} target="_blank" rel="noreferrer">
                        <img src={u} alt={`Foto produk ${i + 1}`} className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200 hover:ring-brand-500" loading="lazy" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Factory size={15} className="text-brand-600" /> Perusahaan & Produk
                </div>
                <Field label="Bentuk usaha" value={selected.company_type} />
                <Field label="Lokasi pabrik" value={selected.factory_location} />
                <Field label="Detail produk" value={selected.product_details} />
                <Field label="Kapasitas produksi" value={selected.production_capacity} />
                <Field label="MOQ" value={selected.moq} />
                <Field label="Kemasan" value={selected.packaging} />
                <div className="flex items-start gap-2">
                  <Award size={15} className="text-brand-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-slate-800">{selected.certifications || '—'}</div>
                </div>
                <Field label="Pengalaman ekspor" value={selected.export_experience} />
                <Field label="Website" value={selected.website} mono />
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-4">
                <div className="text-sm font-bold text-slate-900">Kontak Resmi</div>
                <Field label="Nama" value={selected.contact_name} />
                <div className="flex items-center gap-2 text-sm text-slate-800">
                  <Mail size={15} className="text-slate-400 shrink-0" />
                  <a href={`mailto:${selected.contact_email}`} className="break-all text-brand-700 hover:underline">{selected.contact_email}</a>
                </div>
                {selected.contact_phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <Phone size={15} className="text-slate-400 shrink-0" />
                    <a href={`https://wa.me/${selected.contact_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">{selected.contact_phone}</a>
                  </div>
                )}
                {selected.message && <Field label="Pesan" value={selected.message} />}
              </div>

              <div className="flex gap-2 border-t border-slate-100 pt-4">
                <a
                  href={`mailto:${selected.contact_email}?subject=${encodeURIComponent(`Re: Supplier Registration — ${selected.company_name}`)}`}
                  className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300"
                >
                  <Mail size={15} /> Balas Email
                </a>
                <button
                  onClick={() => handleDelete(selected.id, selected.company_name)}
                  disabled={acting}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 size={15} /> Hapus
                </button>
              </div>

              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Package size={12} /> Status <span className="font-bold">approved</span> menyiapkan data ini untuk ditampilkan ke buyer (phase berikutnya).
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500 flex items-center gap-1.5">
        <MapPin size={12} /> Data kontak pendaftar hanya terlihat oleh editor/admin — tidak tampil di situs publik.
        <span className="mx-1">·</span>
        <Globe size={12} /> Lihat situs: <Link to="/for-suppliers" className="text-brand-700 hover:underline">/for-suppliers</Link>
      </p>
    </AdminLayout>
  )
}
