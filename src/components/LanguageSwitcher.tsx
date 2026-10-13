import { useEffect, useState } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'

/* Third-party: Google Translate engine. UI bawaan disembunyikan (lihat index.css),
   dropdown custom di bawah hanya set cookie googtrans lalu reload. */

const LANGS = [
  { code: 'en', label: 'English (US)', short: 'EN', flag: '🇺🇸' },
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID', flag: '🇮🇩' },
  { code: 'ar', label: 'Bahasa Arab', short: 'AR', flag: '🇸🇦' },
  { code: 'zh-CN', label: 'Mandarin', short: 'CN', flag: '🇨🇳' },
]

function getCurrentLang(): string {
  const m = document.cookie.match(/googtrans=\/en\/([^;]+)/)
  return m ? decodeURIComponent(m[1]) : 'en'
}

function setLang(code: string) {
  const value = `/en/${code}`
  const attrs = `path=/;max-age=31536000`
  document.cookie = `googtrans=${value};${attrs}`
  document.cookie = `googtrans=${value};${attrs};domain=${window.location.hostname}`
  window.location.reload()
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('en')

  useEffect(() => {
    setCurrent(getCurrentLang())
    if (!document.getElementById('google-translate-script')) {
      ;(window as unknown as { googleTranslateElementInit: () => void }).googleTranslateElementInit = () => {
        const w = window as unknown as {
          google: { translate: { TranslateElement: new (opts: object, id: string) => void } }
        }
        new w.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,id,ar,zh-CN', autoDisplay: false },
          'google_translate_element',
        )
      }
      const s = document.createElement('script')
      s.id = 'google-translate-script'
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      s.async = true
      document.body.appendChild(s)
    }
  }, [])

  const active = LANGS.find((l) => l.code === current) ?? LANGS[0]

  return (
    <div className="relative">
      {/* Elemen wajib Google Translate — disembunyikan via CSS */}
      <div id="google_translate_element" aria-hidden="true" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50 transition-colors"
      >
        <Globe size={16} />
        <span>{active.flag}</span>
        <span className="hidden sm:inline">{active.short}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-52 rounded-xl bg-white shadow-xl border border-slate-100 py-2 z-50">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setOpen(false)
                  if (l.code !== current) setLang(l.code)
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-brand-50 hover:text-brand-700 ${
                  l.code === current ? 'text-brand-700 font-semibold' : 'text-slate-700'
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="flex-1 text-left">{l.label}</span>
                {l.code === current && <Check size={15} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
