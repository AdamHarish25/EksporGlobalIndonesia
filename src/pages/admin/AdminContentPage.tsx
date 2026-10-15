import { useEffect, useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { fetchContentRows, saveContent, type ContentRow } from '@/lib/contentDb'

export default function AdminContentPage() {
  const [rows, setRows] = useState<ContentRow[]>([])
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await fetchContentRows()
      setRows(list)
      setDrafts(Object.fromEntries(list.map(r => [r.key, r.value])))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat konten')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSave = async (key: string) => {
    setSaving(key)
    setNotice(null)
    try {
      await saveContent(key, drafts[key] ?? '')
      setRows(prev => prev.map(r => (r.key === key ? { ...r, value: drafts[key] ?? '' } : r)))
      setNotice(`"${key}" tersimpan — langsung live ke situs.`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menyimpan')
    } finally {
      setSaving(null)
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Site Content</h1>
          <p className="mt-1 text-sm text-slate-600">
            Ganti kata/teks situs tanpa deploy. Tersimpan langsung live (realtime).
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
      {notice && (
        <div className="mt-6 rounded-xl bg-brand-500/10 ring-1 ring-brand-500/20 px-4 py-3 text-sm text-brand-700">{notice}</div>
      )}

      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-10 text-center text-sm text-slate-500">
            Memuat konten...
          </div>
        ) : (
          rows.map(r => {
            const dirty = (drafts[r.key] ?? '') !== r.value
            return (
              <div key={r.key} className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">{r.label || r.key}</div>
                    <div className="font-mono text-xs text-slate-400">{r.key}</div>
                  </div>
                  <button
                    onClick={() => handleSave(r.key)}
                    disabled={saving === r.key || !dirty}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 px-4 py-2 text-sm font-semibold text-white"
                  >
                    <Save size={15} /> {saving === r.key ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
                <textarea
                  value={drafts[r.key] ?? ''}
                  onChange={e => setDrafts(prev => ({ ...prev, [r.key]: e.target.value }))}
                  rows={Math.min(6, Math.max(2, Math.ceil(((drafts[r.key] ?? '').length || 40) / 80)))}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                />
                {dirty && <p className="mt-1 text-xs text-gold-600">● Belum disimpan</p>}
              </div>
            )
          })
        )}
      </div>
    </AdminLayout>
  )
}
