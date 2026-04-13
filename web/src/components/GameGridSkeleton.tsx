"use client";

export default function GameGridSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading games"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            data-testid="skeleton-card"
            className="animate-pulse bg-gray-200 rounded-2xl h-[320px]"
          />
        ))}
      </div>
    </div>
  );
}
