import { ProductItem } from '../types';
import { STORE_PRODUCTS } from '../data/storeProducts';
import operationalSettings from '../content/operational-settings.json';

// A catalog-content signature prevents an older browser cache from hiding new
// Decap CMS publications after the site is rebuilt and deployed.
const CATALOG_SIGNATURE = JSON.stringify(STORE_PRODUCTS).split('').reduce(
  (hash, character) => ((hash * 31 + character.charCodeAt(0)) >>> 0),
  2166136261
).toString(36);
const STORAGE_KEY = `afrus_store_products_cms_${CATALOG_SIGNATURE}`;
export class ProductStorageEvent extends CustomEvent<ProductItem[]> {}

export const LOW_STOCK_THRESHOLD = operationalSettings.commerce.lowStockThreshold;

export interface StockStatusInfo {
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  label: string;
  colorClass: string;
  badgeBg: string;
  isAvailable: boolean;
  count: number;
}

/**
 * Calculates stock status dynamically from quantity
 * 6+ units -> In Stock
 * 1-5 units -> Low Stock
 * 0 units -> Out of Stock
 */
export function calculateStockStatus(
  inventoryCount?: number,
  inStockFlag?: boolean,
  lang?: string
): StockStatusInfo {
  let count = inventoryCount !== undefined ? inventoryCount : (inStockFlag !== false ? operationalSettings.commerce.defaultInventoryWhenAvailable : 0);
  if (inStockFlag === false) {
    count = 0;
  }

  const isFR = lang === 'FR';
  const isRU = lang === 'RU';

  if (count <= 0) {
    const label = isFR ? 'Rupture de stock' : isRU ? 'Нет в наличии' : 'Out of Stock';
    return {
      status: 'Out of Stock',
      label,
      colorClass: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      isAvailable: false,
      count: 0
    };
  }

  if (count <= LOW_STOCK_THRESHOLD) {
    const label = isFR
      ? `Stock limité (${count} restants)`
      : isRU
      ? `Мало в наличии (${count} шт)`
      : `Low Stock (${count} left)`;
    return {
      status: 'Low Stock',
      label,
      colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      isAvailable: true,
      count
    };
  }

  const label = isFR ? 'En stock' : isRU ? 'В наличии' : 'In Stock';
  return {
    status: 'In Stock',
    label,
    colorClass: '!text-white bg-emerald-700/95 border-emerald-200/90 ring-1 ring-emerald-950/25 shadow-[0_3px_12px_rgba(0,0,0,0.38)]',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    isAvailable: true,
    count
  };
}

/**
 * Loads products from localStorage or defaults to STORE_PRODUCTS
 */
export function getStoredProducts(): ProductItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial products from STORE_PRODUCTS
      const seeded = STORE_PRODUCTS.filter(
        (p) => p.title !== 'New Store Product' && !p.description?.includes('Admin Portal')
      ).map((p) => {
        const count = p.inventoryCount !== undefined ? p.inventoryCount : (p.inStock !== false ? 25 : 0);
        return {
          ...p,
          inventoryCount: count,
          inStock: count > 0
        };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }

    let parsed: ProductItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return STORE_PRODUCTS;
    }

    // Filter out any leftover "New Store Product" or admin placeholder items
    parsed = parsed.filter(
      (p) => p.title !== 'New Store Product' && !p.description?.includes('Admin Portal')
    );

    // Merge any missing initial store products or update flag images
    const existingIds = new Set(parsed.map((p) => p.id));
    let hasUpdated = false;
    STORE_PRODUCTS.forEach((sp) => {
      if (sp.title === 'New Store Product' || sp.description?.includes('Admin Portal')) return;

      if (!existingIds.has(sp.id)) {
        const count = sp.inventoryCount !== undefined ? sp.inventoryCount : (sp.inStock !== false ? 25 : 0);
        parsed.push({
          ...sp,
          inventoryCount: count,
          inStock: count > 0
        });
        hasUpdated = true;
      } else if (sp.category === 'Flags') {
        const existingIdx = parsed.findIndex((p) => p.id === sp.id);
        if (existingIdx !== -1 && parsed[existingIdx].image !== sp.image) {
          parsed[existingIdx].image = sp.image;
          hasUpdated = true;
        }
      }
    });

    if (hasUpdated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }

    return parsed;
  } catch (e) {
    console.error('Error reading stored products from localStorage:', e);
    return STORE_PRODUCTS.filter(
      (p) => p.title !== 'New Store Product' && !p.description?.includes('Admin Portal')
    );
  }
}

/**
 * Saves products to localStorage and dispatches change event
 */
export function saveStoredProducts(products: ProductItem[]): void {
  try {
    const normalized = products.map((p) => {
      const count = Math.max(0, p.inventoryCount ?? 0);
      return {
        ...p,
        inventoryCount: count,
        inStock: count > 0
      };
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent('afrus_products_updated', { detail: normalized }));
  } catch (e) {
    console.error('Error saving stored products to localStorage:', e);
  }
}

/**
 * Updates a single product in storage
 */
export function updateStoredProduct(updated: ProductItem): void {
  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === updated.id);
  
  const count = Math.max(0, updated.inventoryCount ?? 0);
  const normalizedItem: ProductItem = {
    ...updated,
    inventoryCount: count,
    inStock: count > 0
  };

  if (index >= 0) {
    products[index] = normalizedItem;
  } else {
    products.unshift(normalizedItem);
  }

  saveStoredProducts(products);
}

/**
 * Adds a new product to storage
 */
export function addStoredProduct(newProduct: ProductItem): void {
  const products = getStoredProducts();
  const count = Math.max(0, newProduct.inventoryCount ?? 0);
  const normalizedItem: ProductItem = {
    ...newProduct,
    inventoryCount: count,
    inStock: count > 0
  };
  products.unshift(normalizedItem);
  saveStoredProducts(products);
}

/**
 * Deletes a product from storage
 */
export function deleteStoredProduct(id: string): void {
  const products = getStoredProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveStoredProducts(filtered);
}
