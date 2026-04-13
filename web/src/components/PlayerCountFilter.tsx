"use client";

// US-024: PlayerCountFilter — single-select radio group for player count
// This component will be replaced/expanded by US-004 PlayerCountFilter implementation

const PLAYER_CHIPS = ["2", "4", "6", "8+"] as const;

type Props = {
  activeCount: string;
  onCountChange: (count: string) => void;
};

export default function PlayerCountFilter({ activeCount, onCountChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-600 font-medium">Players:</span>
      <div role="radiogroup" aria-label="Player count filter" className="flex flex-wrap gap-2">
        {PLAYER_CHIPS.map((chip) => {
          const isActive = chip === activeCount;
          return (
            <button
              key={chip}
              role="radio"
              aria-checked={isActive}
              onClick={() => onCountChange(chip)}
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
