"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const DAY_OPTIONS = [1, 2, 3, 7];

export default function CartPage() {
  const { items, removeItem, updateDays, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-6"
        style={{ background: "#fffde1" }}
      >
        <span
          className="material-symbols-outlined text-blue-800"
          style={{ fontSize: "64px" }}
        >
          shopping_cart
        </span>
        <h1 className="text-3xl font-black text-blue-900">Your cart is empty</h1>
        <p className="text-gray-500 text-center max-w-sm">
          Browse our outdoor game catalog and add something fun to your event!
        </p>
        <Link
          href="/#catalog"
          className="px-6 py-3 rounded-full font-bold text-blue-900 transition-all hover:brightness-95"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Browse Games
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12" style={{ background: "#fffde1" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-blue-900 mb-8">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map(({ game, days }) => {
              const subtotal = game.pricePerDay * days;
              return (
                <div
                  key={game.id}
                  className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm items-start"
                >
                  {/* Image */}
                  <Link href={`/games/${game.id}`} className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/games/${game.id}`}
                      className="font-bold text-blue-900 hover:text-blue-700 transition-colors block truncate"
                    >
                      {game.name}
                    </Link>
                    <p className="text-sm text-gray-400 mt-0.5">
                      ${game.pricePerDay} / day
                    </p>

                    {/* Days selector */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="text-xs text-gray-500 font-medium">Days:</span>
                      {DAY_OPTIONS.map((d) => (
                        <button
                          key={d}
                          onClick={() => updateDays(game.id, d)}
                          className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                            days === d
                              ? "text-blue-900 scale-105"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          style={
                            days === d
                              ? { backgroundColor: "var(--color-accent)" }
                              : undefined
                          }
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subtotal + remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-black text-blue-900 text-lg">
                      ${subtotal}
                    </span>
                    <button
                      onClick={() => removeItem(game.id)}
                      className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      aria-label={`Remove ${game.name}`}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-black text-blue-900 mb-4">Order Summary</h2>

              <div className="flex flex-col gap-2 mb-4">
                {items.map(({ game, days }) => (
                  <div key={game.id} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate mr-2">{game.name}</span>
                    <span className="shrink-0">${game.pricePerDay * days}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between font-black text-blue-900 text-lg">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Delivery & setup included
                </p>
              </div>

              <Link
                href="/#contact"
                className="block text-center px-6 py-3 rounded-full font-bold text-blue-900 transition-all hover:brightness-95 w-full"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Request a Quote
              </Link>

              <Link
                href="/#catalog"
                className="block text-center mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
