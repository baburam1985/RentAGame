"use client";

import { createContext, useContext, useState } from "react";
import type { Game } from "@/data/games";

export type CartItem = {
  game: Game;
  days: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (game: Game, days: number) => void;
  removeItem: (gameId: string) => void;
  updateDays: (gameId: string, days: number) => void;
  totalCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(game: Game, days: number) {
    setItems((prev) => {
      const existing = prev.find((i) => i.game.id === game.id);
      if (existing) {
        return prev.map((i) =>
          i.game.id === game.id ? { ...i, days } : i
        );
      }
      return [...prev, { game, days }];
    });
  }

  function removeItem(gameId: string) {
    setItems((prev) => prev.filter((i) => i.game.id !== gameId));
  }

  function updateDays(gameId: string, days: number) {
    setItems((prev) =>
      prev.map((i) => (i.game.id === gameId ? { ...i, days } : i))
    );
  }

  const totalCount = items.length;
  const totalPrice = items.reduce(
    (sum, i) => sum + i.game.pricePerDay * i.days,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateDays, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
