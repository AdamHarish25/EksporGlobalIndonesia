import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { CONTACT, BRAND, LINKS } from '@/constants'
import BrandLogo from '@/components/BrandLogo'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <BrandLogo className="w-44 h-fit" line={BRAND.tagline} background={true} />
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Connecting global buyers with quality products from Indonesia.
            </p>
            <div className="mt-5 space-y-3">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-brand-400 transition-colors">
                <Mail size={16} />
                <span className="break-all">{CONTACT.email}</span>
              </a>
              <a href={LINKS.whatsAppDirect} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-400 hover:text-brand-400 transition-colors">
                <Phone size={16} />
                {CONTACT.whatsAppNumber}
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={16} />
                {CONTACT.location}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Products</h4>
            <ul className="space-y-3">
              <li><Link to="/products/coconut-oil" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">Coconut Oil</Link></li>
              <li><Link to="/products/coconut-shell-charcoal-briquettes" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">Coconut Shell Charcoal Briquettes</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">How It Works</Link></li>
              <li><Link to="/for-buyers" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">For Buyers</Link></li>
              <li><Link to="/for-suppliers" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">For Suppliers</Link></li>
              <li><Link to="/faq" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Markets & CTA */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Markets</h4>
            <ul className="space-y-3">
              <li><Link to="/markets/saudi-arabia" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">🇸🇦 Saudi Arabia</Link></li>
              <li><Link to="/markets/united-arab-emirates" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">🇦🇪 United Arab Emirates</Link></li>
              <li><Link to="/markets/gcc" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">🌐 GCC Markets</Link></li>
            </ul>
            <div className="mt-6">
              <Link
                to="/request-a-quote"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
            <Link to="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
