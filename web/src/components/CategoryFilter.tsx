"use client";

import { CATEGORIES, type Category } from "@/data/games";

type Props = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

export default function CategoryFilter({ activeCategory, onCategoryChange }: Props) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-4 py-4 min-w-max mx-auto max-w-7xl sm:px-6 lg:px-8">
        {CATEGORIES.map((cat: Category) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-gray-900"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={isActive ? { backgroundColor: "var(--color-accent)" } : {}}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
