"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  gameId: string;
  gameName: string;
  pricePerDay: number;
  days: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (gameId: string) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

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

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalItems: items.length }}
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
