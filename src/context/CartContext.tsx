import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem } from '../types';
import { DEFAULT_USD_TO_RUB_RATE, getDualPrice } from '../utils/currency';
import { getStoredProducts } from '../utils/productStorage';

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ProductItem, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalUsdPrice: number;
  totalRubPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  exchangeRate: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'afrus_store_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const exchangeRate = DEFAULT_USD_TO_RUB_RATE;

  // Sync cart items with stored products whenever products are updated in Admin Portal
  useEffect(() => {
    const handleProductsUpdated = () => {
      const storedProducts = getStoredProducts();
      setItems((prevItems) =>
        prevItems.map((item) => {
          const updatedProd = storedProducts.find((p) => p.id === item.product.id);
          if (updatedProd) {
            const availableStock = updatedProd.inventoryCount !== undefined ? updatedProd.inventoryCount : (updatedProd.inStock !== false ? 25 : 0);
            return {
              ...item,
              product: updatedProd,
              quantity: Math.min(item.quantity, availableStock)
            };
          }
          return item;
        }).filter((item) => {
          const availableStock = item.product.inventoryCount !== undefined ? item.product.inventoryCount : (item.product.inStock !== false ? 25 : 0);
          return availableStock > 0;
        })
      );
    };

    window.addEventListener('afrus_products_updated', handleProductsUpdated);
    return () => {
      window.removeEventListener('afrus_products_updated', handleProductsUpdated);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [items]);

  const addToCart = (product: ProductItem, quantity: number = 1, selectedSize?: string) => {
    const stored = getStoredProducts().find((p) => p.id === product.id) || product;
    const maxStock = stored.inventoryCount !== undefined ? stored.inventoryCount : (stored.inStock !== false ? 25 : 0);

    if (maxStock <= 0) {
      setIsCartOpen(true);
      return;
    }

    const wasEmpty = items.length === 0;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        const currentQty = newItems[existingIndex].quantity;
        const targetQty = Math.min(maxStock, currentQty + quantity);
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          product: stored,
          quantity: targetQty
        };
        return newItems;
      } else {
        const targetQty = Math.min(maxStock, quantity);
        return [...prevItems, { product: stored, quantity: targetQty, selectedSize }];
      }
    });

    // Only redirect/open cart drawer on the FIRST time a product is added (when cart was empty)
    if (wasEmpty) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && (selectedSize === undefined || item.selectedSize === selectedSize))
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId && (selectedSize === undefined || item.selectedSize === selectedSize)) {
          const stored = getStoredProducts().find((p) => p.id === productId) || item.product;
          const maxStock = stored.inventoryCount !== undefined ? stored.inventoryCount : (stored.inStock !== false ? 25 : 0);
          const cappedQty = Math.min(maxStock, quantity);
          return { ...item, product: stored, quantity: cappedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalUsdPrice = items.reduce((sum, item) => {
    return sum + item.product.priceUsd * item.quantity;
  }, 0);

  const totalRubPrice = Math.round(items.reduce((sum, item) => {
    const unitRub = item.product.priceRub ?? item.product.priceUsd * exchangeRate;
    return sum + unitRub * item.quantity;
  }, 0));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        totalUsdPrice,
        totalRubPrice,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        exchangeRate
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
