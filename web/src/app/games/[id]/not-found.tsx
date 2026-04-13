import Link from "next/link";

export default function GameNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-gray-900 mb-4">404</p>
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Game Not Found
      </h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        We couldn&apos;t find a game with that ID. It may have been removed or the
        link might be incorrect.
      </p>
      <Link
        href="/"
        className="rounded-full px-6 py-3 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        Browse Games
      </Link>
    </main>
  );
}
