import React from 'react'
import { Menu, X, FileText } from 'lucide-react'
import { NAV_LINKS, BRAND } from '@/constants'
import BrandLogo from '@/components/BrandLogo'

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex-col md:flex-row flex items-center gap-2" onClick={close}>
              <BrandLogo className='w-60 h-fit' line={BRAND.tagline} />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#inquiry"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
            >
              <FileText size={16} />
              Request FCO / Quote
            </a>
          </div>

          <button
            onClick={() => setOpen(prev => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-slate-100 pt-3">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {label}
              </a>
            ))}
            <a
              href="#inquiry"
              onClick={close}
              className="mt-2 w-full inline-flex justify-center items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <FileText size={16} />
              Request FCO / Quote
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
