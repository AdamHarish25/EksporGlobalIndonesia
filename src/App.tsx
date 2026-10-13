import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ScrollToTop from '@/components/ScrollToTop'
import PageLoader from '@/components/PageLoader'

// Lazy per halaman — setiap ganti route memicu loading + remount,
// bukan pindah anchor (#) dalam satu halaman.
const HomePage = lazy(() => import('@/pages/HomePage'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const SolutionsPage = lazy(() => import('@/pages/SolutionsPage'))
const SolutionDetailPage = lazy(() => import('@/pages/SolutionDetailPage'))
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ForBuyersPage = lazy(() => import('@/pages/ForBuyersPage'))
const ForSuppliersPage = lazy(() => import('@/pages/ForSuppliersPage'))
const RequestQuotePage = lazy(() => import('@/pages/RequestQuotePage'))
const FAQPage = lazy(() => import('@/pages/FAQPage'))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))
const CookiePolicyPage = lazy(() => import('@/pages/CookiePolicyPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 font-sans">
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
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
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
