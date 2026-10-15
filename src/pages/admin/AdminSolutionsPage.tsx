import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, RefreshCw } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { supabase } from '@/lib/supabase'
import { deleteSolutionById } from '@/lib/solutionsDb'

type Row = {
  id: string
  slug: string
  title: string
  status: string
  image: string
}

export default function AdminSolutionsPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('solutions')
        .select('id,slug,title,status,image')
        .order('sort_order')
      if (err) throw new Error(err.message)
      setRows((data ?? []) as Row[])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat solutions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus solution "${title}"? Tindakan ini permanen.`)) return
    setDeleting(id)
    try {
      await deleteSolutionById(id)
      setRows(prev => prev.filter(r => r.id !== id))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Gagal menghapus')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Solutions</h1>
          <p className="mt-1 text-sm text-slate-600">
            {rows.length} solutions · perubahan tersimpan langsung live ke situs (realtime).
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300"
          >
            <RefreshCw size={16} /> Muat ulang
          </button>
          <Link
            to="/admin/solutions/new"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            <Plus size={16} /> Solution baru
          </Link>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">Memuat solutions...</div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-slate-500">Belum ada solution.</p>
            <Link to="/admin/solutions/new" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white">
              <Plus size={16} /> Tambah solution pertama
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-5 py-3.5 font-bold text-slate-900">Solution</th>
                  <th className="px-5 py-3.5 font-bold text-slate-900">Status</th>
                  <th className="px-5 py-3.5 font-bold text-slate-900">Slug</th>
                  <th className="px-5 py-3.5 font-bold text-slate-900 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {r.image ? (
                          <img src={r.image} alt="" className="h-11 w-11 rounded-lg object-cover ring-1 ring-slate-200" loading="lazy" />
                        ) : (
                          <div className="h-11 w-11 rounded-lg bg-slate-100 ring-1 ring-slate-200" />
                        )}
                        <div className="font-bold text-slate-900">{r.title}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ring-1 ${
                        r.status === 'published'
                          ? 'bg-brand-500/10 text-brand-700 ring-brand-500/20'
                          : 'bg-gold-500/10 text-gold-600 ring-gold-500/20'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-500">/solutions/{r.slug}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <Link to={`/solutions/${r.slug}`} target="_blank" title="Preview / lihat di situs" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                          <Eye size={17} />
                        </Link>
                        <Link to={`/admin/solutions/${r.id}`} title="Ubah" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand-700">
                          <Pencil size={17} />
                        </Link>
                        <button
                          onClick={() => handleDelete(r.id, r.title)}
                          disabled={deleting === r.id}
                          title="Hapus"
                          className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Catatan: carousel multibahasa (bulk supply) masih statis di kode — hanya teks utama yang dikelola di sini.
      </p>
    </AdminLayout>
  )
}
