import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSiteLang } from '@/utils/siteLang'

/**
 * Scroll ke atas setiap pindah route.
 *
 * Saat bahasa terjemahan aktif (cookie googtrans non-EN), pindah halaman
 * client-side saja tidak cukup: Google Translate menerjemahkan penuh hanya
 * pada page load, dan konten yang disuntik router belakangan sering luput
 * dari observer-nya (halaman stuck bahasa Inggris). Karena itu lakukan SATU
 * kali full reload per halaman — sesuai prinsip tiap ganti halaman harus loading.
 * Guard sessionStorage mencegah reload berulang (anti-loop).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lang = getSiteLang()
    if (lang !== 'en') {
      const flag = `gt-loaded:${lang}:${pathname}`
      if (!sessionStorage.getItem(flag)) {
        sessionStorage.setItem(flag, '1')
        window.location.reload()
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}
