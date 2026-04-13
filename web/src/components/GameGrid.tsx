"use client";

import { games, type Game } from "@/data/games";
import GameCard from "./GameCard";

/**
 * Parse a players string like "2–10 players", "4 players (2v2)", "4–20+ players"
 * and return { min, max } where max === Infinity means unbounded.
 */
function parsePlayers(playersStr: string): { min: number; max: number } {
  // Match range like "2–10" or "4–20+"
  const rangeMatch = playersStr.match(/(\d+)\s*[–-]\s*(\d+)\+?/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1], 10);
    const max = parseInt(rangeMatch[2], 10);
    // If the original string contains "20+" or similar unbounded marker
    const unbounded = playersStr.includes("+");
    return { min, max: unbounded ? Infinity : max };
  }
  // Match a single number like "2 players" or "4 players (2v2)"
  const singleMatch = playersStr.match(/^(\d+)/);
  if (singleMatch) {
    const n = parseInt(singleMatch[1], 10);
    return { min: n, max: n };
  }
  return { min: 0, max: Infinity };
}

/**
 * Returns true if the game's player range includes the requested chip count.
 * Chip "8+" means the game supports 8 or more players.
 */
function playerCountMatches(game: Game, chip: string): boolean {
  const { min, max } = parsePlayers(game.players);
  if (chip === "8+") {
    return max >= 8 || max === Infinity;
  }
  const count = parseInt(chip, 10);
  return count >= min && count <= max;
}

type Props = {
  activeCategory: string;
  searchQuery?: string;
  sortOrder?: string;
  selectedPlayerCounts?: string[];
  onSelect?: (game: Game) => void;
};

export default function GameGrid({
  activeCategory,
  searchQuery = "",
  sortOrder = "featured",
  selectedPlayerCounts = [],
  onSelect,
}: Props) {
  const query = searchQuery.toLowerCase();

  const filtered = games.filter((g) => {
    const matchesCategory =
      activeCategory === "All" || g.category === activeCategory;
    const matchesSearch =
      query === "" ||
      g.name.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query);
    const matchesPlayers =
      selectedPlayerCounts.length === 0 ||
      selectedPlayerCounts.some((chip) => playerCountMatches(g, chip));
    return matchesCategory && matchesSearch && matchesPlayers;
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
