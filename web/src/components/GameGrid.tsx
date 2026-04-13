"use client";

import { games as defaultGames } from "@/data/games";
import type { Game } from "@/data/games";
import GameCard from "./GameCard";

type Props = {
  activeCategory: string;
  onSelect: (game: Game) => void;
  searchQuery?: string;
  games?: Game[];
  sortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
};

export default function GameGrid({
  activeCategory,
  onSelect,
  searchQuery = "",
  games = defaultGames,
  sortOrder = "featured",
  minPrice,
  maxPrice,
}: Props) {
  const query = searchQuery.toLowerCase();

  const filtered = games.filter((g) => {
    const matchesCategory =
      activeCategory === "All" || g.category === activeCategory;
    const matchesSearch =
      query === "" ||
      g.name.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query);
    const matchesMinPrice = minPrice === undefined || g.pricePerDay >= minPrice;
    const matchesMaxPrice = maxPrice === undefined || g.pricePerDay <= maxPrice;
    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "price-asc") return a.pricePerDay - b.pricePerDay;
    if (sortOrder === "price-desc") return b.pricePerDay - a.pricePerDay;
    if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
    return 0; // featured — preserve original order
  });

  return (
    <div className="py-12 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Browse Our Games
        </h2>
        <p className="text-gray-500 mb-8">
          Everything you need for an epic outdoor event.
        </p>

        {sorted.length === 0 ? (
          <p className="text-gray-400 text-center py-16">
            No games found. Try a different search or category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((game) => (
              <GameCard key={game.id} game={game} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
