"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type CartItem = {
  gameId: string;
  gameName: string;
  pricePerDay: number;
  days: number;
  image: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (gameId: string) => void;
  updateDays: (gameId: string, days: number) => void;
  clearCart: () => void;
  totalItems: number;
};

const STORAGE_KEY = "rg_cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(newItem: CartItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.gameId === newItem.gameId);
      if (existing) {
        return prev.map((i) =>
          i.gameId === newItem.gameId ? { ...i, days: newItem.days } : i
        );
      }
      return [...prev, newItem];
    });
  }

  function removeItem(gameId: string) {
    setItems((prev) => prev.filter((i) => i.gameId !== gameId));
  }

  function updateDays(gameId: string, days: number) {
    const clamped = Math.max(1, Math.min(14, days));
    setItems((prev) =>
      prev.map((i) => (i.gameId === gameId ? { ...i, days: clamped } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateDays,
        clearCart,
        totalItems: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
