/** Bahasa yang didukung language switcher (sinkron dengan Google Translate). */
export type SiteLang = 'en' | 'id' | 'ar' | 'zh-CN'

const SUPPORTED: SiteLang[] = ['en', 'id', 'ar', 'zh-CN']

/** Baca bahasa aktif dari cookie googtrans. Default 'en' (bahasa dasar halaman). */
export function getSiteLang(): SiteLang {
  if (typeof document === 'undefined') return 'en'
  const m = document.cookie.match(/googtrans=\/en\/([^;]+)/)
  const code = m ? decodeURIComponent(m[1]) : 'en'
  return (SUPPORTED as string[]).includes(code) ? (code as SiteLang) : 'en'
}
