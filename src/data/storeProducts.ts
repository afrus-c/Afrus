import { ProductItem, StoreCategory } from '../types';

type StoreLocalizedText = { en: string; fr: string; ru: string };
interface CmsCategory extends Omit<StoreCategoryDetail, 'subcategories'> {
  nameI18n?: StoreLocalizedText;
  descriptionI18n?: StoreLocalizedText;
}
interface CmsSubcategory { id: string; categoryId: string; name: string; nameI18n?: StoreLocalizedText }

const modulesToRecords = <T,>(modules: Record<string, unknown>): T[] =>
  Object.values(modules).map((module) => module as T);

const categoryModules = import.meta.glob('../content/store/categories/*.json', { eager: true, import: 'default' });
const subcategoryModules = import.meta.glob('../content/store/subcategories/*.json', { eager: true, import: 'default' });
const productModules = import.meta.glob('../content/store/products/*.json', { eager: true, import: 'default' });

const cmsCategories = modulesToRecords<CmsCategory>(categoryModules);
const cmsSubcategories = modulesToRecords<CmsSubcategory>(subcategoryModules);
const categoryById = new Map(cmsCategories.map((category) => [category.id, category]));
const subcategoryById = new Map(cmsSubcategories.map((subcategory) => [subcategory.id, subcategory]));

export const getCmsCategoryName = (nameOrId: string, locale: keyof StoreLocalizedText): string | undefined => {
  const category = cmsCategories.find((item) => item.id === nameOrId || item.name === nameOrId || item.nameI18n?.en === nameOrId);
  return category?.nameI18n?.[locale];
};

export const getCmsSubcategoryName = (nameOrId: string, locale: keyof StoreLocalizedText): string | undefined => {
  const subcategory = cmsSubcategories.find((item) => item.id === nameOrId || item.name === nameOrId || item.nameI18n?.en === nameOrId);
  return subcategory?.nameI18n?.[locale];
};

export interface StoreCategoryDetail {
  id: StoreCategory;
  name: StoreCategory;
  description: string;
  image: string;
  icon: string;
  itemCount: number;
  subcategories: string[];
}

/** The AFRUS Store catalog is maintained in src/content/store.json through Decap CMS. */
export const STORE_CATEGORIES_DATA: StoreCategoryDetail[] = cmsCategories.map((category) => ({
  ...category,
  name: (category.nameI18n?.en || category.name) as StoreCategory,
  description: category.descriptionI18n?.en || category.description,
  subcategories: cmsSubcategories
    .filter((subcategory) => subcategory.categoryId === category.id)
    .map((subcategory) => subcategory.nameI18n?.en || subcategory.name)
}));

export const STORE_PRODUCTS = modulesToRecords<ProductItem>(productModules).map((product) => ({
  ...product,
  category: (categoryById.get(product.categoryId || '')?.nameI18n?.en || categoryById.get(product.categoryId || '')?.name || product.category) as StoreCategory,
  subcategory: subcategoryById.get(product.subcategoryId || '')?.nameI18n?.en || subcategoryById.get(product.subcategoryId || '')?.name || product.subcategory,
  title: product.titleI18n?.en || product.title,
  description: product.descriptionI18n?.en || product.description
}));

export const SUBCATEGORIES_BY_CATEGORY = Object.fromEntries(
  STORE_CATEGORIES_DATA.map((category) => [category.id, category.subcategories])
) as Record<StoreCategory, string[]>;
