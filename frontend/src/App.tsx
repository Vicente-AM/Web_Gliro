import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ProductsSection } from './components/ProductsSection';
import { SolutionsSlider } from './components/SolutionsSlider';
import { AdvisorBanner } from './components/AdvisorBanner';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsMarquee } from './components/TestimonialsMarquee';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CookieBanner } from './components/CookieBanner';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsConditionsModal } from './components/TermsConditionsModal';

export const App: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#privacidad') {
        setPrivacyModalOpen(true);
      } else if (window.location.hash === '#terminos') {
        setTermsModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-secondary selection:bg-brand-highlight selection:text-brand-tertiary relative isolate">
      {/* Global Subtle Background Grid & Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-20 bg-grid-pattern"></div>
      
      {/* Top Left Neon Highlight Glow */}
      <div className="fixed top-0 left-0 -z-10 w-[42rem] h-[42rem] bg-brand-highlight/15 rounded-full blur-[130px] opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      {/* Bottom Right Ambient Glow */}
      <div className="fixed bottom-0 right-0 -z-10 w-[35rem] h-[35rem] bg-emerald-100/50 rounded-full blur-[140px] opacity-70 translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

      {/* Main Layout */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <WhyChooseUsSection />
        <ProductsSection />
        <SolutionsSlider />
        <AdvisorBanner />
        <PortfolioSection />
        <TestimonialsMarquee />
        <FaqAccordion />
        <ContactSection />
        <Footer
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
          onOpenTerms={() => setTermsModalOpen(true)}
        />
        <FloatingWhatsApp />
        <CookieBanner onOpenPrivacy={() => setPrivacyModalOpen(true)} />
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => {
          setPrivacyModalOpen(false);
          if (window.location.hash === '#privacidad') {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />

      {/* Terms and Conditions Modal */}
      <TermsConditionsModal
        isOpen={termsModalOpen}
        onClose={() => {
          setTermsModalOpen(false);
          if (window.location.hash === '#terminos') {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />
    </div>
  );
};

export default App;
