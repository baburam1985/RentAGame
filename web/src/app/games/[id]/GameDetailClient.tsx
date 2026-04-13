"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/data/games";
import { useCart } from "@/context/CartContext";

type Props = {
  game: Game;
};

export default function GameDetailClient({ game }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [days, setDays] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({
      gameId: game.id,
      gameName: game.name,
      pricePerDay: game.pricePerDay,
      days,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleDaysChange(value: number) {
    const clamped = Math.max(1, Math.min(14, value));
    setDays(clamped);
  }

  const totalPrice = game.pricePerDay * days;

  return (
    <main className="flex-1">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-900 font-medium truncate">{game.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left column — Gallery */}
          <div className="mb-8 lg:mb-0">
            {/* Main image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <Image
                src={game.images[activeImage]}
                alt={`${game.name} — photo ${activeImage + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            {game.images.length > 1 && (
              <ul
                className="flex gap-3 overflow-x-auto pb-1 list-none p-0 m-0"
                aria-label="Photo gallery thumbnails"
              >
                {game.images.map((src, index) => (
                  <li key={src} className="flex-shrink-0">
                    <button
                      onClick={() => setActiveImage(index)}
                      aria-label={`View photo ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400 block ${
                        activeImage === index
                          ? "border-yellow-400"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${game.name} thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right column — Details (hidden on mobile, shown in sidebar on desktop) */}
          <div className="hidden lg:flex lg:flex-col lg:gap-6">
            <GameDetails game={game} />
            <CartBar
              game={game}
              days={days}
              totalPrice={totalPrice}
              added={added}
              onDaysChange={handleDaysChange}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Mobile details — shown below gallery */}
        <div className="lg:hidden mt-8 flex flex-col gap-6 pb-32">
          <GameDetails game={game} />
        </div>
      </div>

      {/* Sticky bottom bar — mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg px-4 py-3">
        <CartBar
          game={game}
          days={days}
          totalPrice={totalPrice}
          added={added}
          onDaysChange={handleDaysChange}
          onAddToCart={handleAddToCart}
          compact
        />
      </div>
    </main>
  );
}

type GameDetailsProps = {
  game: Game;
};

function GameDetails({ game }: GameDetailsProps) {
  return (
    <>
      {/* Category + Name */}
      <div>
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 mb-3">
          {game.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {game.name}
        </h1>
      </div>

      {/* Price */}
      <p className="text-2xl font-bold text-gray-900">
        ${game.pricePerDay}
        <span className="text-base font-normal text-gray-400 ml-1">/day</span>
      </p>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{game.description}</p>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-gray-400 text-xs mb-1">Players</p>
          <p className="font-semibold text-gray-800">{game.players}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-gray-400 text-xs mb-1">Dimensions</p>
          <p className="font-semibold text-gray-800">{game.dimensions}</p>
        </div>
      </div>

      {/* How to Play */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Play</h2>
        <ol className="flex flex-col gap-3">
          {game.howToPlay.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-gray-900"
                style={{ backgroundColor: "var(--color-accent)" }}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <p className="text-gray-600 leading-relaxed pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

type CartBarProps = {
  game: Game;
  days: number;
  totalPrice: number;
  added: boolean;
  onDaysChange: (value: number) => void;
  onAddToCart: () => void;
  compact?: boolean;
};

function CartBar({
  game,
  days,
  totalPrice,
  added,
  onDaysChange,
  onAddToCart,
  compact = false,
}: CartBarProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label
            htmlFor="days-selector-mobile"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            Days:
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onDaysChange(days - 1)}
              disabled={days <= 1}
              aria-label="Decrease days"
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <input
              id="days-selector-mobile"
              type="number"
              min={1}
              max={14}
              value={days}
              onChange={(e) => onDaysChange(parseInt(e.target.value, 10) || 1)}
              aria-label="Number of rental days"
              className="w-10 text-center text-sm font-semibold text-gray-900 border-none outline-none bg-white py-2"
            />
            <button
              onClick={() => onDaysChange(days + 1)}
              disabled={days >= 14}
              aria-label="Increase days"
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={onAddToCart}
          aria-label={`Add ${game.name} to cart for ${days} day${days !== 1 ? "s" : ""}`}
          className="flex-1 rounded-full py-2.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all text-center"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {added ? "Added!" : `Add to Cart — $${totalPrice}`}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col gap-5">
      <h2 className="text-base font-semibold text-gray-900">Book This Game</h2>

      {/* Day selector */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="days-selector-desktop"
          className="text-sm font-medium text-gray-700"
        >
          Number of days
          <span className="text-gray-400 font-normal ml-1">(1 – 14)</span>
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => onDaysChange(days - 1)}
              disabled={days <= 1}
              aria-label="Decrease days"
              className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <input
              id="days-selector-desktop"
              type="number"
              min={1}
              max={14}
              value={days}
              onChange={(e) => onDaysChange(parseInt(e.target.value, 10) || 1)}
              aria-label="Number of rental days"
              className="w-12 text-center text-base font-semibold text-gray-900 border-none outline-none bg-white py-2.5"
            />
            <button
              onClick={() => onDaysChange(days + 1)}
              disabled={days >= 14}
              aria-label="Increase days"
              className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-400">
            ${game.pricePerDay} × {days} day{days !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Total + CTA */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900">${totalPrice}</p>
        </div>
        <button
          onClick={onAddToCart}
          aria-label={`Add ${game.name} to cart for ${days} day${days !== 1 ? "s" : ""}`}
          className="rounded-full px-6 py-3 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
