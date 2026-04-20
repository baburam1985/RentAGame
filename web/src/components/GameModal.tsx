"use client";

import Image from "next/image";
import type { Game } from "@/data/games";

export const CANCELLATION_POLICY =
  "Free cancellation up to 24 hours before your rental start date";

type Props = {
  game: Game | null;
  onClose: () => void;
  onRentNow: (game: Game) => void;
};

export default function GameModal({ game, onClose, onRentNow }: Props) {
  if (!game) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={game.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-t-2xl overflow-hidden">
          <Image
            src={game.image}
            alt={game.name}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          {/* Category + Name */}
          <div>
            <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 mb-2">
              {game.category}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">{game.name}</h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{game.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-gray-400 text-xs mb-1">Players</p>
              <p className="font-medium text-gray-800">{game.players}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-gray-400 text-xs mb-1">Dimensions</p>
              <p className="font-medium text-gray-800">{game.dimensions}</p>
            </div>
          </div>

          {/* Cancellation policy */}
          <div
            data-testid="cancellation-policy"
            className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            <span
              className="material-symbols-outlined text-green-600 text-base leading-none"
              aria-hidden="true"
            >
              event_available
            </span>
            <span>{CANCELLATION_POLICY}</span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400">Rental price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${game.pricePerDay}
                <span className="text-sm font-normal text-gray-400">/day</span>
              </p>
            </div>
            <button
              onClick={() => onRentNow(game)}
              className="rounded-full px-6 py-3 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Rent This Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
