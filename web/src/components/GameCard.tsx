"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Game } from "@/data/games";
import { useCart } from "@/context/CartContext";

type Props = {
  game: Game;
  onSelect?: (game: Game) => void;
};

export default function GameCard({ game, onSelect }: Props) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const inCart = items.some((i) => i.game.id === game.id);

  function handleAddToCart() {
    if (inCart) {
      router.push("/cart");
      return;
    }
    addItem(game, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image — links to detail page */}
      <Link
        href={`/games/${game.id}`}
        className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="flex items-center justify-between px-4 py-3 gap-2">
        <div className="min-w-0">
          <Link
            href={`/games/${game.id}`}
            className="text-sm font-semibold text-gray-900 truncate block hover:text-blue-800 transition-colors"
          >
            {game.name}
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">${game.pricePerDay} · day</p>
        </div>
        <div className="flex items-center gap-1.5">
          {onSelect && (
            <button
              onClick={() => onSelect(game)}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Rent Now
            </button>
          )}
          <button
            onClick={handleAddToCart}
            className={`shrink-0 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              added
                ? "bg-green-500 text-white scale-95"
                : inCart
                ? "bg-blue-900 text-white"
                : "text-blue-900 hover:brightness-95"
            }`}
            style={added || inCart ? undefined : { backgroundColor: "var(--color-accent)" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              {added ? "check" : inCart ? "check_circle" : "add_shopping_cart"}
            </span>
            {added ? "Added!" : inCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
