import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Legal
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Shield size={22} className="text-white" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Privacy Policy</h2>
            </div>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
              <p><strong>Last updated:</strong> January 2026</p>

              <h3 className="text-base font-bold text-slate-900 mt-6">1. Information We Collect</h3>
              <p>
                Export Global Indonesia collects information you provide directly, such as when you fill out a contact form,
                request a quote, or communicate with us. This may include your name, company name, email address, phone number,
                and business requirements.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to respond to your inquiries, provide quotations, coordinate orders,
                improve our services, and communicate with you about products and services that may be of interest.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">3. Information Sharing</h3>
              <p>
                We do not sell or rent your personal information to third parties. We may share your information with
                trusted suppliers and logistics partners solely for the purpose of fulfilling your orders.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">4. Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">5. Contact Us</h3>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <span className="font-semibold text-slate-900">adam.eksporglobalindonesia@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
