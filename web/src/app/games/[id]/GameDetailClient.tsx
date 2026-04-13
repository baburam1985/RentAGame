"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Game } from "@/data/games";

const DAY_OPTIONS = [1, 2, 3, 7];

export default function GameDetailClient({ game }: { game: Game }) {
  const { addItem, items } = useCart();
  const [days, setDays] = useState(1);
  const [added, setAdded] = useState(false);

  const alreadyInCart = items.some((i) => i.game.id === game.id);
  const subtotal = game.pricePerDay * days;

  function handleAdd() {
    addItem(game, days);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Rental Duration */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
            Rental Duration
          </p>
          <div className="flex gap-2 flex-wrap">
            {DAY_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`rounded-full px-5 py-2 text-sm font-bold border-2 transition-all ${
                  days === d
                    ? "bg-blue-800 text-white border-blue-800"
                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                }`}
              >
                {d === 7 ? "1 week" : `${d} day${d > 1 ? "s" : ""}`}
              </button>
            ))}
          </div>
        </div>

        {/* Subtotal + CTA — desktop only */}
        <div className="hidden lg:flex items-center justify-between bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Subtotal</p>
            <p className="text-3xl font-black text-blue-800">
              ${subtotal}
              <span className="text-sm font-normal text-gray-400 ml-1">
                for {days === 7 ? "1 week" : `${days} day${days > 1 ? "s" : ""}`}
              </span>
            </p>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 rounded-full px-7 py-3.5 font-black text-base transition-all shadow ${
              added
                ? "bg-green-500 text-white scale-95"
                : alreadyInCart
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                : "bg-yellow-400 text-blue-900 hover:brightness-95"
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              {added ? "check_circle" : "add_shopping_cart"}
            </span>
            {added ? "Added!" : alreadyInCart ? "Update Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Sticky mobile CTA bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 truncate">{game.name}</p>
          <p className="font-black text-blue-900 text-lg">
            ${subtotal}
            <span className="text-xs font-normal text-gray-400 ml-1">
              · {days === 7 ? "1 week" : `${days}d`}
            </span>
          </p>
        </div>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-sm transition-all ${
            added
              ? "bg-green-500 text-white scale-95"
              : alreadyInCart
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-400 text-blue-900 hover:brightness-95"
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            {added ? "check_circle" : "add_shopping_cart"}
          </span>
          {added ? "Added!" : alreadyInCart ? "Update Cart" : "Add to Cart"}
        </button>
      </div>
    </>
  );
}
