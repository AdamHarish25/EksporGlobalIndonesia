import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import MarketsPage from '@/pages/MarketsPage'
import MarketDetailPage from '@/pages/MarketDetailPage'
import SolutionsPage from '@/pages/SolutionsPage'
import HowItWorksPage from '@/pages/HowItWorksPage'
import AboutPage from '@/pages/AboutPage'
import ForBuyersPage from '@/pages/ForBuyersPage'
import ForSuppliersPage from '@/pages/ForSuppliersPage'
import RequestQuotePage from '@/pages/RequestQuotePage'
import FAQPage from '@/pages/FAQPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import TermsPage from '@/pages/TermsPage'
import CookiePolicyPage from '@/pages/CookiePolicyPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/markets/:slug" element={<MarketDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/for-buyers" element={<ForBuyersPage />} />
          <Route path="/for-suppliers" element={<ForSuppliersPage />} />
          <Route path="/request-a-quote" element={<RequestQuotePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
