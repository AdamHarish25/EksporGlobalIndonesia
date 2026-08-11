import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustMetrics from '@/components/TrustMetrics'
import FeaturedProduct from '@/components/FeaturedProduct'
import WhyPartner from '@/components/WhyPartner'
import Logistics from '@/components/Logistics'
import Certifications from '@/components/Certifications'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <TrustMetrics />
        <FeaturedProduct />
        <WhyPartner />
        <Logistics />
        <Certifications />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
