"use client";

export const OCCASIONS = ["Wedding", "Corporate", "Kids Party"] as const;
export type Occasion = (typeof OCCASIONS)[number];

type Props = {
  activeOccasion: Occasion | null;
  onOccasionChange: (occasion: Occasion | null) => void;
};

export default function OccasionFilter({ activeOccasion, onOccasionChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {OCCASIONS.map((occasion) => {
        const isActive = occasion === activeOccasion;
        return (
          <button
            key={occasion}
            onClick={() => onOccasionChange(isActive ? null : occasion)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={isActive ? { backgroundColor: "var(--color-accent)" } : {}}
            aria-pressed={isActive}
          >
            {occasion}
          </button>
        );
      })}
    </div>
  );
}
