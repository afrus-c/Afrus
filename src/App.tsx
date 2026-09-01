import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { NewsReaderModal } from './components/modals/NewsReaderModal';

import { NewsItem } from './types';

import { WHATSAPP_CONFIG, openWhatsAppConsultation, getWhatsAppMessageForSubject } from './data/content';
import { SeoDefaults } from './components/SeoDefaults';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Trade = lazy(() => import('./pages/Trade').then((module) => ({ default: module.Trade })));
const ExportImport = lazy(() => import('./pages/ExportImport').then((module) => ({ default: module.ExportImport })));
const BusinessInRussia = lazy(() => import('./pages/BusinessInRussia').then((module) => ({ default: module.BusinessInRussia })));
const BusinessInAfrica = lazy(() => import('./pages/BusinessInAfrica').then((module) => ({ default: module.BusinessInAfrica })));
const StudyInRussia = lazy(() => import('./pages/StudyInRussia').then((module) => ({ default: module.StudyInRussia })));
const LearnEnglish = lazy(() => import('./pages/LearnEnglish').then((module) => ({ default: module.LearnEnglish })));
const LearnFrench = lazy(() => import('./pages/LearnFrench').then((module) => ({ default: module.LearnFrench })));
const MoneyTransfer = lazy(() => import('./pages/MoneyTransfer').then((module) => ({ default: module.MoneyTransfer })));
const Concierge = lazy(() => import('./pages/Concierge').then((module) => ({ default: module.Concierge })));
const Store = lazy(() => import('./pages/Store').then((module) => ({ default: module.Store })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then((module) => ({ default: module.ProductDetails })));
const Checkout = lazy(() => import('./pages/Checkout').then((module) => ({ default: module.Checkout })));
const Events = lazy(() => import('./pages/Events').then((module) => ({ default: module.Events })));
const Festivals = lazy(() => import('./pages/Festivals').then((module) => ({ default: module.Festivals })));
const Forum = lazy(() => import('./pages/Forum').then((module) => ({ default: module.Forum })));
const News = lazy(() => import('./pages/News').then((module) => ({ default: module.News })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const Legal = lazy(() => import('./pages/Legal').then((module) => ({ default: module.Legal })));

const PageLoading = () => (
  <div className="min-h-[60vh] bg-slate-950 flex items-center justify-center" aria-hidden="true">
    <div className="h-10 w-10 rounded-full border-2 border-slate-700 border-t-amber-400 animate-spin" />
  </div>
);

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
              <Suspense fallback={<PageLoading />}>
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
                <Route path="/legal" element={<Legal />} />
                <Route path="/privacy" element={<Legal />} />
                <Route path="/terms" element={<Legal />} />
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Routes>
              </Suspense>
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
