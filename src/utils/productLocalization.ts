import { ProductItem, StoreCategory } from '../types';
import { Language } from '../i18n/translations';
import { getCmsInlineTranslation } from '../content/cmsTranslations';
import { getCmsCategoryName, getCmsSubcategoryName } from '../data/storeProducts';

const localeFor = (language: Language): 'en' | 'fr' | 'ru' =>
  language.toLowerCase() as 'en' | 'fr' | 'ru';

export function getLocalizedCategory(category: string, language: Language): string {
  return getCmsCategoryName(category, localeFor(language)) || category;
}

export function getLocalizedSubcategory(subcategory: string, language: Language): string {
  return getCmsSubcategoryName(subcategory, localeFor(language)) || subcategory;
}

export function getLocalizedStatus(status: string | undefined, language: Language): string | undefined {
  if (!status) return status;
  return getCmsInlineTranslation(status, language) || status;
}

/** Product, category, and subcategory translations are sourced from CMS JSON. */
export function getLocalizedProduct(product: ProductItem, language: Language): ProductItem {
  const locale = localeFor(language);
  return {
    ...product,
    title: product.titleI18n?.[locale] || product.title,
    description: product.descriptionI18n?.[locale] || product.description,
    category: getLocalizedCategory(product.category, language) as StoreCategory,
    subcategory: product.subcategory ? getLocalizedSubcategory(product.subcategory, language) : undefined,
    badge: product.badgeI18n?.[locale] || getLocalizedStatus(product.badge, language),
    availabilityStatus: getLocalizedStatus(product.availabilityStatus, language)
  };
}

export function getLocalizedProducts(products: ProductItem[], language: Language): ProductItem[] {
  return products.map((product) => getLocalizedProduct(product, language));
}
