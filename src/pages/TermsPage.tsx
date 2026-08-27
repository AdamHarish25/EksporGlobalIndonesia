import { FileSignature } from 'lucide-react'

export default function TermsPage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-500/20 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-brand-500/30">
              Legal
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Terms &amp; Conditions
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <FileSignature size={22} className="text-white" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Terms &amp; Conditions</h2>
            </div>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
              <p><strong>Last updated:</strong> January 2026</p>

              <h3 className="text-base font-bold text-slate-900 mt-6">1. General</h3>
              <p>
                These terms govern your use of Export Global Indonesia's services and website. By engaging with our
                services, you agree to these terms and conditions.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">2. Quotations</h3>
              <p>
                All quotations are valid for a limited period as specified in the quotation document. Prices are subject
                to change based on market conditions and supplier confirmation. Quotations are not binding until an
                order is confirmed and payment is received.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">3. Orders &amp; Payment</h3>
              <p>
                Orders are confirmed upon receipt of payment or L/C as agreed. Payment terms are specified in each
                individual quotation. Standard payment methods include L/C at Sight and T/T (Telegraphic Transfer).
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">4. Shipping &amp; Delivery</h3>
              <p>
                Shipping terms are as per the agreed incoterm (FOB, etc.). Delivery timelines are estimates and
                may vary based on supplier production schedules and shipping logistics.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">5. Quality &amp; Specifications</h3>
              <p>
                Product specifications are as provided in the quotation and Certificate of Analysis (CoA). Minor
                variations may occur between lots. Specifications shown on this website are target specifications
                and may vary according to buyer specification, supplier capability, and final laboratory testing.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">6. Limitation of Liability</h3>
              <p>
                Export Global Indonesia acts as a sourcing and export coordination partner. Liability is limited to
                the terms specified in individual purchase contracts.
              </p>

              <h3 className="text-base font-bold text-slate-900 mt-6">7. Contact</h3>
              <p>
                For questions regarding these terms, please contact{' '}
                <span className="font-semibold text-slate-900">adam.eksporglobalindonesia@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
