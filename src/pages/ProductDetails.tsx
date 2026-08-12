import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MessageCircle,
  Send,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Award,
  Clock,
  Box,
  Building2,
  Tag,
  ShoppingBag,
  ShoppingCart,
  Check,
  Globe,
  AlertCircle
} from 'lucide-react';
import { STORE_PRODUCTS } from '../data/storeProducts';
import { getDualPrice, formatUsd, formatRub } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProduct } from '../utils/productLocalization';
import { WHATSAPP_CONFIG } from '../utils/whatsapp';
import { TELEGRAM_CONFIG } from '../utils/orderInquiry';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { getStoredProducts, calculateStockStatus } from '../utils/productStorage';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart, exchangeRate } = useCart();
  const { language, t, trans } = useLanguage();

  const [productsList, setProductsList] = useState(() => getStoredProducts());

  useEffect(() => {
    const handleProductsUpdated = () => {
      setProductsList(getStoredProducts());
    };
    window.addEventListener('afrus_products_updated', handleProductsUpdated);
    return () => {
      window.removeEventListener('afrus_products_updated', handleProductsUpdated);
    };
  }, []);

  const rawProduct = productsList.find((p) => p.id === id) || STORE_PRODUCTS.find((p) => p.id === id);
  const product = rawProduct ? getLocalizedProduct(rawProduct, language) : null;

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-black text-white">{trans('Product Not Found', 'Produit non trouvé', 'Товар не найден')}</h2>
        <p className="text-slate-400 text-sm">{trans('The requested item could not be located in the AFRUS Store catalog.', 'L\'article demandé n\'a pas pu être trouvé dans le catalogue de la boutique AFRUS.', 'Запрошенный товар не найден в каталоге магазина AFRUS.')}</p>
        <button
          onClick={() => navigate('/store')}
          className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase cursor-pointer"
        >
          {trans('Return to Store', 'Retourner à la boutique', 'Вернуться в магазин')}
        </button>
      </div>
    );
  }

  const stockInfo = calculateStockStatus(product.inventoryCount, product.inStock, language);
  const currentImage = activeImage || product.image;
  const gallery = product.galleryImages || [product.image];
  const dualPrice = getDualPrice(product.priceUsd, exchangeRate, product.priceRub);
  const totalDual = getDualPrice(product.priceUsd * quantity, exchangeRate, product.priceRub != null ? product.priceRub * quantity : undefined);

  const relatedProducts = productsList.filter((p) => 
    p.id !== product.id && 
    (p.subcategory && product.subcategory ? p.subcategory === product.subcategory : p.category === product.category)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const getProductInquiryText = () => {
    let msg = `Hello AFRUS,\n\n`;
    msg += `I would like to place an order/inquiry for the following product:\n\n`;
    msg += `1. ${product.title}`;
    if (selectedSize) msg += ` (Size: ${selectedSize})`;
    msg += `\n`;
    msg += `   Quantity: ${quantity}\n`;
    msg += `   Price: ${totalDual.rub} / ${totalDual.usd}\n\n`;
    msg += `Estimated Cart Total:\n`;
    msg += `${totalDual.rub}\n`;
    msg += `${totalDual.usd}\n\n`;
    msg += `Please confirm:\n`;
    msg += `• Product availability\n`;
    msg += `• Final pricing\n`;
    msg += `• Shipping/delivery options\n`;
    msg += `• Delivery cost\n`;
    msg += `• Estimated delivery time\n`;
    msg += `• Final order total\n`;
    msg += `• Payment instructions\n\n`;
    msg += `Thank you.`;
    return msg;
  };

  const productInquiryText = getProductInquiryText();
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(productInquiryText)}`;
  const telegramUrl = `https://t.me/${TELEGRAM_CONFIG.username}?text=${encodeURIComponent(productInquiryText)}`;

  return (
    <div className="afrus-store-theme pt-24 pb-20 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <button
            onClick={() => navigate('/store')}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('product.back_store', 'Back to AFRUS Store')}</span>
          </button>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>{t('store.short_name', 'AFRUS Store')}</span>
            <span>/</span>
            <span
              onClick={() => navigate(`/store?category=${encodeURIComponent(product.category)}`)}
              className="text-slate-300 hover:text-amber-400 cursor-pointer transition-colors"
            >
              {product.category}
            </span>
            {product.subcategory && (
              <>
                <span>/</span>
                <span
                  onClick={() => navigate(`/store?category=${encodeURIComponent(product.category)}&subcategory=${encodeURIComponent(product.subcategory!)}`)}
                  className="text-amber-400 font-semibold cursor-pointer hover:underline"
                >
                  {product.subcategory}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl h-96 sm:h-[480px]">
              <ImageWithFallback
                src={currentImage}
                alt={product.title}
                fallbackTitle={product.title}
                fallbackCategory={product.category}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase shadow-lg">
                  {product.badge}
                </div>
              )}

              <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold uppercase border border-slate-800">
                {product.category}
              </div>
              <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-xl backdrop-blur-md text-xs font-extrabold uppercase border shadow-md ${stockInfo.colorClass}`}>
                {stockInfo.label}
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      currentImage === imgUrl ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      src={imgUrl}
                      alt={`Gallery view ${idx + 1}`}
                      fallbackTitle={product.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                <Award className="w-5 h-5 text-amber-400 mx-auto" />
                <span className="text-[11px] font-bold text-slate-300 block">{trans('100% Authentic Quality', 'Qualité 100% Authentique', '100% Подлинное Качество')}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                <Truck className="w-5 h-5 text-amber-400 mx-auto" />
                <span className="text-[11px] font-bold text-slate-300 block">{trans('Russia & Africa Shipping', 'Livraison Russie & Afrique', 'Доставка по России и в Африку')}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto" />
                <span className="text-[11px] font-bold text-slate-300 block">{trans('Verified Culture & Craft', 'Culture et Artisanat Vérifiés', 'Проверенные Продукты и Ремесло')}</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-extrabold uppercase shadow-sm ${stockInfo.colorClass}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{stockInfo.label}</span>
                </span>
                <span className="text-slate-300 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                  {trans('Dual-Currency Pricing', 'Prix ​​en double devise', 'Двойные валютные цены')}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {product.title}
              </h1>
              <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-black text-amber-400">{dualPrice.rub}</span>
                  <span className="text-xl font-bold text-slate-200">({dualPrice.usd})</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {t('product.dual_price_note', { rate: exchangeRate })}
                </div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-sm leading-relaxed space-y-2">
              <h3 className="font-extrabold text-white text-xs uppercase tracking-wider text-amber-400">
                {trans('Product Description', 'Description du produit', 'Описание товара')}
              </h3>
              <p className="text-slate-300">{product.description}</p>
            </div>
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                  {trans('Select Size:', 'Sélectionner la taille :', 'Выберите размер:')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md scale-105'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                {trans('Quantity:', 'Quantité :', 'Количество:')}
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1">
                  <button
                    disabled={quantity <= 1 || !stockInfo.isAvailable}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-slate-400 hover:text-white font-bold disabled:opacity-30 disabled:hover:text-slate-400"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-black text-white">{stockInfo.isAvailable ? quantity : 0}</span>
                  <button
                    disabled={quantity >= stockInfo.count || !stockInfo.isAvailable}
                    onClick={() => setQuantity(Math.min(stockInfo.count, quantity + 1))}
                    className="px-3 py-1 text-slate-400 hover:text-white font-bold disabled:opacity-30 disabled:hover:text-slate-400"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  {trans('Total:', 'Total :', 'Итого:')} <strong className="text-amber-400">{getDualPrice(product.priceUsd * (stockInfo.isAvailable ? quantity : 0), exchangeRate, product.priceRub != null ? product.priceRub * (stockInfo.isAvailable ? quantity : 0) : undefined).fullDisplay}</strong>
                </span>
              </div>
            </div>
            <div className="space-y-2.5 pt-2">
              {stockInfo.isAvailable ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-normal flex items-center justify-center gap-2.5 sm:gap-3 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5 text-slate-950 shrink-0" />
                      <span className="whitespace-nowrap">{trans('Added to Cart!', 'Ajouté au panier !', 'Добавлено в корзину!')}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 shrink-0" />
                      <span className="whitespace-nowrap">{trans('Add to Cart', 'Ajouter au panier', 'Добавить в корзину')}</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 px-4 rounded-2xl bg-slate-900 text-rose-400 font-black text-xs sm:text-sm uppercase tracking-normal flex items-center justify-center gap-2.5 sm:gap-3 border border-rose-500/30 cursor-not-allowed opacity-80"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="whitespace-nowrap">{trans('Product Currently Out of Stock', 'Rupture de stock', 'Товар временно отсутствует')}</span>
                </button>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600 shrink-0" />
                  <span className="whitespace-nowrap">{trans('Send via WhatsApp', 'Envoyer par WhatsApp', 'Отправить через WhatsApp')}</span>
                </a>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md whitespace-nowrap"
                >
                  <Send className="w-4 h-4 text-white shrink-0" />
                  <span className="whitespace-nowrap">{trans('Send via Telegram', 'Envoyer par Telegram', 'Отправить через Telegram')}</span>
                </a>
              </div>
            </div>
            {product.specifications && product.specifications.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  {trans('Product Details & Specifications', 'Détails du produit & Spécifications', 'Детали товара и характеристики')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400 font-semibold">{spec.label}:</span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-slate-800 space-y-6">
            <h2 className="text-2xl font-black text-white">
              {trans('More Items in', 'Plus d\'articles dans', 'Другие товары в категории')} {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => {
                const relDual = getDualPrice(rel.priceUsd, exchangeRate, rel.priceRub);
                return (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/store/product/${rel.id}`)}
                    className="h-auto p-3 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all grid grid-cols-[7.5rem_minmax(0,1fr)] sm:flex sm:flex-col justify-start gap-3 sm:gap-2 group"
                  >
                    <ImageWithFallback
                      src={rel.image}
                      alt={rel.title}
                      fallbackTitle={rel.title}
                      fallbackCategory={rel.category}
                      containerClassName="h-28 sm:h-44 lg:h-48 shrink-0 rounded-xl overflow-hidden"
                      className="w-full h-full object-cover"
                    />
                    <div className="min-w-0 flex flex-col justify-center sm:justify-start gap-1.5 sm:pt-1">
                      <div className="text-xs font-bold text-amber-400 uppercase">{rel.category}</div>
                      <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {rel.title}
                      </div>
                      <div className="text-sm font-black text-amber-400 flex flex-wrap items-center gap-1.5">
                        <span>{relDual.rub}</span>
                        <span className="text-slate-400 text-xs font-normal">({relDual.usd})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
