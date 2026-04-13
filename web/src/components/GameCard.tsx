import Image from "next/image";
import type { Game } from "@/data/games";

type Props = {
  game: Game;
  onSelect: (game: Game) => void;
};

export default function GameCard({ game, onSelect }: Props) {
  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={game.image}
          alt={game.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category badge */}
        <span className="inline-block w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {game.category}
        </span>

        {/* Name */}
        <h3
          data-testid="game-card-name"
          className="font-semibold text-gray-900 text-base leading-snug"
        >
          {game.name}
        </h3>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm font-medium text-gray-700">
            ${game.pricePerDay}
            <span className="text-gray-400">/day</span>
          </span>
          <button
            onClick={() => onSelect(game)}
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}
