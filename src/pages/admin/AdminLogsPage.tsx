import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

interface LogRow {
  id: string
  at: string
  actor: string | null
  action: string
  table_name: string
  row_id: string
  old_data: Record<string, unknown> | null
  new_data: Record<string, unknown> | null
}

const ACTION_STYLE: Record<string, string> = {
  insert: 'bg-brand-500/10 text-brand-700 ring-brand-500/20',
  update: 'bg-gold-500/10 text-gold-600 ring-gold-500/20',
  delete: 'bg-red-500/10 text-red-600 ring-red-500/20',
}

function summarize(row: LogRow): string {
  const d = row.new_data ?? row.old_data ?? {}
  const name = (d['name'] ?? d['title'] ?? d['key'] ?? d['param'] ?? '') as string
  const slug = (d['slug'] ?? '') as string
  return [name, slug ? `(${slug})` : ''].filter(Boolean).join(' ')
}

export default function AdminLogsPage() {
  const { role } = useAuth()
  const [rows, setRows] = useState<LogRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Log hanya untuk admin (RLS juga menegakkan di server).
  // NOTE: cek peran SETELAH semua hooks agar urutan hooks stabil.

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('audit_logs')
        .select('id,at,actor,action,table_name,row_id,old_data,new_data')
        .order('at', { ascending: false })
        .limit(100)
      if (err) throw new Error(err.message)
      setRows((data ?? []) as LogRow[])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat log')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (role === 'admin') load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  if (role && role !== 'admin') {
    return <Navigate to="/admin/products" replace />
  }

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Audit Log</h1>
          <p className="mt-1 text-sm text-slate-600">
            100 perubahan terakhir · siapa mengubah apa · hanya admin yang bisa melihat.
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

      <div className="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">Memuat log...</div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Belum ada aktivitas tercatat. Log terisi otomatis setiap ada perubahan data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-5 py-3.5 font-bold text-slate-900">Waktu</th>
                  <th className="px-5 py-3.5 font-bold text-slate-900">Aksi</th>
                  <th className="px-5 py-3.5 font-bold text-slate-900">Tabel</th>
                  <th className="px-5 py-3.5 font-bold text-slate-900">Data</th>
                  <th className="px-5 py-3.5 font-bold text-slate-900">Pelaku</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(r.at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ring-1 ${ACTION_STYLE[r.action] ?? 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
                        {r.action}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{r.table_name}</td>
                    <td className="px-5 py-3.5 text-slate-700">{summarize(r) || <span className="font-mono text-xs text-slate-400">{r.row_id}</span>}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                      {r.actor ? r.actor.slice(0, 8) + '…' : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
