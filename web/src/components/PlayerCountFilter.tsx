"use client";

const PLAYER_CHIPS = ["2", "4", "6", "8+"] as const;
export type PlayerChip = (typeof PLAYER_CHIPS)[number];

type Props = {
  selectedCounts: string[];
  onCountsChange: (counts: string[]) => void;
};

export default function PlayerCountFilter({
  selectedCounts,
  onCountsChange,
}: Props) {
  function toggle(chip: string) {
    if (selectedCounts.includes(chip)) {
      onCountsChange(selectedCounts.filter((c) => c !== chip));
    } else {
      onCountsChange([...selectedCounts, chip]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-600 font-medium">Players:</span>
      {PLAYER_CHIPS.map((chip) => {
        const isActive = selectedCounts.includes(chip);
        return (
          <button
            key={chip}
            onClick={() => toggle(chip)}
            aria-pressed={isActive}
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
  );
}
