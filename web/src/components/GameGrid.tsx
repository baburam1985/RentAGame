"use client";

import { games } from "@/data/games";
import GameCard from "./GameCard";

import type { Game } from "@/data/games";

type Props = {
  activeCategory: string;
  searchQuery?: string;
  sortOrder?: string;
  onSelect?: (game: Game) => void;
  onClearFilters?: () => void;
  games?: Game[];
};

export default function GameGrid({
  activeCategory,
  searchQuery = "",
  sortOrder = "featured",
  onSelect,
  onClearFilters,
  games: gamesProp,
}: Props) {
  const query = searchQuery.toLowerCase();
  const sourceGames = gamesProp ?? games;

  const filtered = sourceGames.filter((g) => {
    const matchesCategory =
      activeCategory === "All" || g.category === activeCategory;
    const matchesSearch =
      query === "" ||
      g.name.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "price-asc") return a.pricePerDay - b.pricePerDay;
    if (sortOrder === "price-desc") return b.pricePerDay - a.pricePerDay;
    if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
    return 0; // featured — preserve original order
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-4">
          <p className="text-gray-400 text-center text-lg">No games found.</p>
          <p className="text-gray-400 text-center text-sm">Try clearing some filters</p>
          <button
            onClick={onClearFilters}
            aria-label="Browse all games"
            className="rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
          >
            Browse all games
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((game) => (
              <GameCard key={game.id} game={game} onSelect={onSelect} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Show More Games
            </button>
          </div>
        </>
      )}
    </div>
  );
}
