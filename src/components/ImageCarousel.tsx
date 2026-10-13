import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { SolutionCarouselSlide } from '@/constants/solutions'
import { getSiteLang } from '@/utils/siteLang'

/**
 * Carousel gambar container — panah + dots + autoplay 6 detik (pause saat hover).
 * Teks slide mengikuti bahasa aktif (cookie googtrans) secara langsung dan ditandai
 * `notranslate` supaya Google Translate tidak memproses ulang / balapan dengan autoplay.
 */
export default function ImageCarousel({ slides }: { slides: SolutionCarouselSlide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lang] = useState(getSiteLang)

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [paused, slides.length])

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length)
  const slide = slides[index]
  const t = slide.text[lang] ?? slide.text.en
  const rtl = lang === 'ar'

  return (
    <div
      className="relative rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl bg-slate-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <img
        key={slide.image}
        src={slide.image}
        alt={slide.imageAlt}
        className="h-80 w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

      <div className="absolute top-4 left-4">
        <span className="notranslate inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-900 ring-1 ring-white/20" dir="auto">
          {t.badge}
        </span>
      </div>
      <div className="absolute top-4 right-4">
        <span key={index} className="notranslate inline-flex items-center rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
          {index + 1} / {slides.length}
        </span>
      </div>

      <div key={`${lang}-${index}`} className="absolute inset-x-0 bottom-0 p-5" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="notranslate text-white font-extrabold text-lg leading-tight">{t.title}</div>
        <p className="notranslate mt-1 text-sm text-white/80 leading-relaxed">{t.desc}</p>
        <div className="mt-3 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous container"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 hover:bg-black/65 p-2 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next container"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 hover:bg-black/65 p-2 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  )
}
