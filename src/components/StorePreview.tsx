import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ShoppingCart, Eye, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { STORE_CATEGORIES_DATA, STORE_PRODUCTS } from '../data/storeProducts';
import { getDualPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './common/ImageWithFallback';
import { getStoredProducts, calculateStockStatus } from '../utils/productStorage';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedCategory, getLocalizedProducts } from '../utils/productLocalization';
import storeShowroomImg from '../assets/images/afrus_store_showroom_1785925189258.jpg';

interface StorePreviewProps {
  onOpenCmsInfo: () => void;
}

export const StorePreview: React.FC<StorePreviewProps> = () => {
  const navigate = useNavigate();
  const { addToCart, openCart, exchangeRate } = useCart();
  const { language, trans } = useLanguage();
  const [productsList, setProductsList] = useState(() => getStoredProducts());
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const handleProductsUpdated = () => {
      setProductsList(getStoredProducts());
    };
    window.addEventListener('afrus_products_updated', handleProductsUpdated);
    return () => {
      window.removeEventListener('afrus_products_updated', handleProductsUpdated);
    };
  }, []);

  const defaultCategories = ['All', ...STORE_CATEGORIES_DATA.map((category) => category.name)];

  const categories = Array.from(
    new Set([...defaultCategories, ...productsList.map((p) => p.category).filter(Boolean)])
  );

  const filteredProducts = getLocalizedProducts(
    activeCategory === 'All' ? productsList : productsList.filter((product) => product.category === activeCategory),
    language
  ).slice(0, 8);

  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return trans('All', 'Tous', 'Все');
    return getLocalizedCategory(cat, language);
  };

  const handleAddToCart = (prod: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prod, 1);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section id="store" className="py-24 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <img
          src={storeShowroomImg}
          alt="AFRUS Store Showroom"
          className="w-full h-full object-cover filter brightness-90 contrast-110 saturate-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{trans('AFRUS Russia–Africa Cultural & Lifestyle Store', 'Boutique Culturelle & Mode AFRUS Russie–Afrique', 'Магазин Культуры AFRUS Россия–Африка')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
          >
            {trans('Authentic African Apparel, Art, Delicacies & Gifts', 'Vêtements, Art, Délices & Cadeaux Africains Authentiques', 'Аутентичные Товары, Искусство и Деликатесы Африки')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            {trans(
              'Explore our flagship collection of authentic African food, fashion, jerseys, hand-carved masks, jewelry, souvenirs, and luxury perfumes with RUB (₽) as the primary currency and USD ($) as a reference.',
              'Découvrez notre collection phare de nourriture africaine, mode, maillots, masques sculptés à la main, bijoux, souvenirs et parfums raffinés.',
              'Эксклюзивная коллекция товаров из Африки: продукты, одежда, джерси, маски, украшения и сувениры с основной ценой в RUB и справочной ценой в USD.'
            )}
          </motion.p>
        </div>
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-amber-500/40'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod, idx) => {
            const dualPrice = getDualPrice(prod.priceUsd, exchangeRate, prod.priceRub);
            const isAdded = addedId === prod.id;
            const stockInfo = calculateStockStatus(prod.inventoryCount, prod.inStock, language);

            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-start group shadow-xl"
              >
                <div
                  className="relative h-56 overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => navigate(`/store/product/${prod.id}`)}
                >
                  <ImageWithFallback
                    src={prod.image}
                    alt={prod.title}
                    fallbackTitle={prod.title}
                    fallbackCategory={prod.category}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase border border-slate-800">
                      {getLocalizedCategory(prod.category, language)}
                    </span>
                  </div>
                  <div className={`absolute bottom-3 left-3 text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-md px-2.5 py-1 rounded-lg border z-10 ${stockInfo.colorClass}`}>
                    {stockInfo.label}
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-start gap-2">
                  <div className="space-y-1.5">
                    <h3
                      onClick={() => navigate(`/store/product/${prod.id}`)}
                      className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-tight cursor-pointer line-clamp-1"
                    >
                      {prod.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <div className="text-sm font-black text-amber-400 flex items-center gap-1.5">
                      <span>{dualPrice.rub}</span>
                      <span className="text-xs font-bold text-slate-300">({dualPrice.usd})</span>
                    </div>

                    <div className="grid grid-cols-1 items-stretch gap-2 pt-1 w-full">
                      {stockInfo.isAvailable ? (
                        <button
                          onClick={(e) => handleAddToCart(prod, e)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-black text-xs uppercase tracking-normal flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 shrink-0" />
                              <span>{trans('Added', 'Ajouté', 'Добавлено')}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                              <span>{trans('Add to Cart', 'Ajouter au panier', 'В корзину')}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-rose-400/80 font-bold text-xs uppercase tracking-normal flex items-center justify-center gap-1 border border-rose-500/30 cursor-not-allowed opacity-80 whitespace-nowrap"
                        >
                          <span>{trans('Out of Stock', 'Rupture de Stock', 'Нет в наличии')}</span>
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/store/product/${prod.id}`)}
                        title={trans('View Details', 'Voir les détails', 'Подробнее')}
                        className="w-full shrink-0 py-2.5 px-4 rounded-xl bg-white hover:bg-[#fff5f5] text-[#8f2630] font-black text-xs uppercase tracking-normal flex items-center justify-center gap-1.5 transition-all border border-[#b32632]/35 hover:border-[#b32632]/70 cursor-pointer whitespace-nowrap shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#b32632] shrink-0" />
                        <span>{trans('Details', 'Voir', 'Подробнее')}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/store')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:scale-105 transition-all"
          >
            <span>{trans('Explore Full AFRUS Store', 'Explorer la Boutique AFRUS', 'Перейти в Магазин AFRUS')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
