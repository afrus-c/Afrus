import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Send, Facebook, Instagram, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import siteSettings from '../content/site-settings.json';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex group max-w-full" aria-label={`${siteSettings.brand.name} home`}>
              <div className="h-20 sm:h-24 w-[250px] sm:w-[310px] max-w-full transition-transform duration-300 group-hover:scale-[1.03] flex items-center justify-start overflow-visible">
                <img
                  src={siteSettings.brand.footerLogo}
                  alt={`${siteSettings.brand.name} Logo`}
                  className="block h-full w-full object-contain object-left overflow-visible"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors shadow-md"
                title="AFRUS Facebook"
                id="footer-fb-link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-pink-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors shadow-md"
                title="AFRUS Instagram"
                id="footer-ig-link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 hover:bg-sky-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors shadow-md"
                title="AFRUS Telegram"
                id="footer-tg-link"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.phones[0].raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors shadow-md"
                title="AFRUS WhatsApp"
                id="footer-wa-link"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              {t('homePage.footer.text_001')}
            </div>
            <ul className="space-y-2 text-xs">
              <li><Link to="/trade" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_002')}</Link></li>
              <li><Link to="/export-import" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_003')}</Link></li>
              <li><Link to="/study-in-russia" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_004')}</Link></li>
              <li><Link to="/store" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_005')}</Link></li>
              <li><Link to="/events" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_006')}</Link></li>
              <li><Link to="/concierge" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_007')}</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              {t('homePage.footer.text_008')}
            </div>
            <ul className="space-y-2 text-xs">
              <li><Link to="/business-in-russia" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_009')}</Link></li>
              <li><Link to="/business-in-africa" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_010')}</Link></li>
              <li><Link to="/money-transfer" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_011')}</Link></li>
              <li><Link to="/learn-english" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_012')}</Link></li>
              <li><Link to="/learn-french" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_013')}</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">{t('homePage.footer.text_014')}</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              {t('homePage.footer.text_015')}
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">{t('homePage.footer.text_016')}</div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:text-amber-400 font-semibold break-all">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">{t('homePage.footer.text_017')}</div>
                  <a href={`tel:+${CONTACT_INFO.phones[0].raw}`} className="text-white hover:text-amber-400 font-semibold">
                    {CONTACT_INFO.phones[0].number}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">{t('homePage.footer.text_018')}</div>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.phones[0].raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    {CONTACT_INFO.phones[0].number}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Send className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">{t('homePage.footer.text_019')}</div>
                  <a href={CONTACT_INFO.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline font-semibold">
                    {CONTACT_INFO.telegram}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>© {currentYear} {siteSettings.brand.name}. {t('homePage.footer.text_020')}</span>
          </div>

          <div className="text-center sm:text-right text-[11px]">
            {t('homePage.footer.text_021')}
          </div>
        </div>

      </div>
    </footer>
  );
};
