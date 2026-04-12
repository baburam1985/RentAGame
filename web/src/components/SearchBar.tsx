"use client";

type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export default function SearchBar({ searchQuery, onSearchChange }: Props) {
  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="game-search" className="sr-only">
        Search games
      </label>
      <input
        id="game-search"
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search games..."
        className="w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
      />
      {searchQuery && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onSearchChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
