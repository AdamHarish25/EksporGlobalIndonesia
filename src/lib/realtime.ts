import { supabase } from '@/lib/supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'

/**
 * Shared Realtime subscription manager.
 *
 * Latar: `supabase.channel(namaSama)` mengembalikan instance channel YANG SAMA.
 * Jika dua hook (mis. HomePage + Footer sama-sama pakai useSiteContent) membuat
 * channel bernama sama lalu masing-masing memanggil `.on()` + `.subscribe()`,
 * supabase-js melempar: "cannot add postgres_changes callbacks after subscribe()"
 * dan meledakkan React tree.
 *
 * Manager ini memastikan per nama channel hanya ada SATU channel + SATU subscribe,
 * dengan handler refcount: subscribe pertama membuat, unsubscribe terakhir menghapus.
 * Aman untuk StrictMode double-mount dan banyak hook dalam satu halaman.
 */

export interface RealtimeBinding {
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
  schema: string
  table: string
  filter?: string
}

interface Entry {
  channel: RealtimeChannel
  handlers: Set<() => void>
}

const entries = new Map<string, Entry>()

export function subscribeShared(
  channelName: string,
  bindings: RealtimeBinding[],
  onEvent: () => void,
): () => void {
  let entry = entries.get(channelName)

  if (!entry) {
    const created: Entry = { channel: supabase.channel(channelName), handlers: new Set() }
    entries.set(channelName, created)
    for (const b of bindings) {
      created.channel.on(
        'postgres_changes',
        {
          event: b.event,
          schema: b.schema,
          table: b.table,
          ...(b.filter ? { filter: b.filter } : {}),
        },
        () => {
          created.handlers.forEach(h => {
            try {
              h()
            } catch {
              // Satu handler gagal tidak boleh meruntuhkan yang lain / halaman.
            }
          })
        },
      )
    }
    created.channel.subscribe()
    entry = created
  }

  entry.handlers.add(onEvent)

  let active = true
  return () => {
    if (!active) return
    active = false
    const cur = entries.get(channelName)
    if (!cur) return
    cur.handlers.delete(onEvent)
    if (cur.handlers.size === 0) {
      entries.delete(channelName)
      supabase.removeChannel(cur.channel)
    }
  }
}
