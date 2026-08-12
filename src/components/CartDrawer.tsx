import React, { useState, useRef } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Send,
  Info,
  Tag,
  Truck,
  Bookmark,
  Check,
  Copy,
  Sparkles,
  FileText,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Gift,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getDualPrice, formatUsd, formatRub } from '../utils/currency';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './common/ImageWithFallback';
import {
  generateOrderInquiryText,
  getWhatsAppOrderUrl,
  getTelegramOrderUrl,
} from '../utils/orderInquiry';
import { commerceSettings, getDefaultShippingMethod, getLocalizedCheckoutSettings } from '../utils/operationalSettings';

type CartTab = 'items' | 'notes' | 'promo' | 'saved';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItemsCount,
    totalUsdPrice,
    totalRubPrice,
    isCartOpen,
    closeCart,
    exchangeRate
  } = useCart();
  const { language, t, trans } = useLanguage();
  const checkoutSettings = getLocalizedCheckoutSettings(language);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CartTab>('items');
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -140 : 140,
        behavior: 'smooth'
      });
    }
  };
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState(getDefaultShippingMethod()?.id ?? '');
  const [orderNote, setOrderNote] = useState('');
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [copiedText, setCopiedText] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = commerceSettings.freeShippingThresholdRub;
  const progressToFreeShipping = FREE_SHIPPING_THRESHOLD > 0
    ? Math.min(100, Math.round((totalRubPrice / FREE_SHIPPING_THRESHOLD) * 100))
    : 100;
  const amountToFreeShippingRub = Math.max(0, FREE_SHIPPING_THRESHOLD - totalRubPrice);
  const amountToFreeShippingUsd = amountToFreeShippingRub / exchangeRate;
  const discountPercent = appliedPromo ? appliedPromo.percent : 0;
  const discountUsd = totalUsdPrice * (discountPercent / 100);
  const discountRub = totalRubPrice * (discountPercent / 100);

  const finalUsdTotal = Math.max(0, totalUsdPrice - discountUsd);
  const finalRubTotal = Math.max(0, totalRubPrice - discountRub);
  const handleReviewOrderClick = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleBrowseStoreClick = () => {
    closeCart();
    navigate('/store');
  };
  const handleApplyPromo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = promoCodeInput.trim().toUpperCase();
    
    if (!cleanCode) {
      setPromoError(trans('Please enter a valid code', 'Veuillez saisir un code valide', 'Введите промокод'));
      return;
    }

    const configuredPromo = commerceSettings.promoCodes.find((promo) => promo.code.toUpperCase() === cleanCode);
    if (configuredPromo) {
      setAppliedPromo({ code: cleanCode, percent: configuredPromo.percent });
      setPromoSuccess(`${configuredPromo.percent}% ${trans('discount applied!', 'de réduction appliquée !', 'скидка применена!')}`);
      setPromoError('');
    } else {
      setPromoError(trans('Invalid promo code', 'Code promo invalide', 'Неверный промокод'));
      setPromoSuccess('');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoSuccess('');
    setPromoError('');
  };
  const handleSaveForLater = (item: CartItem) => {
    removeFromCart(item.product.id, item.selectedSize);
    setSavedItems((prev) => [...prev, item]);
  };

  const handleMoveToCart = (item: CartItem) => {
    setSavedItems((prev) => prev.filter((i) => !(i.product.id === item.product.id && i.selectedSize === item.selectedSize)));
    updateQuantity(item.product.id, item.quantity, item.selectedSize);
  };
  const selectedShippingMethod = checkoutSettings.shippingMethods.find((method) => method.id === deliveryMethod);

  const formattedNotes = [
    selectedShippingMethod ? `${t('cart.delivery_method', 'Delivery Method')}: ${selectedShippingMethod.label}` : null,
    appliedPromo ? `${t('cart.applied_promo', 'Applied Promo Code')}: ${appliedPromo.code} (${appliedPromo.percent}% ${t('cart.off', 'OFF')})` : null,
    orderNote ? `${t('cart.customer_request', 'Customer Request')}: ${orderNote}` : null
  ].filter(Boolean).join('\n');

  const orderText = generateOrderInquiryText(
    items,
    finalUsdTotal,
    finalRubTotal,
    exchangeRate,
    { notes: formattedNotes },
    language,
    { shippingMethod: selectedShippingMethod, messagePrefix: checkoutSettings.orderMessagePrefix, paymentInstructions: checkoutSettings.paymentInstructions }
  );

  const whatsappUrl = getWhatsAppOrderUrl(orderText);
  const telegramUrl = getTelegramOrderUrl(orderText);
  const handleCopyOrderSummary = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex z-50 overflow-hidden">
        <div className="afrus-store-theme w-full sm:w-[520px] md:w-[680px] lg:w-[920px] xl:w-[1020px] max-w-full h-[100dvh] bg-slate-950 border-l slide-in-from-right border-amber-500/30 text-white shadow-2xl flex flex-col justify-between duration-300 overflow-x-hidden">
          <div className="p-3 sm:p-5 border-b border-slate-800/90 bg-slate-900/95 shrink-0 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-xl font-black text-white tracking-wide uppercase truncate">
                      {t('cart.title', 'AFRUS Cart')}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 border border-amber-200 text-[10px] sm:text-xs font-black shrink-0 shadow-sm">
                      {totalItemsCount}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                    {totalItemsCount === 0
                      ? trans('Your cart is empty', 'Votre panier est vide', 'Ваша корзина пуста')
                      : `${totalItemsCount} ${totalItemsCount === 1 ? trans('item', 'article', 'товар') : trans('items', 'articles', 'товаров')} ${trans('selected', 'sélectionné(s)', 'выбрано')}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={handleBrowseStoreClick}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer"
                  title={trans('Continue Shopping', 'Continuer vos achats', 'Продолжить покупки')}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline sm:inline">{trans('Shop More', 'Boutique', 'Магазин')}</span>
                </button>

                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('cart.clear', 'Clear')}</span>
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
                  aria-label={t('cart.close', 'Close cart')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {items.length > 0 && (
              <div className="relative flex items-center gap-1 pt-1 pb-1">
                <button
                  type="button"
                  onClick={() => scrollTabs('left')}
                  className="p-1.5 rounded-lg bg-slate-900 text-amber-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors shrink-0 cursor-pointer shadow-sm"
                  title={t('cart.scroll_left', 'Scroll tabs left')}
                  aria-label={t('cart.scroll_left', 'Scroll tabs left')}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <div
                  ref={tabsRef}
                  className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scroll-smooth touch-pan-x no-scrollbar py-0.5 w-full min-w-0"
                >
                  <button
                    onClick={() => setActiveTab('items')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      activeTab === 'items'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{trans('Cart Items', 'Articles', 'Товары')} ({totalItemsCount})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('promo')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      activeTab === 'promo'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{trans('Promo Code', 'Code Promo', 'Промокод')}</span>
                    {appliedPromo && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      activeTab === 'notes'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 shadow-inner'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>{trans('Delivery Notes', 'Notes & Livraison', 'Доставка и примечание')}</span>
                    {orderNote && (
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </button>

                  {savedItems.length > 0 && (
                    <button
                      onClick={() => setActiveTab('saved')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                        activeTab === 'saved'
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{trans('Saved for Later', 'Sauvegardés', 'Отложенные')} ({savedItems.length})</span>
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => scrollTabs('right')}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:text-white hover:bg-amber-500/30 border border-amber-500/30 transition-colors shrink-0 cursor-pointer shadow-sm animate-pulse"
                  title={t('cart.scroll_right', 'Scroll tabs right')}
                  aria-label={t('cart.scroll_right', 'Scroll tabs right')}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="px-3.5 sm:px-6 py-2 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-b border-amber-500/20 text-xs shrink-0 space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5 text-white font-bold min-w-0 flex-1">
                  <Truck className="w-4 h-4 text-[#4f6f96] shrink-0" />
                  {progressToFreeShipping >= 100 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#b9dcc8] bg-[#e9f6ef] px-2.5 py-1 text-[#245b3c] font-extrabold leading-snug shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#397955]" />
                      <span>{trans('You unlocked FREE Express Delivery!', 'Vous bénéficiez de la livraison GRATUITE !', 'Вам доступна БЕСПЛАТНАЯ экспресс-доставка!')}</span>
                    </span>
                  ) : (
                    <span className="truncate">
                      {trans('Add ', 'Ajoutez ', 'Добавьте ')}
                      <strong className="inline-flex mx-1 px-2 py-0.5 rounded-md bg-amber-300 text-slate-950 font-black whitespace-nowrap shadow-sm border border-amber-100">{formatRub(amountToFreeShippingRub)} ({formatUsd(amountToFreeShippingUsd)})</strong>
                      {trans(' more for FREE Express Delivery!', ' de plus pour la livraison GRATUITE !', ' для БЕСПЛАТНОЙ доставки!')}
                    </span>
                  )}
                </div>
                <span className="font-extrabold text-slate-200 shrink-0">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-6 lg:p-8 w-full max-w-full">
            {items.length === 0 && savedItems.length === 0 ? (
              /* EMPTY CART VIEW */
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center py-12 space-y-5">
                <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-2xl relative">
                  <ShoppingBag className="w-10 h-10 text-amber-400/80" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </div>
                </div>
                
                <div className="space-y-1.5 max-w-sm">
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                    {trans('Your Cart is Empty', 'Votre panier est vide', 'Ваша корзина пуста')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {trans(
                      'Explore our authentic African foods, spices, wear, and handcrafted goods from AFRUS Store.',
                      'Découvrez nos produits africains authentiques, épices, vêtements et produits artisanaux.',
                      'Исследуйте аутентичные африканские продукты, специи, одежду и ремесленные изделия в AFRUS Store.'
                    )}
                  </p>
                </div>

                <button
                  onClick={handleBrowseStoreClick}
                  className="mt-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <span>{trans('Explore AFRUS Store', 'Explorer la Boutique', 'Перейти в каталог')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* ACTIVE CART CONTENT BY TAB */
              <div className="space-y-6">
                {activeTab === 'items' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    <div className="lg:col-span-7 xl:col-span-8 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h3 className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
                          <span>{trans('Selected Products', 'Produits sélectionnés', 'Выбранные товары')}</span>
                          <span className="text-amber-400 text-xs font-bold">({items.length})</span>
                        </h3>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          {trans('Primary currency: RUB (₽) · USD ($) reference', 'Devise principale : RUB (₽) · USD ($) indicatif', 'Основная валюта: RUB (₽) · USD ($) справочно')}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {items.map((item) => {
                          const maxStock = item.product.inStockCount ?? (item.product.inStock ? 10 : 0);
                          const dualPrice = getDualPrice(item.product.priceUsd, exchangeRate, item.product.priceRub);
                          const dualTotal = getDualPrice(item.product.priceUsd * item.quantity, exchangeRate, item.product.priceRub != null ? item.product.priceRub * item.quantity : undefined);

                          return (
                            <div
                              key={`${item.product.id}-${item.selectedSize || 'nosize'}`}
                              className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/30 p-3 sm:p-4 transition-all duration-200 shadow-md hover:shadow-xl space-y-3"
                            >
                              <div className="flex items-start gap-3">
                                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 border border-slate-800 bg-slate-950">
                                  <ImageWithFallback
                                    src={item.product.image}
                                    alt={item.product.title}
                                    fallbackTitle={item.product.title}
                                    fallbackCategory={item.product.category}
                                    containerClassName="w-full h-full"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute bottom-1 left-1 right-1 z-10">
                                    {maxStock <= 0 ? (
                                      <span className="w-full flex items-center justify-center text-[9px] font-extrabold px-1 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-500/50 backdrop-blur-md shadow-sm">
                                        {t('stock.out', 'Out of Stock')}
                                      </span>
                                    ) : maxStock <= 5 ? (
                                      <span className="w-full flex items-center justify-center text-[9px] font-extrabold px-1 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-500/50 backdrop-blur-md shadow-sm">
                                        Low ({maxStock})
                                      </span>
                                    ) : (
                                      <span className="w-full flex items-center justify-center text-[9px] font-extrabold px-1 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 backdrop-blur-md shadow-sm">
                                        {t('stock.in', 'In Stock')}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug break-words">
                                    {item.product.title}
                                  </h4>

                                  <div className="text-[11px] text-amber-400 font-semibold break-words flex items-center gap-1.5 flex-wrap">
                                    <span>{item.product.category}</span>
                                    {item.selectedSize && (
                                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px]">
                                        {trans('Size:', 'Taille:', 'Размер:')} {item.selectedSize}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0 -mr-1 -mt-1">
                                  <button
                                    onClick={() => handleSaveForLater(item)}
                                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                    title={trans('Save for Later', 'Sauvegarder pour plus tard', 'Отложить на потом')}
                                  >
                                    <Bookmark className="w-4 h-4" />
                                  </button>

                                  <button
                                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                    title={trans('Remove Item', 'Supprimer', 'Удалить')}
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-4 h-4 text-rose-400" />
                                  </button>
                                </div>
                              </div>
                              <div className="pt-2.5 border-t border-slate-800/80 text-xs space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3">
                                <div className="flex items-center justify-between sm:block">
                                  <div>
                                    <span className="text-[10px] uppercase text-slate-400 font-bold block">{trans('Unit Price', 'Prix unitaire', 'Цена за ед.')}</span>
                                    <div className="font-bold text-slate-200">
                                      <span className="text-amber-400 mr-1">{dualPrice.rub}</span>
                                      <span className="text-slate-400 text-[11px]">({dualPrice.usd})</span>
                                    </div>
                                  </div>
                                  <div className="sm:hidden flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
                                    <button
                                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                                      title="Decrease quantity"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>

                                    <span className="px-2.5 text-xs font-black text-white min-w-[24px] text-center">
                                      {item.quantity}
                                    </span>

                                    <button
                                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                                      disabled={maxStock > 0 && item.quantity >= maxStock}
                                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                      title="Increase quantity"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                                <div className="hidden sm:flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                                    title="Decrease quantity"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>

                                  <span className="px-3 text-xs font-black text-white min-w-[28px] text-center">
                                    {item.quantity}
                                  </span>

                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                                    disabled={maxStock > 0 && item.quantity >= maxStock}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                    title="Increase quantity"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="flex items-center justify-between sm:block sm:text-right pt-2 sm:pt-0 border-t border-slate-800/50 sm:border-t-0">
                                  <span className="text-[10px] uppercase text-amber-400 font-bold block">{trans('Item Total', 'Total article', 'Итого')}</span>
                                  <div className="font-black">
                                    <span className="text-sm sm:text-base text-amber-400 mr-1">{dualTotal.rub}</span>
                                    <span className="text-xs text-slate-300">({dualTotal.usd})</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-amber-500/20 space-y-4 shadow-xl">
                        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>{trans('Order Summary', 'Résumé de Commande', 'Сумма заказа')}</span>
                          </h3>
                          <span className="text-xs text-amber-400 font-semibold">{totalItemsCount} {trans('items', 'articles', 'тов.')}</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center text-slate-300">
                            <span>{trans('Subtotal', 'Sous-total', 'Подытог')} ({totalItemsCount})</span>
                            <span className="font-bold text-white">{formatRub(totalRubPrice)} ({formatUsd(totalUsdPrice)})</span>
                          </div>

                          {appliedPromo && (
                            <div className="flex justify-between items-center text-emerald-400 font-medium">
                              <span className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {trans('Discount', 'Réduction', 'Скидка')} ({appliedPromo.code})
                              </span>
                              <span>-{formatRub(discountRub)} (-{formatUsd(discountUsd)})</span>
                            </div>
                          )}

                          <div className="flex justify-between items-center text-slate-300">
                            <span>{trans('Delivery', 'Livraison', 'Доставка')}</span>
                            <span className={progressToFreeShipping >= 100 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                              {progressToFreeShipping >= 100
                                ? trans('FREE Express', 'GRATUITE', 'БЕСПЛАТНО')
                                : trans('Calculated at inquiry', 'Calculé à la demande', 'Уточняется')}
                            </span>
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                                {trans('Estimated Total', 'Total Estimé', 'Итоговая сумма')}
                              </div>
                              <div className="text-[10px] text-slate-400">1 USD = {exchangeRate} RUB</div>
                            </div>

                            <div className="text-right">
                              <div className="text-xl sm:text-2xl font-black text-amber-400">{formatRub(finalRubTotal)}</div>
                              <div className="text-xs sm:text-sm font-bold text-slate-200">{formatUsd(finalUsdTotal)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2.5 pt-1">
                          <button
                            onClick={handleReviewOrderClick}
                            className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                          >
                            <span>{trans('Proceed to Checkout', 'Passer la Commande', 'Перейти к оформлению')}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleBrowseStoreClick}
                            className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <ShoppingBag className="w-4 h-4 text-amber-400" />
                            <span>{trans('Continue Shopping', 'Continuer vos achats', 'Продолжить покупки')}</span>
                          </button>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4 fill-white text-emerald-600 shrink-0" />
                            <span>{trans('Order via WhatsApp', 'Commander par WhatsApp', 'Заказать через WhatsApp')}</span>
                          </a>
                          <a
                            href={telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            <Send className="w-4 h-4 text-white shrink-0" />
                            <span>{trans('Order via Telegram', 'Commander par Telegram', 'Заказать через Telegram')}</span>
                          </a>
                          <button
                            onClick={handleCopyOrderSummary}
                            className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            {copiedText ? (
                              <>
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-400">{trans('Order Copied!', 'Copié !', 'Скопировано!')}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-slate-400" />
                                <span>{trans('Copy Order Details', 'Copier le résumé', 'Скопировать текст заказа')}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{trans('100% Authentic Products', 'Produits 100% authentiques', '100% Подлинность')}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{trans('Express Russia Shipping', 'Livraison Express Russie', 'Быстрая доставка')}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                )}
                {activeTab === 'promo' && (
                  <div className="max-w-xl mx-auto p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {trans('Apply Discount Promo Code', 'Appliquer un Code Promo', 'Применить промокод')}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {trans('Save on your order with active AFRUS coupons', 'Économisez sur votre commande avec nos coupons', 'Сэкономьте на заказе с помощью активных купонов')}
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleApplyPromo} className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value)}
                          placeholder={trans('Enter code (e.g. AFRUS10)', 'Entrez le code', 'Введите код (напр. AFRUS10)')}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                        />
                        <button
                          type="submit"
                          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          {trans('Apply', 'Appliquer', 'Применить')}
                        </button>
                      </div>

                      {promoError && (
                        <p className="text-xs text-rose-400 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" />
                          <span>{promoError}</span>
                        </p>
                      )}

                      {promoSuccess && (
                        <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{promoSuccess}</span>
                        </p>
                      )}
                    </form>
                    {appliedPromo && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-emerald-300">
                          <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <span className="font-bold uppercase tracking-wider block text-white">{appliedPromo.code}</span>
                            <span>{appliedPromo.percent}% {trans('discount active on current cart', 'réduction active', 'скидка активна')}</span>
                          </div>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="text-xs text-rose-400 hover:underline font-semibold cursor-pointer"
                        >
                          {trans('Remove', 'Retirer', 'Удалить')}
                        </button>
                      </div>
                    )}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        {trans('Popular Promo Codes:', 'Codes Promo Populaires :', 'Популярные промокоды:')}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {commerceSettings.promoCodes.map((promo) => (
                          <button
                            key={promo.code}
                            type="button"
                            onClick={() => {
                              setPromoCodeInput(promo.code);
                              setAppliedPromo({ code: promo.code, percent: promo.percent });
                              setPromoSuccess(`${promo.percent}% ${trans('discount applied!', 'de réduction appliquée !', 'скидка применена!')}`);
                            }}
                            className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left transition-all cursor-pointer space-y-0.5"
                          >
                            <div className="font-bold text-amber-400">{promo.code}</div>
                            <div className="text-[11px] text-slate-400">{promo.percent}% {trans('discount', 'de réduction', 'скидка')}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('items')}
                      className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      ← {trans('Back to Cart Items', 'Retour aux articles', 'Назад к корзине')}
                    </button>
                  </div>
                )}
                {activeTab === 'notes' && (
                  <div className="max-w-xl mx-auto p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {trans('Delivery Preferences & Request Notes', 'Livraison & Notes', 'Параметры доставки и пожелания')}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {trans('Specify custom delivery method or special requests for AFRUS team', 'Spécifiez le mode de livraison ou des instructions spéciales', 'Укажите удобный способ доставки или особые пожелания')}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                        {trans('Preferred Delivery Method:', 'Mode de livraison préféré :', 'Способ доставки:')}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {checkoutSettings.shippingMethods.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setDeliveryMethod(m.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-0.5 ${
                              deliveryMethod === m.id
                                ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="font-bold flex items-center justify-between">
                              <span>{m.label}</span>
                              {deliveryMethod === m.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                            </div>
                            <div className="text-[11px] text-slate-500">{m.description}</div>
                            <div className="text-[11px] font-bold text-amber-400">
                              {m.priceRub > 0 ? `${formatRub(m.priceRub)} (${formatUsd(m.priceUsd)})` : trans('Free', 'Gratuit', 'Бесплатно')}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                        {trans('Special Instructions or Order Notes:', 'Instructions spéciales :', 'Особые пожелания к заказу:')}
                      </label>
                      <textarea
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        rows={3}
                        placeholder={trans(
                          'e.g. Please verify sizes, need urgent delivery, or gift packaging requested...',
                          'ex : vérification des tailles, emballage cadeau...',
                          'Например: уточнить размеры, срочная доставка, подарочная упаковка...'
                        )}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>

                    <button
                      onClick={() => setActiveTab('items')}
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {trans('Save Notes & Return to Cart', 'Enregistrer et revenir au panier', 'Сохранить и вернуться к корзине')}
                    </button>
                  </div>
                )}
                {activeTab === 'saved' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <h3 className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <Bookmark className="w-4 h-4 text-amber-400" />
                        <span>{trans('Saved for Later', 'Articles sauvegardés', 'Отложенные товары')} ({savedItems.length})</span>
                      </h3>
                      <button
                        onClick={() => setActiveTab('items')}
                        className="text-xs text-amber-400 hover:underline font-bold cursor-pointer"
                      >
                        ← {trans('Back to Cart', 'Retour au panier', 'Назад к корзине')}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {savedItems.map((item) => {
                        const dualPrice = getDualPrice(item.product.priceUsd, exchangeRate, item.product.priceRub);
                        return (
                          <div
                            key={`saved-${item.product.id}-${item.selectedSize || 'nosize'}`}
                            className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3"
                          >
                            <ImageWithFallback
                              src={item.product.image}
                              alt={item.product.title}
                              fallbackTitle={item.product.title}
                              fallbackCategory={item.product.category}
                              containerClassName="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800 bg-slate-950"
                              className="w-full h-full object-cover"
                            />

                            <div className="flex-1 min-w-0 space-y-1">
                              <h4 className="text-xs font-bold text-white truncate">{item.product.title}</h4>
                              <div className="text-[11px] text-amber-400 font-bold">{dualPrice.rub} ({dualPrice.usd})</div>

                              <button
                                onClick={() => handleMoveToCart(item)}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>{trans('Move to Cart', 'Déplacer au panier', 'Переместить в корзину')}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>



        </div>
      </div>
    </div>
  );
};
