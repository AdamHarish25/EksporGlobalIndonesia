import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ScrollToTop from '@/components/ScrollToTop'
import PageLoader from '@/components/PageLoader'
import ProtectedRoute from '@/components/ProtectedRoute'

// Lazy per halaman — setiap ganti route memicu loading + remount,
// bukan pindah anchor (#) dalam satu halaman.
const HomePage = lazy(() => import('@/pages/HomePage'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const SolutionsPage = lazy(() => import('@/pages/SolutionsPage'))
const SolutionDetailPage = lazy(() => import('@/pages/SolutionDetailPage'))
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const OrganizationPage = lazy(() => import('@/pages/OrganizationPage'))
const ForBuyersPage = lazy(() => import('@/pages/ForBuyersPage'))
const ForSuppliersPage = lazy(() => import('@/pages/ForSuppliersPage'))
const RequestQuotePage = lazy(() => import('@/pages/RequestQuotePage'))
const FAQPage = lazy(() => import('@/pages/FAQPage'))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))
const CookiePolicyPage = lazy(() => import('@/pages/CookiePolicyPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'))
const AdminProductsPage = lazy(() => import('@/pages/admin/AdminProductsPage'))
const AdminProductFormPage = lazy(() => import('@/pages/admin/AdminProductFormPage'))
const AdminContentPage = lazy(() => import('@/pages/admin/AdminContentPage'))
const AdminSolutionsPage = lazy(() => import('@/pages/admin/AdminSolutionsPage'))
const AdminSolutionFormPage = lazy(() => import('@/pages/admin/AdminSolutionFormPage'))
const AdminLogsPage = lazy(() => import('@/pages/admin/AdminLogsPage'))
const AdminSuppliersPage = lazy(() => import('@/pages/admin/AdminSuppliersPage'))
const SupplyPartnersPage = lazy(() => import('@/pages/SupplyPartnersPage'))

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 font-sans">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
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
            <Route path="/organization" element={<OrganizationPage />} />
            <Route path="/for-buyers" element={<ForBuyersPage />} />
            <Route path="/for-suppliers" element={<ForSuppliersPage />} />
            <Route path="/partners" element={<SupplyPartnersPage />} />
            <Route path="/request-a-quote" element={<RequestQuotePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<Navigate to="/admin/products" replace />} />
            <Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} />
            <Route path="/admin/products/new" element={<ProtectedRoute><AdminProductFormPage /></ProtectedRoute>} />
            <Route path="/admin/products/:id" element={<ProtectedRoute><AdminProductFormPage /></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><AdminContentPage /></ProtectedRoute>} />
            <Route path="/admin/solutions" element={<ProtectedRoute><AdminSolutionsPage /></ProtectedRoute>} />
            <Route path="/admin/solutions/new" element={<ProtectedRoute><AdminSolutionFormPage /></ProtectedRoute>} />
            <Route path="/admin/solutions/:id" element={<ProtectedRoute><AdminSolutionFormPage /></ProtectedRoute>} />
            <Route path="/admin/logs" element={<ProtectedRoute requireRole="admin"><AdminLogsPage /></ProtectedRoute>} />
            <Route path="/admin/suppliers" element={<ProtectedRoute><AdminSuppliersPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </div>
  )
}
