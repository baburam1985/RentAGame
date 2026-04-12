"use client";

import { games } from "@/data/games";
import type { Game } from "@/data/games";
import GameCard from "./GameCard";

type Props = {
  activeCategory: string;
  onSelect: (game: Game) => void;
};

export default function GameGrid({ activeCategory, onSelect }: Props) {
  const filtered =
    activeCategory === "All"
      ? games
      : games.filter((g) => g.category === activeCategory);

  return (
    <div className="py-12 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Browse Our Games
        </h2>
        <p className="text-gray-500 mb-8">
          Everything you need for an epic outdoor event.
        </p>

        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-16">
            No games in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
