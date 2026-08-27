import { Cookie } from 'lucide-react'

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Legal
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Cookie Policy
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Cookie size={22} className="text-white" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Cookie Policy</h2>
            </div>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
              <p><strong>Last updated:</strong> January 2026</p>

              <h3 className="text-base font-bold text-slate-900 mt-6">1. What Are Cookies</h3>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                They are widely used to make websites work more efficiently and provide information to website owners.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">2. How We Use Cookies</h3>
              <p>
                Export Global Indonesia uses cookies to improve your browsing experience, analyze website traffic, and
                understand where our visitors are coming from. We may also use cookies to remember your preferences
                and provide personalized content.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">3. Types of Cookies We Use</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
              </ul>

              <h3 className="text-base font-bold text-slate-900 mt-6">4. Managing Cookies</h3>
              <p>
                You can control and manage cookies through your browser settings. Please note that disabling certain
                cookies may affect the functionality of our website.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">5. Third-Party Cookies</h3>
              <p>
                We may use third-party services (such as Google Analytics) that set their own cookies. These cookies
                are governed by the respective third-party privacy policies.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">6. Changes to This Policy</h3>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an
                updated revision date.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">7. Contact Us</h3>
              <p>
                If you have questions about our Cookie Policy, please contact{' '}
                <span className="font-semibold text-slate-900">adam.eksporglobalindonesia@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
