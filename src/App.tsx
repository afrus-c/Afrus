import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Trade } from './pages/Trade';
import { ExportImport } from './pages/ExportImport';
import { BusinessInRussia } from './pages/BusinessInRussia';
import { BusinessInAfrica } from './pages/BusinessInAfrica';
import { StudyInRussia } from './pages/StudyInRussia';
import { LearnEnglish } from './pages/LearnEnglish';
import { LearnFrench } from './pages/LearnFrench';
import { MoneyTransfer } from './pages/MoneyTransfer';
import { Concierge } from './pages/Concierge';
import { Store } from './pages/Store';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { Events } from './pages/Events';
import { Festivals } from './pages/Festivals';
import { Forum } from './pages/Forum';
import { News } from './pages/News';
import { Contact } from './pages/Contact';
import { NewsReaderModal } from './components/modals/NewsReaderModal';

import { NewsItem } from './types';

import { WHATSAPP_CONFIG, openWhatsAppConsultation, getWhatsAppMessageForSubject } from './data/content';
import { SeoDefaults } from './components/SeoDefaults';

export default function App() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const handleOpenInquiry = (subject?: string) => {
    openWhatsAppConsultation(getWhatsAppMessageForSubject(subject));
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <SeoDefaults />
        <ScrollToTop />
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
          
          <div>
            <Navbar onOpenInquiry={handleOpenInquiry} />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={<Home onOpenInquiry={handleOpenInquiry} onSelectNews={(art) => setSelectedNews(art)} />}
                />
                <Route
                  path="/about"
                  element={<About onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/trade"
                  element={<Trade onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/export-import"
                  element={<ExportImport onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/business-in-russia"
                  element={<BusinessInRussia onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/business-in-africa"
                  element={<BusinessInAfrica onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/study-in-russia"
                  element={<StudyInRussia onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/learn-english"
                  element={<LearnEnglish onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/learn-french"
                  element={<LearnFrench onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/money-transfer"
                  element={<MoneyTransfer onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/concierge"
                  element={<Concierge onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/store"
                  element={<Store />}
                />
                <Route
                  path="/store/product/:id"
                  element={<ProductDetails />}
                />
                <Route
                  path="/checkout"
                  element={<Checkout />}
                />
                <Route
                  path="/review-order"
                  element={<Checkout />}
                />
                <Route
                  path="/order-review"
                  element={<Checkout />}
                />
                <Route
                  path="/events"
                  element={<Events onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/festivals"
                  element={<Festivals onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/forum"
                  element={<Forum onOpenInquiry={handleOpenInquiry} />}
                />
                <Route
                  path="/news"
                  element={<News onSelectNews={(art) => setSelectedNews(art)} />}
                />
                <Route
                  path="/contact"
                  element={<Contact />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Routes>
            </main>
          </div>
          <Footer />
          <FloatingContactWidget />
          <CartDrawer />
          <NewsReaderModal
            article={selectedNews}
            onClose={() => setSelectedNews(null)}
          />

        </div>
      </Router>
    </CartProvider>
  </LanguageProvider>
  );
}
