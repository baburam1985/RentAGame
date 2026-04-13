"use client";

import { useEffect, useState } from "react";
import { games } from "@/data/games";
import GameCard from "./GameCard";

const STORAGE_KEY = "rg_recent_views";
const MAX_RECENT = 4;

export function addRecentView(gameId: string): void {
  if (typeof window === "undefined") return;
  const existing: string[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? "[]"
  );
  // Remove duplicate, prepend new, keep max 4
  const updated = [gameId, ...existing.filter((id) => id !== gameId)].slice(
    0,
    MAX_RECENT
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export default function RecentlyViewed() {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRecentIds(JSON.parse(stored));
    }
  }, []);

  if (recentIds.length === 0) return null;

  const recentGames = recentIds
    .map((id) => games.find((g) => g.id === id))
    .filter((g): g is (typeof games)[number] => g !== undefined);

  if (recentGames.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-lg font-bold text-blue-900 mb-4">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {recentGames.map((game) => (
          <div key={game.id} className="shrink-0 w-56">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </section>
  );
}
