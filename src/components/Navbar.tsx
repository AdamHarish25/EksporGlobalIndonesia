import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, FileText } from 'lucide-react'
import { NAV_LINKS, BRAND } from '@/constants'
import BrandLogo from '@/components/BrandLogo'

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const location = useLocation()
  const close = () => setOpen(false)

  const handleDropdownEnter = (label: string) => setActiveDropdown(label)
  const handleDropdownLeave = () => setActiveDropdown(null)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2" onClick={close}>
            <BrandLogo className="w-52 h-fit" line={BRAND.tagline} background={false} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href, children }) => (
              <div
                key={label}
                className="relative"
                onMouseEnter={() => children && handleDropdownEnter(label)}
                onMouseLeave={handleDropdownLeave}
              >
                {children ? (
                  <>
                    <button
                      className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                        location.pathname.startsWith(href)
                          ? 'text-brand-700 bg-brand-50'
                          : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
                      }`}
                    >
                      {label}
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                        {children.map(child => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={href}
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                      location.pathname === href
                        ? 'text-brand-700 bg-brand-50'
                        : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/request-a-quote"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors ml-2"
            >
              <FileText size={16} />
              Request a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(prev => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-slate-100 pt-3">
            {NAV_LINKS.map(({ label, href, children }) => (
              <div key={label}>
                {children ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === label ? null : label)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {label}
                      <ChevronDown size={16} className={`transition-transform ${activeDropdown === label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === label && (
                      <div className="pl-4 space-y-1">
                        <Link
                          to={href}
                          onClick={close}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-brand-700 hover:bg-brand-50"
                        >
                          View All
                        </Link>
                        {children.map(child => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={close}
                            className="block px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={href}
                    onClick={close}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/request-a-quote"
              onClick={close}
              className="mt-2 w-full inline-flex justify-center items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <FileText size={16} />
              Request a Quote
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
