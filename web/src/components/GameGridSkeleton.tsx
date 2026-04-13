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
            className="animate-pulse rounded-2xl bg-gray-200 overflow-hidden"
          >
            <div className="aspect-[4/3] bg-gray-300" />
            <div className="p-4 flex flex-col gap-3">
              <div className="h-4 bg-gray-300 rounded w-1/3" />
              <div className="h-5 bg-gray-300 rounded w-2/3" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-9 bg-gray-300 rounded-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
