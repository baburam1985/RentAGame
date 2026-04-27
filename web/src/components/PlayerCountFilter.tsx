"use client";

import { useRef } from "react";

// US-024: PlayerCountFilter — single-select radio group for player count
const PLAYER_CHIPS = ["2", "4", "6", "8+"] as const;
export type PlayerChip = (typeof PLAYER_CHIPS)[number];

type Props = {
  activeCount: string;
  onCountChange: (count: string) => void;
};

export default function PlayerCountFilter({ activeCount, onCountChange }: Props) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (index + 1) % PLAYER_CHIPS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (index - 1 + PLAYER_CHIPS.length) % PLAYER_CHIPS.length;
    } else {
      return;
    }
    itemRefs.current[next]?.focus();
    onCountChange(PLAYER_CHIPS[next]);
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-600 font-medium">Players:</span>
      <div
        role="radiogroup"
        aria-label="Player count filter"
        className="flex flex-wrap gap-2"
      >
        {PLAYER_CHIPS.map((chip, index) => {
          const isActive = chip === activeCount;
          return (
            <button
              key={chip}
              ref={(el) => { itemRefs.current[index] = el; }}
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onCountChange(chip)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}
