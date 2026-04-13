"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
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

function loadFromStorage(): CartItem[] {
  try {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadFromStorage);
  const isFirstRender = useRef(true);

  // Persist to localStorage whenever items change (skip the very first render
  // to avoid immediately overwriting the value we just read on mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

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
