'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  slug: string;
  categorySlug: string;
  name: string;
  modelCode: string;
  categoryName: string;
  division: string;
  image: string;
  quantity: number;
  tagline?: string;
}

export interface WishlistItem {
  slug: string;
  categorySlug: string;
  name: string;
  modelCode: string;
  categoryName: string;
  division: string;
  image: string;
  tagline?: string;
  addedAt: number;
}

interface ToastMessage {
  id: string;
  text: string;
  type: 'cart' | 'wishlist' | 'info';
}

interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (slug: string, delta: number) => void;
  setExactQuantity: (slug: string, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (slug: string) => void;
  toggleWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  isInWishlist: (slug: string) => boolean;
  moveToCart: (slug: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  activeDrawerTab: 'cart' | 'wishlist';
  setActiveDrawerTab: (tab: 'cart' | 'wishlist') => void;
  totalCartCount: number;
  totalWishlistCount: number;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'napl_quote_cart_v1';
const WISHLIST_STORAGE_KEY = 'napl_wishlist_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'cart' | 'wishlist'>('cart');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.warn('Could not read cart/wishlist from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist, isLoaded]);

  const showToast = (text: string, type: 'cart' | 'wishlist' | 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) =>
          p.slug === item.slug ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...item, quantity: Math.max(1, quantity) }];
    });
    showToast(`Added "${item.name}" to Quotation Cart`, 'cart');
  };

  const updateQuantity = (slug: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((p) => {
          if (p.slug === slug) {
            const newQty = p.quantity + delta;
            return newQty > 0 ? { ...p, quantity: newQty } : null;
          }
          return p;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setExactQuantity = (slug: string, quantity: number) => {
    setCart((prev) =>
      prev.map((p) => {
        if (p.slug === slug) {
          const sanitized = Math.max(1, Math.min(9999, Math.floor(quantity)));
          return { ...p, quantity: sanitized };
        }
        return p;
      })
    );
  };

  const removeFromCart = (slug: string) => {
    const item = cart.find((p) => p.slug === slug);
    setCart((prev) => prev.filter((p) => p.slug !== slug));
    if (item) {
      showToast(`Removed "${item.name}" from Quotation Cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.slug === item.slug)) return prev;
      return [...prev, { ...item, addedAt: Date.now() }];
    });
    showToast(`Saved "${item.name}" to Wishlist`, 'wishlist');
  };

  const removeFromWishlist = (slug: string) => {
    const item = wishlist.find((p) => p.slug === slug);
    setWishlist((prev) => prev.filter((p) => p.slug !== slug));
    if (item) {
      showToast(`Removed "${item.name}" from Wishlist`, 'info');
    }
  };

  const toggleWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    if (isInWishlist(item.slug)) {
      removeFromWishlist(item.slug);
    } else {
      addToWishlist(item);
    }
  };

  const isInWishlist = (slug: string) => {
    return wishlist.some((p) => p.slug === slug);
  };

  const moveToCart = (slug: string) => {
    const item = wishlist.find((p) => p.slug === slug);
    if (!item) return;
    removeFromWishlist(slug);
    addToCart(
      {
        slug: item.slug,
        categorySlug: item.categorySlug,
        name: item.name,
        modelCode: item.modelCode,
        categoryName: item.categoryName,
        division: item.division,
        image: item.image,
        tagline: item.tagline,
      },
      1
    );
    setActiveDrawerTab('cart');
  };

  const openCart = () => {
    setActiveDrawerTab('cart');
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        updateQuantity,
        setExactQuantity,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        moveToCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        activeDrawerTab,
        setActiveDrawerTab,
        totalCartCount,
        totalWishlistCount,
        toasts,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
