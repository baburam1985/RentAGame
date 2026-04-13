"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPageClient() {
  const { items, removeItem, updateDays, clearCart } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.pricePerDay * item.days,
    0
  );

  if (items.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </p>
        <p className="text-gray-500 mb-8 max-w-sm">
          You haven&apos;t added any games yet. Start browsing to find the perfect game for your event!
        </p>
        <Link
          href="/#catalog"
          className="rounded-full px-7 py-3 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Browse Games
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-2"
          >
            Clear cart
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Cart items list */}
          <div className="lg:col-span-2 flex flex-col gap-5 mb-8 lg:mb-0">
            {items.map((item) => {
              const lineTotal = item.pricePerDay * item.days;
              return (
                <div
                  key={item.gameId}
                  className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.gameName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {item.gameName}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      ${item.pricePerDay}/day
                    </p>

                    {/* Days selector */}
                    <div className="flex items-center gap-2 mt-3">
                      <label
                        htmlFor={`days-${item.gameId}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Days:
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateDays(item.gameId, item.days - 1)}
                          disabled={item.days <= 1}
                          aria-label={`Decrease days for ${item.gameName}`}
                          className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                        >
                          -
                        </button>
                        <input
                          id={`days-${item.gameId}`}
                          type="number"
                          min={1}
                          max={14}
                          value={item.days}
                          onChange={(e) =>
                            updateDays(
                              item.gameId,
                              parseInt(e.target.value, 10) || 1
                            )
                          }
                          aria-label={`Rental days for ${item.gameName}`}
                          className="w-10 text-center text-sm font-semibold text-gray-900 border-none outline-none bg-white py-1.5"
                        />
                        <button
                          onClick={() => updateDays(item.gameId, item.days + 1)}
                          disabled={item.days >= 14}
                          aria-label={`Increase days for ${item.gameName}`}
                          className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: line total + remove */}
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <p className="font-bold text-gray-900 text-lg">
                      ${lineTotal}
                    </p>
                    <button
                      onClick={() => removeItem(item.gameId)}
                      aria-label={`Remove ${item.gameName} from cart`}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Order Summary
              </h2>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </span>
                <span>${subtotal}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center rounded-full py-3 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
