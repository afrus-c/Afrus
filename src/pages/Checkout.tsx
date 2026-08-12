import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getDualPrice, formatUsd, formatRub } from '../utils/currency';
import {
  ShoppingBag,
  ArrowLeft,
  MessageCircle,
  Send,
  Info,
  Copy,
  Check,
  PackageCheck,
  User,
  MapPin,
  FileText
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import {
  generateOrderInquiryText,
  getWhatsAppOrderUrl,
  getTelegramOrderUrl,
  TELEGRAM_CONFIG,
  WHATSAPP_CONFIG
} from '../utils/orderInquiry';

import { useLanguage } from '../context/LanguageContext';
import { getDefaultShippingMethod, getLocalizedCheckoutSettings } from '../utils/operationalSettings';

export const Checkout: React.FC = () => {
  const { items, totalItemsCount, totalUsdPrice, totalRubPrice, exchangeRate } = useCart();
  const { language, t } = useLanguage();
  const checkoutSettings = getLocalizedCheckoutSettings(language);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [shippingMethodId, setShippingMethodId] = useState(getDefaultShippingMethod()?.id ?? '');
  const shippingMethod = checkoutSettings.shippingMethods.find((method) => method.id === shippingMethodId);
  const shippingUsd = shippingMethod?.priceUsd ?? 0;
  const shippingRub = shippingMethod?.priceRub ?? shippingUsd * exchangeRate;
  const orderTotalUsd = totalUsdPrice + shippingUsd;
  const orderTotalRub = totalRubPrice + shippingRub;

  const orderMessageText = generateOrderInquiryText(
    items,
    orderTotalUsd,
    orderTotalRub,
    exchangeRate,
    { fullName, location, notes },
    language,
    { shippingMethod, messagePrefix: checkoutSettings.orderMessagePrefix, paymentInstructions: checkoutSettings.paymentInstructions }
  );

  const whatsappUrl = getWhatsAppOrderUrl(orderMessageText);
  const telegramUrl = getTelegramOrderUrl(orderMessageText);

  const handleCopyText = () => {
    navigator.clipboard.writeText(orderMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-white">{t('checkout.empty_title', 'Your Order Inquiry Cart is Empty')}</h1>
          <p className="text-slate-400 text-sm">{t('checkout.empty_description', 'Please select items from the AFRUS Store catalog to build your order inquiry.')}</p>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('checkout.browse_store', 'Browse AFRUS Store')}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link
            to="/store"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('checkout.back_store', 'Back to Store')}</span>
          </Link>

          <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">
            {t('checkout.review_label', 'Order Review & Inquiry')}
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-white tracking-wide uppercase">
                {t('checkout.review_title', 'Review Your Order Inquiry')}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {t('checkout.review_description', 'Verify your selected items and send your order directly to AFRUS via WhatsApp or Telegram.')}
              </p>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-wider shrink-0 flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-amber-400" />
              <span>{t('checkout.ready', 'Order Inquiry Ready')}</span>
            </div>
          </div>
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-amber-500/30 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
              <Info className="w-5 h-5 shrink-0" />
              <span>{t('checkout.how_it_works', 'How Order Inquiries Work at AFRUS Store')}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {t('checkout.explanation', 'The AFRUS Store operates as a product discovery and order inquiry system. No online payment details or credit cards are collected on this website. Send your structured cart via WhatsApp or Telegram to confirm product availability, final shipping options, delivery times, and direct payment arrangements with the AFRUS team.')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 px-1">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  Cart Items ({totalItemsCount})
                </h3>
                <span className="text-[11px] sm:text-xs text-amber-400 font-bold">{t('checkout.dual_currency', 'Dual Currency ($ & ₽)')}</span>
              </div>

              <div className="space-y-3">
                {items.map((item) => {
                  const dualUnit = getDualPrice(item.product.priceUsd, exchangeRate, item.product.priceRub);
                  const dualSubtotal = getDualPrice(item.product.priceUsd * item.quantity, exchangeRate, item.product.priceRub != null ? item.product.priceRub * item.quantity : undefined);

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedSize || 'nosize'}`}
                      className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800 bg-slate-900">
                          <ImageWithFallback
                            src={item.product.image}
                            alt={item.product.title}
                            fallbackTitle={item.product.title}
                            fallbackCategory={item.product.category}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-sm font-bold text-white leading-snug break-words">
                            {item.product.title}
                          </h4>
                          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2 flex-wrap pt-0.5">
                            <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px]">
                              {item.product.category}
                            </span>
                            {item.selectedSize && (
                              <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-200 text-[11px] border border-slate-700">
                                Size: {item.selectedSize}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="text-slate-300 font-medium bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800/80 flex items-center gap-1.5 flex-wrap">
                          <span className="text-slate-400 font-bold uppercase text-[10px]">{t('checkout.qty', 'Qty:')}</span>
                          <span className="text-white font-black">{item.quantity}</span>
                          <span className="text-slate-500">×</span>
                          <span className="text-amber-400 font-bold">{dualUnit.rub}</span>
                          <span className="text-slate-400 text-[11px]">({dualUnit.usd})</span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-2 bg-amber-500/10 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-xl border border-amber-500/20 sm:border-0">
                          <span className="text-[10px] uppercase text-amber-400 font-extrabold sm:hidden">{t('checkout.item_subtotal', 'Item Subtotal:')}</span>
                          <div className="text-right">
                            <span className="text-sm font-black text-amber-400">{dualSubtotal.rub}</span>
                            <span className="text-xs font-bold text-slate-300 ml-1.5">({dualSubtotal.usd})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 bg-slate-950 p-4 rounded-2xl border border-amber-500/20">
                <div>
                  <div className="text-xs font-black uppercase text-amber-400 tracking-wider">{t('checkout.estimated_cart_total', 'Estimated Cart Total')}</div>
                  <div className="text-[10px] text-slate-400">Rate: 1 USD = {exchangeRate} RUB</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl font-black text-amber-400">{formatRub(totalRubPrice)}</div>
                  <div className="text-base font-bold text-slate-200">{formatUsd(totalUsdPrice)}</div>
                </div>
              </div>

            </div>

            {checkoutSettings.shippingMethods.length > 0 && (
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  {t('checkout.shipping_method', 'Shipping Method')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {checkoutSettings.shippingMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setShippingMethodId(method.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${shippingMethodId === method.id ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-950'}`}
                    >
                      <span className="block text-sm font-bold text-white">{method.label}</span>
                      <span className="block text-xs text-slate-400 mt-1">{method.description}</span>
                      <span className="block text-xs font-black text-amber-400 mt-2">
                        {method.priceRub > 0 ? `${formatRub(method.priceRub)} (${formatUsd(method.priceUsd)})` : t('checkout.free', 'Free')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>{t('checkout.optional_info', 'Optional Customer Information (Appended to Message)')}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t('checkout.your_name', 'Your Name')}</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('checkout.name_placeholder', 'e.g., Amara Okafor')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t('checkout.delivery_location', 'Delivery City / Country')}</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t('checkout.location_placeholder', 'e.g., Moscow, Russia / Lagos, Nigeria')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t('checkout.special_note', 'Special Delivery Note / Questions')}</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t('checkout.note_placeholder', 'e.g., Express courier requested / Requesting custom sizes')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>{t('checkout.message_preview', 'Generated Message Preview')}</span>
                </h3>

                <button
                  onClick={handleCopyText}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{t('checkout.copied', 'Copied!')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('checkout.copy_message', 'Copy Message')}</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {orderMessageText}
              </pre>
            </div>

          </div>
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-6 shadow-2xl">
              <div className="space-y-1">
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  {t('checkout.send_heading', 'Send Order Inquiry')}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('checkout.send_description', 'Select your preferred messenger to connect with AFRUS.')}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 text-center space-y-1">
                <span className="text-xs uppercase font-bold text-slate-400">{t('checkout.estimated_total', 'Estimated Total')}</span>
                <div className="text-2xl font-black text-amber-400">
                  {formatRub(orderTotalRub)}
                </div>
                <div className="text-sm font-bold text-slate-200">
                  {formatUsd(orderTotalUsd)}
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/25 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>{t('checkout.send_whatsapp', 'Send Order via WhatsApp')}</span>
                </a>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-sky-600/25 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>{t('checkout.send_telegram', 'Send Order via Telegram')}</span>
                </a>

                <button
                  onClick={handleCopyText}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-slate-700"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? t('checkout.text_copied', 'Text Copied to Clipboard!') : t('checkout.copy_order', 'Copy Order Text')}</span>
                </button>
              </div>
              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t('checkout.assurances.response', 'Direct response from AFRUS sales team with availability confirmation.')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{checkoutSettings.paymentInstructions}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t('checkout.assurances.shipping', 'Express courier & dispatch across Moscow, Russia, and Africa.')}</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => navigate('/store')}
                  className="text-xs font-bold text-slate-400 hover:text-white underline transition-colors"
                >
                  {t('checkout.continue_shopping', 'Continue Shopping')}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
