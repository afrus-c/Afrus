import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  ShoppingCart,
  Eye,
  Check,
  Sparkles,
  ShoppingBag,
  Globe,
  Tag,
  ChevronDown,
  Layers,
  Image as ImageIcon,
  Settings
} from 'lucide-react';
import { STORE_CATEGORIES_DATA, STORE_PRODUCTS, SUBCATEGORIES_BY_CATEGORY } from '../data/storeProducts';
import { ProductItem } from '../types';
import { getDualPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProduct } from '../utils/productLocalization';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { getStoredProducts, calculateStockStatus } from '../utils/productStorage';
import storePageContent from '../content/pages/store-page.json';
import { resolveCmsText } from '../content/types';

export const Store: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, openCart, exchangeRate } = useCart();
  const { language, t, trans } = useLanguage();
  const cmsText = (value: { en: string; fr: string; ru: string }) => resolveCmsText(value, language);
  const STORE_HERO_SLIDES = [...storePageContent.heroSlides].sort((a, b) => a.order - b.order).map((slide) => ({ ...slide, badge: cmsText(slide.badge), title: cmsText(slide.title), subtitle: cmsText(slide.subtitle) }));

  const categoryParam = searchParams.get('category');
  const subcategoryParam = searchParams.get('subcategory');

  const [productsList, setProductsList] = useState<ProductItem[]>(() => getStoredProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategoryParam || 'All');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  useEffect(() => {
    const handleProductsUpdated = () => {
      setProductsList(getStoredProducts());
    };
    window.addEventListener('afrus_products_updated', handleProductsUpdated);
    return () => {
      window.removeEventListener('afrus_products_updated', handleProductsUpdated);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const getCategoryCount = (catName: string) => {
    if (catName === 'All') return productsList.length;
    return productsList.filter(
      (p) => p.category.toLowerCase() === catName.toLowerCase()
    ).length;
  };
  useEffect(() => {
    if (STORE_HERO_SLIDES.length === 0) return;
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % STORE_HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [STORE_HERO_SLIDES.length]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (subcategoryParam) {
      setSelectedSubcategory(subcategoryParam);
    }
  }, [categoryParam, subcategoryParam]);

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setSelectedSubcategory('All');
    if (catName === 'All') {
      searchParams.delete('category');
      searchParams.delete('subcategory');
    } else {
      searchParams.set('category', catName);
      searchParams.delete('subcategory');
    }
    setSearchParams(searchParams);
  };

  const handleSubcategorySelect = (subcatName: string) => {
    setSelectedSubcategory(subcatName);
    if (subcatName === 'All') {
      searchParams.delete('subcategory');
    } else {
      searchParams.set('subcategory', subcatName);
    }
    setSearchParams(searchParams);
  };

  const handleAddToCart = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };
  const presetSubcats =
    selectedCategory !== 'All' && SUBCATEGORIES_BY_CATEGORY[selectedCategory as keyof typeof SUBCATEGORIES_BY_CATEGORY]
      ? SUBCATEGORIES_BY_CATEGORY[selectedCategory as keyof typeof SUBCATEGORIES_BY_CATEGORY]
      : [];

  const dynamicSubcats =
    selectedCategory !== 'All'
      ? productsList
          .filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
          .map((p) => p.subcategory)
          .filter((sub): sub is string => Boolean(sub))
      : [];

  const availableSubcategories =
    selectedCategory !== 'All'
      ? Array.from(new Set([...presetSubcats, ...dynamicSubcats]))
      : [];

  const getCategoryLabel = (catName: string) => {
    if (catName === 'All') return t('store.all_categories', 'All Categories');
    if (catName === 'African Food') return t('cat.african_food', 'African Food');
    if (catName === 'African Clothes') return t('cat.african_clothes', 'African Clothes');
    if (catName === 'Jerseys') return t('cat.jerseys', 'Jerseys');
    if (catName === 'Masks') return t('cat.masks', 'Masks');
    if (catName === 'Bracelets & Jewelry') return t('cat.bracelets_jewelry', 'Bracelets & Jewelry');
    if (catName === 'Souvenirs') return t('cat.souvenirs', 'Souvenirs');
    if (catName === 'Clothing') return t('cat.clothing', 'Clothing');
    if (catName === 'Accessories') return t('cat.accessories', 'Accessories');
    if (catName === 'Shoes') return t('cat.shoes', 'Shoes');
    if (catName === 'Perfume') return t('cat.perfume', 'Perfume');
    return catName;
  };
  const filteredProducts = productsList.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.subcategory && prod.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || prod.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSubcategory =
      selectedSubcategory === 'All' ||
      (prod.subcategory && prod.subcategory.toLowerCase() === selectedSubcategory.toLowerCase());

    return matchesSearch && matchesCategory && matchesSubcategory;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.priceUsd - b.priceUsd;
    if (sortBy === 'price-high') return b.priceUsd - a.priceUsd;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const dynamicCategoriesList = Array.from(
    new Set(['All', ...STORE_CATEGORIES_DATA.map((category) => category.name), ...productsList.map((p) => p.category).filter(Boolean)])
  );

  if (STORE_HERO_SLIDES.length === 0) return null;

  return (
    <div className="afrus-store-theme min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      <section className="relative min-h-[420px] lg:min-h-[480px] flex items-center overflow-hidden border-b border-amber-500/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={STORE_HERO_SLIDES[activeHeroSlide].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={STORE_HERO_SLIDES[activeHeroSlide].image}
              alt="AFRUS Store Hero"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
          </motion.div>
        </AnimatePresence>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="max-w-2xl space-y-5">
            <span className="px-3.5 py-1.5 rounded-full bg-[#8f2630]/90 !text-white text-xs font-black border border-[#c76972]/60 tracking-wider uppercase inline-flex items-center gap-2 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {STORE_HERO_SLIDES[activeHeroSlide].badge}
              </span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {STORE_HERO_SLIDES[activeHeroSlide].title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {STORE_HERO_SLIDES[activeHeroSlide].subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-xs flex items-center gap-3">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">
                    {cmsText(storePageContent.currencyFeature.title)}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {cmsText(storePageContent.currencyFeature.description)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          {STORE_HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveHeroSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeHeroSlide === index ? 'w-8 bg-[#b32632]' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={t('store.slide_label', 'Slide').replace('{{number}}', String(index + 1))}
            />
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('store.search_placeholder', 'Search products, crafts, textiles, food...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {filteredProducts.length} {filteredProducts.length === 1 ? trans('Item', 'Article', 'Товар') : trans('Items', 'Articles', 'Товаров')}
            </span>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="featured">{t('store.featured', 'Featured First')}</option>
                <option value="price-low">{t('store.price_low', 'Price: Low to High')}</option>
                <option value="price-high">{t('store.price_high', 'Price: High to Low')}</option>
                <option value="rating">{t('store.rating', 'Top Rated')}</option>
              </select>
            </div>
          </div>

        </div>
        <div className="relative pt-1 space-y-4" ref={dropdownRef}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-md">
            
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider whitespace-nowrap hidden md:inline-flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{trans('Category:', 'Catégorie:', 'Категория:')}</span>
              </span>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                type="button"
                className="w-full sm:w-auto min-w-[220px] sm:min-w-[280px] px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/40 hover:border-amber-400 text-white font-black text-xs sm:text-sm tracking-wide flex items-center justify-between gap-3 shadow-lg shadow-amber-500/5 transition-all group cursor-pointer"
                aria-expanded={isCategoryDropdownOpen}
                id="store-category-dropdown-btn"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap truncate">
                    {getCategoryLabel(selectedCategory)}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                    isCategoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div className="text-xs text-slate-400 font-semibold whitespace-nowrap flex items-center gap-1.5">
                <span className="text-slate-600">—</span>
                <span className="text-amber-400 font-extrabold">{filteredProducts.length}</span>
                <span>{filteredProducts.length === 1 ? trans('product', 'produit', 'товар') : trans('products', 'produits', 'товаров')}</span>
              </div>
            </div>
            {(selectedCategory !== 'All' || selectedSubcategory !== 'All') && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleCategorySelect('All');
                    setSelectedSubcategory('All');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 shrink-0 border border-slate-700 cursor-pointer"
                >
                  <span>{t('btn.reset_filters', 'Reset Filters')}</span>
                </button>
              </div>
            )}

          </div>
          {selectedCategory !== 'All' && availableSubcategories.length > 0 && (
            <div className="border-t border-slate-800/80 pt-3 pb-1 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>{trans('Subcategories:', 'Sous-catégories:', 'Подкатегории:')}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wide">
                  ← {trans('Swipe to explore', 'Balayer pour explorer', 'Свайп для просмотра')} →
                </span>
              </div>
              <div className="relative group overflow-hidden">
                <div className="flex items-center gap-2 overflow-x-auto pb-2.5 pt-1 scrollbar-none touch-pan-x snap-x scroll-smooth w-full px-0.5">
                  <button
                    type="button"
                    onClick={() => handleSubcategorySelect('All')}
                    className={`snap-start px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                      selectedSubcategory === 'All'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]'
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-amber-500/50 hover:text-white'
                    }`}
                  >
                    {t('store.all_subcategories', 'All Items')}
                  </button>

                  {availableSubcategories.map((subcat) => {
                    const isSubSelected = selectedSubcategory.toLowerCase() === subcat.toLowerCase();
                    return (
                      <button
                        key={subcat}
                        type="button"
                        onClick={() => handleSubcategorySelect(subcat)}
                        className={`snap-start px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                          isSubSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]'
                            : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-amber-500/50 hover:text-white'
                        }`}
                      >
                        {subcat}
                      </button>
                    );
                  })}
                </div>
                <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-slate-950 to-transparent" />
              </div>
            </div>
          )}
          <AnimatePresence>
            {isCategoryDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-full sm:w-[340px] z-50 bg-slate-950 border border-amber-500/40 rounded-2xl shadow-2xl shadow-slate-950 overflow-hidden p-2 backdrop-blur-2xl"
              >
                <div className="text-[10px] font-black uppercase text-amber-400 tracking-widest px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span>{t('store.categories_menu', 'Categories Menu')}</span>
                  <span className="text-slate-500 font-mono">{dynamicCategoriesList.length - 1} Collections</span>
                </div>

                <div className="max-h-[360px] overflow-y-auto space-y-1 pt-1.5 pr-1">
                  {dynamicCategoriesList.map((catName) => {
                    const isSelected = selectedCategory.toLowerCase() === catName.toLowerCase();
                    const count = getCategoryCount(catName);

                    return (
                      <button
                        key={catName}
                        type="button"
                        onClick={() => {
                          handleCategorySelect(catName);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-between whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                            : 'text-slate-200 hover:bg-slate-900 hover:text-amber-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 shrink-0 text-slate-950" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
                          )}
                          <span className="whitespace-nowrap">{getCategoryLabel(catName)}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md ${
                            isSelected
                              ? 'bg-slate-950/20 text-slate-950'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">{t('store.no_products_title', 'No products found')}</h3>
            <p className="text-xs text-slate-400">{t('store.no_products_help', 'Try adjusting your search terms or select another category or subcategory above.')}</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubcategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase"
            >
              {t('btn.reset_filters', 'Reset Filters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 min-w-0">
            {filteredProducts.map((rawProd) => {
              const product = getLocalizedProduct(rawProd, language);
              const dualPrice = getDualPrice(product.priceUsd, exchangeRate, product.priceRub);
              const isAdded = addedProductId === product.id;
              const stockInfo = calculateStockStatus(product.inventoryCount, product.inStock, language);

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/store/product/${product.id}`)}
                  className="group relative min-w-0 w-full bg-slate-900/90 border border-slate-800/90 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-amber-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 grid grid-cols-[118px_minmax(0,1fr)] min-[390px]:grid-cols-[132px_minmax(0,1fr)] sm:flex sm:flex-col sm:justify-start cursor-pointer"
                >
                  <div className="relative h-full min-h-[178px] sm:h-48 sm:min-h-0 lg:h-52 xl:h-56 overflow-hidden bg-slate-950">
                    <div
                      className="absolute inset-0 scale-110 bg-cover bg-center blur-xl opacity-35"
                      style={{ backgroundImage: `url(${product.image})` }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-slate-950/35" aria-hidden="true" />
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      fallbackTitle={product.title}
                      fallbackCategory={product.category}
                      className="relative z-[1] w-full h-full object-contain p-2 sm:p-3 group-hover:scale-[1.03] transition-transform duration-500"
                    />

                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/10" />
                    {product.badge && (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 max-w-[calc(100%-1rem)] truncate px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-[#9f2934] !text-white text-[8px] sm:text-[10px] font-black uppercase shadow-lg z-10">
                        {product.badge}
                      </span>
                    )}
                    <span className="hidden sm:block absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase border border-slate-800 z-10">
                      {product.category}
                    </span>
                    {product.subcategory && (
                      <span className="hidden sm:block absolute bottom-3 right-3 text-[10px] font-bold text-amber-300 bg-amber-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-amber-500/30 z-10">
                        {product.subcategory}
                      </span>
                    )}
                    <span className={`absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg border z-10 ${stockInfo.colorClass}`}>
                      {stockInfo.label}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-start gap-2 min-w-0 overflow-hidden">
                    <div className="space-y-1.5">
                      <h3 className="text-xs min-[390px]:text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 sm:line-clamp-1 leading-snug break-words">
                        {product.title}
                      </h3>
                      <p className="hidden sm:block text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <div className="hidden sm:block text-[10px] uppercase font-bold text-slate-500">{trans('Dual Price', 'Double Prix', 'Двойная цена')}</div>
                          <div className="text-sm sm:text-lg font-black text-amber-400 flex flex-col min-[430px]:flex-row flex-wrap items-start min-[430px]:items-baseline gap-x-1.5 gap-y-0.5 min-w-0">
                            <span className="whitespace-nowrap">{dualPrice.rub}</span>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-300 whitespace-nowrap">({dualPrice.usd})</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-stretch gap-1.5 sm:gap-2 pt-1 w-full">
                        {stockInfo.isAvailable ? (
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            aria-label={trans('Add to Cart', 'Ajouter au panier', 'В корзину')}
                            className="min-w-0 min-h-9 py-2 px-1.5 sm:px-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-black text-[9px] min-[430px]:text-[10px] sm:text-xs uppercase tracking-normal flex items-center justify-center gap-1 transition-all shadow-md cursor-pointer whitespace-nowrap"
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 shrink-0" />
                                <span>{trans('Added', 'Ajouté', 'Добавлено')}</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                                <span>{trans('Add item', 'Ajouter', 'Добавить')}</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            disabled
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-rose-400/80 font-bold text-xs uppercase tracking-normal flex items-center justify-center gap-1 border border-rose-500/30 cursor-not-allowed opacity-80 whitespace-nowrap"
                          >
                            <span>{trans('Out of Stock', 'Rupture de Stock', 'Нет в наличии')}</span>
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/store/product/${product.id}`);
                          }}
                          title={trans('View Details', 'Voir les détails', 'Подробнее')}
                          className="w-full min-w-0 min-h-9 shrink-0 py-2 px-1.5 sm:px-2 rounded-xl bg-white hover:bg-[#fff5f5] text-[#8f2630] font-black text-[9px] min-[430px]:text-[10px] sm:text-xs uppercase tracking-normal flex items-center justify-center gap-1 transition-all border border-[#b32632]/35 hover:border-[#b32632]/70 cursor-pointer whitespace-nowrap overflow-hidden shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#b32632] shrink-0" />
                          <span>{trans('Details', 'Voir', 'Подробнее')}</span>
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
