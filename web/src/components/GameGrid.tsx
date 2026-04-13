"use client";

import { games } from "@/data/games";
import GameCard from "./GameCard";

type Props = {
  activeCategory: string;
  searchQuery?: string;
  sortOrder?: string;
};

export default function GameGrid({
  activeCategory,
  searchQuery = "",
  sortOrder = "featured",
}: Props) {
  const query = searchQuery.toLowerCase();

  const filtered = games.filter((g) => {
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
        <p className="text-gray-400 text-center py-16">
          No games found. Try a different search or category.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((game) => (
              <GameCard key={game.id} game={game} />
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
