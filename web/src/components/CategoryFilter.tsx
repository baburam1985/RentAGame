"use client";

import { useRef } from "react";
import { CATEGORIES, type Category } from "@/data/games";

type Props = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

export default function CategoryFilter({ activeCategory, onCategoryChange }: Props) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (index + 1) % CATEGORIES.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else {
      return;
    }
    itemRefs.current[next]?.focus();
    onCategoryChange(CATEGORIES[next]);
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div
        role="radiogroup"
        aria-label="Category filter"
        className="flex gap-2 px-4 py-4 min-w-max mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        {CATEGORIES.map((cat: Category, index: number) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              ref={(el) => { itemRefs.current[index] = el; }}
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onCategoryChange(cat)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-gray-900"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={isActive ? { backgroundColor: "var(--color-accent)" } : {}}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
