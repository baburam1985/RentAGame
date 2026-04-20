"use client";

const SORT_LABELS: Record<string, string> = {
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A\u2013Z",
};

type Props = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOrder: string;
  onSortChange: (sort: string) => void;
  onClearAll: () => void;
};

export default function ActiveFilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
  onClearAll,
}: Props) {
  const chips: { label: string; ariaLabel: string; onRemove: () => void }[] =
    [];

  if (searchQuery) {
    chips.push({
      label: `Search: ${searchQuery}`,
      ariaLabel: "Remove search filter",
      onRemove: () => onSearchChange(""),
    });
  }

  if (activeCategory !== "All") {
    chips.push({
      label: activeCategory,
      ariaLabel: "Remove category filter",
      onRemove: () => onCategoryChange("All"),
    });
  }

  if (sortOrder !== "featured" && SORT_LABELS[sortOrder]) {
    chips.push({
      label: SORT_LABELS[sortOrder],
      ariaLabel: "Remove sort filter",
      onRemove: () => onSortChange("featured"),
    });
  }

  if (chips.length === 0) return null;

  return (
    <section
      aria-label="Active filters"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <span
            key={chip.ariaLabel}
            className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800"
          >
            {chip.label}
            <button
              type="button"
              aria-label={chip.ariaLabel}
              onClick={chip.onRemove}
              className="ml-1 rounded-full p-0.5 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
            </button>
          </span>
        ))}
        <button
          type="button"
          aria-label="Clear all"
          onClick={onClearAll}
          className="rounded-full px-3 py-1 text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Clear all
        </button>
      </div>
    </section>
  );
}
