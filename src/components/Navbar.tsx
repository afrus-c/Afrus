import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  MessageCircle,
  Send,
  Ship,
  GraduationCap,
  Building2,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  Crown,
  Banknote,
  Calendar,
  Newspaper,
  Info,
  Phone,
  ArrowRight,
  Flame,
  Sparkle,
  Tag,
  PackageCheck
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { STORE_CATEGORIES_DATA, STORE_PRODUCTS as PRODUCTS } from '../data/storeProducts';
import { getLocalizedCategory } from '../utils/productLocalization';
import { getDualPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import siteSettings from '../content/site-settings.json';

interface NavbarProps {
  onOpenInquiry: (subject?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language: currentLang, setLanguage: setCurrentLang, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItemsCount, isCartOpen, openCart } = useCart();
  const shouldRemindAboutCart = totalItemsCount > 0 && !isCartOpen;

  const LANGUAGES = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'RU', name: 'Русский', flag: '🇷🇺' }
  ] as const;

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const STORE_CATEGORIES = STORE_CATEGORIES_DATA.map((category) => ({
    name: getLocalizedCategory(category.name, currentLang),
    icon: category.icon,
    path: `/store?category=${encodeURIComponent(category.name)}`
  }));

  const featuredProductSample = PRODUCTS.find((p) => p.isFeatured) || PRODUCTS[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMega(null);
    setLangDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t('homePage.navbar.text_001'), path: '/' },
    {
      name: t('homePage.navbar.text_002'),
      path: '/trade',
      megaKey: 'trade',
      items: [
        { name: t('nav.trade_freight', 'Trade & Freight Corridors'), desc: t('homePage.navbar.text_003'), icon: Ship, path: '/trade' },
        { name: t('homePage.navbar.text_004'), desc: t('homePage.navbar.text_005'), icon: Building2, path: '/export-import' },
        { name: t('nav.money_transfer', 'Money Transfer & Clearing'), desc: t('homePage.navbar.text_006'), icon: Banknote, path: '/money-transfer' }
      ]
    },
    {
      name: t('homePage.navbar.text_007'),
      path: '/study-in-russia',
      megaKey: 'education',
      items: [
        { name: t('nav.study_russia', 'Study in Russia'), desc: t('homePage.navbar.text_008'), icon: GraduationCap, path: '/study-in-russia' },
        { name: t('homePage.navbar.text_009'), desc: t('homePage.navbar.text_010'), icon: Globe, path: '/learn-english' },
        { name: t('homePage.navbar.text_011'), desc: t('homePage.navbar.text_012'), icon: Sparkles, path: '/learn-french' }
      ]
    },
    {
      name: t('homePage.navbar.text_013'),
      path: '/business-in-russia',
      megaKey: 'business',
      items: [
        { name: t('nav.business_russia', 'Business in Russia'), desc: t('homePage.navbar.text_014'), icon: Building2, path: '/business-in-russia' },
        { name: t('nav.business_africa', 'Business in Africa'), desc: t('homePage.navbar.text_015'), icon: Globe, path: '/business-in-africa' },
        { name: t('homePage.navbar.text_016'), desc: t('homePage.navbar.text_017'), icon: Sparkles, path: '/forum' }
      ]
    },
    { name: t('homePage.navbar.text_018'), path: '/concierge', icon: Crown },
    {
      isStorePill: true,
      name: t('homePage.navbar.text_019'),
      path: '/store',
      megaKey: 'store'
    },
    {
      name: t('homePage.navbar.text_020'),
      path: '/events',
      megaKey: 'events',
      items: [
        { name: t('homePage.navbar.text_021'), desc: t('homePage.navbar.text_022'), icon: Calendar, path: '/events' },
        { name: t('homePage.navbar.text_023'), desc: t('homePage.navbar.text_024'), icon: Sparkles, path: '/festivals' },
        { name: t('homePage.navbar.text_025'), desc: t('homePage.navbar.text_026'), icon: Building2, path: '/forum' }
      ]
    },
    { name: t('homePage.navbar.text_027'), path: '/news' },
    { name: t('homePage.navbar.text_028'), path: '/about' },
    { name: t('homePage.navbar.text_029'), path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 py-2.5 sm:py-3 shadow-2xl'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 2xl:px-8">
        <div className="flex items-center justify-between gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none shrink-0"
            id="nav-logo"
          >
            <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              <img
                src={siteSettings.brand.footerLogo}
                alt="AFRUS Logo"
                className="h-9 min-[390px]:h-10 sm:h-14 lg:h-16 w-auto max-w-[108px] min-[390px]:max-w-[124px] sm:max-w-[230px] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>
          <nav className="hidden 2xl:flex flex-1 items-center justify-center gap-0.5 min-w-0">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.isStorePill) {
                return (
                  <div
                    key={link.name}
                    className="relative afrus-store-nav"
                    onMouseEnter={() => setActiveMega('store')}
                    onMouseLeave={() => setActiveMega(null)}
                  >
                    <Link
                      to="/store"
                      className={`mx-0.5 px-2.5 py-1.5 rounded-full text-[11px] font-black tracking-wider transition-all duration-300 flex items-center gap-1 border shadow-lg whitespace-nowrap shrink-0 ${
                        isActive || activeMega === 'store'
                          ? 'bg-blue-700 text-white border-blue-500 shadow-[0_0_22px_rgba(0,57,166,0.42)] scale-105'
                          : 'bg-blue-700 text-white border-blue-500/70 hover:bg-blue-800 hover:border-blue-400 shadow-[0_0_16px_rgba(0,57,166,0.28)] hover:shadow-[0_0_26px_rgba(0,57,166,0.46)] hover:scale-105'
                      }`}
                      id="nav-link-afrus-store-pill"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                          activeMega === 'store' ? 'rotate-180' : ''
                        }`}
                      />
                    </Link>
                    {activeMega === 'store' && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[min(740px,calc(100vw-2rem))] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-slate-950/98 backdrop-blur-2xl border border-amber-500/40 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-5 text-slate-200">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                                <ShoppingBag className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-sm font-black text-white tracking-wide uppercase flex items-center gap-2">
                                  <span>{t('homePage.navbar.text_030')}</span>
                                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black border border-amber-200 shadow-sm">
                                    {t('homePage.navbar.text_031')}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-400">
                                  {t('homePage.navbar.text_032')}
                                </div>
                              </div>
                            </div>

                            <Link
                              to="/store"
                              onClick={() => setActiveMega(null)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                            >
                              <span>{t('homePage.navbar.text_033')}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-5 space-y-4 border-r border-slate-800 pr-4">
                              <div className="text-[11px] font-black uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
                                <Flame className="w-3.5 h-3.5 text-amber-400" />
                                <span>{t('homePage.navbar.text_034')}</span>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <Link
                                  to="/store?tab=featured"
                                  onClick={() => setActiveMega(null)}
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-amber-500/10 text-white font-bold transition-all group"
                                >
                                  <div className="flex items-center gap-2">
                                    <Sparkle className="w-4 h-4 text-amber-400" />
                                    <span>{t('homePage.navbar.text_035')}</span>
                                  </div>
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black border border-amber-200 shadow-sm">
                                    {t('homePage.navbar.text_036')}
                                  </span>
                                </Link>

                                <Link
                                  to="/store?tab=new"
                                  onClick={() => setActiveMega(null)}
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-amber-500/10 text-white font-bold transition-all group"
                                >
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-emerald-400" />
                                    <span>{t('homePage.navbar.text_037')}</span>
                                  </div>
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                                    {t('homePage.navbar.text_038')}
                                  </span>
                                </Link>

                                <Link
                                  to="/store"
                                  onClick={() => setActiveMega(null)}
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-amber-500/10 text-white font-bold transition-all group"
                                >
                                  <div className="flex items-center gap-2">
                                    <PackageCheck className="w-4 h-4 text-sky-400" />
                                    <span>{t('homePage.navbar.text_039')}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400">{t('homePage.navbar.text_040')}</span>
                                </Link>
                              </div>
                              {featuredProductSample && (
                                <div
                                  onClick={() => {
                                    setActiveMega(null);
                                    navigate(`/store/product/${featuredProductSample.id}`);
                                  }}
                                  className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group flex items-center gap-3"
                                >
                                  <img
                                    src={featuredProductSample.image}
                                    alt={featuredProductSample.title}
                                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="min-w-0">
                                    <div className="text-[10px] font-bold text-amber-400 uppercase">{t('homePage.navbar.text_041')}</div>
                                    <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                                      {featuredProductSample.title}
                                    </div>
                                    <div className="text-xs font-black text-amber-400">
                                      {getDualPrice(featuredProductSample.priceUsd, undefined, featuredProductSample.priceRub).rub}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="col-span-7 space-y-3">
                              <div className="text-[11px] font-black uppercase text-amber-400 tracking-widest flex items-center justify-between">
                                <span>{t('homePage.navbar.text_042')}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{STORE_CATEGORIES.length} {t('homePage.navbar.text_043')}</span>
                              </div>

                              <div className="grid grid-cols-2 gap-1.5">
                                {STORE_CATEGORIES.map((cat) => (
                                  <Link
                                    key={cat.name}
                                    to={cat.path}
                                    onClick={() => setActiveMega(null)}
                                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-amber-500/15 hover:border-amber-500/40 transition-colors group"
                                  >
                                    <span className="text-base leading-none p-1 rounded-lg bg-slate-950 border border-slate-800">
                                      {cat.icon}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                                      {cat.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.megaKey && setActiveMega(link.megaKey)}
                  onMouseLeave={() => link.megaKey && setActiveMega(null)}
                >
                  <Link
                    to={link.path}
                    className={`px-1.5 min-[1700px]:px-2.5 py-2 rounded-lg text-[10px] min-[1700px]:text-xs font-bold uppercase tracking-wide min-[1700px]:tracking-wider transition-all flex items-center gap-0.5 whitespace-nowrap shrink-0 ${
                      isActive || activeMega === link.megaKey
                        ? 'text-amber-400 bg-white/10'
                        : 'text-slate-200 hover:text-amber-400 hover:bg-white/5'
                    }`}
                    id={`nav-link-${link.name.toLowerCase()}`}
                  >
                    <span className="whitespace-nowrap">{link.name}</span>
                    {link.megaKey && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform shrink-0 ${
                          activeMega === link.megaKey ? 'rotate-180 text-amber-400' : 'text-slate-400'
                        }`}
                      />
                    )}
                  </Link>
                  {link.items && activeMega === link.megaKey && (
                    <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-slate-900/95 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-3 shadow-2xl">
                        <div className="space-y-1">
                          {link.items.map((subItem) => {
                            const IconComp = subItem.icon;
                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                onClick={() => setActiveMega(null)}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-500/10 transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                                    {subItem.name}
                                  </div>
                                  <div className="text-xs text-slate-400 leading-tight">
                                    {subItem.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <a
            href={`tel:+${CONTACT_INFO.phones[0].raw}`}
            className="navbar-call-link hidden 2xl:mr-16 2xl:inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b32632]/45 bg-[#8f2630] !text-white shadow-lg cursor-pointer"
            aria-label={`${t('homePage.navbar.callRussia')} ${CONTACT_INFO.phones[0].number}`}
            title={`${t('homePage.navbar.callRussia')} ${CONTACT_INFO.phones[0].number}`}
          >
            <Phone className="navbar-call-icon h-4 w-4" />
          </a>
          <div className="hidden 2xl:flex items-center gap-2 shrink-0">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex h-10 items-center gap-2 rounded-xl border border-blue-700/30 bg-white/95 px-3 text-xs font-semibold text-slate-950 shadow-sm transition-all hover:border-blue-700"
                id="language-dropdown-button"
              >
                <span className="text-base leading-none">{currentLangObj.flag}</span>
                <span className="font-bold">{currentLangObj.code}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-blue-700 transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-52 py-1.5 bg-white/98 backdrop-blur-xl border border-blue-700/25 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      {t('homePage.navbar.text_044')}
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                          currentLang === lang.code
                            ? 'bg-blue-700 text-white font-bold'
                            : 'text-slate-950 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono uppercase">
                          {lang.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={openCart}
              className={`relative p-2.5 rounded-xl bg-blue-700 border border-blue-500 text-white hover:bg-blue-800 transition-all flex items-center justify-center shadow-md group cursor-pointer ${shouldRemindAboutCart ? 'cart-has-items' : ''}`}
              title="Shopping Cart"
              id="navbar-cart-button"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItemsCount > 0 && (
                <span aria-live="polite" className="cart-count-badge absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-700 text-white text-[10px] font-black flex items-center justify-center shadow-lg border-2 border-white">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
          <div className="flex 2xl:hidden items-center gap-1 sm:gap-2 shrink-0 min-w-0">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="h-9 min-w-9 px-1.5 min-[390px]:px-2 sm:h-10 sm:px-2.5 rounded-xl bg-white/95 border border-blue-700/30 text-slate-950 flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm hover:border-blue-700 transition-colors"
                aria-label={`${t('homePage.navbar.text_044')} — ${currentLangObj.name}`}
                aria-expanded={langDropdownOpen}
              >
                <span className="hidden min-[360px]:inline text-sm sm:text-base leading-none" aria-hidden="true">{currentLangObj.flag}</span>
                <span className="text-[10px] sm:text-[11px] font-black uppercase">{currentLangObj.code}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-blue-700 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <>
                  <button
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setLangDropdownOpen(false)}
                    aria-label="Close language menu"
                  />
                  <div className="absolute right-0 top-full mt-2 z-50 w-[min(17rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-blue-700/25 bg-white/98 p-1.5 shadow-2xl backdrop-blur-xl">
                    <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      {t('homePage.navbar.text_044')}
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${
                          currentLang === lang.code
                            ? 'bg-blue-700 text-white font-black'
                            : 'text-slate-950 hover:bg-blue-50'
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span className="text-base leading-none" aria-hidden="true">{lang.flag}</span>
                          <span className="truncate">{lang.name}</span>
                        </span>
                        <span className={`ml-3 text-[10px] font-mono uppercase ${currentLang === lang.code ? 'text-white' : 'text-slate-500'}`}>
                          {lang.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={openCart}
              className={`relative h-9 w-9 sm:h-10 sm:w-10 p-1.5 sm:p-2 rounded-xl bg-blue-700 border border-blue-500 text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer ${shouldRemindAboutCart ? 'cart-has-items' : ''}`}
              title="Shopping Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {totalItemsCount > 0 && (
                <span aria-live="polite" className="cart-count-badge absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 rounded-full bg-red-700 text-white text-[10px] font-black flex items-center justify-center border border-white">
                  {totalItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onOpenInquiry(t('nav.consultationSubject'))}
              className="hidden sm:inline-flex px-3 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs max-w-36 truncate"
            >
              {t('homePage.navbar.text_045')}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 sm:h-10 sm:w-10 p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 focus:outline-none flex items-center justify-center shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="2xl:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-amber-500/30 px-3 sm:px-5 pt-3 sm:pt-4 pb-5 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-between min-w-0 ${
                  location.pathname === link.path
                    ? link.isStorePill
                      ? 'bg-blue-700 text-white border-blue-500 shadow-md'
                      : 'bg-amber-500 text-slate-950 border-amber-400'
                    : link.isStorePill
                    ? 'bg-blue-700 border-blue-500 text-white font-black shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:text-amber-400'
                }`}
              >
                <span className="flex items-center gap-2 min-w-0 text-left">
                  {link.isStorePill && <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0" />}
                  <span className="break-words leading-snug">{link.name}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={`tel:+${CONTACT_INFO.phones[0].raw}`}
              className="navbar-call-link w-full py-2.5 rounded-xl bg-[#8f2630] border border-[#b32632]/50 !text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              aria-label={`${t('homePage.navbar.callRussia')} ${CONTACT_INFO.phones[0].number}`}
            >
              <Phone className="navbar-call-icon w-4 h-4 shrink-0" />
              <span>{t('homePage.navbar.callRussia')}</span>
            </a>
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-400 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>{t('homePage.navbar.text_047')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
