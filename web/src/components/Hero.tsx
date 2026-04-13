import Link from "next/link";
import { games } from "@/data/games";
import { SERVICE_AREA } from "@/constants";

export default function Hero() {
  const previews = games.slice(0, 4);

  return (
    <section id="hero" className="relative overflow-hidden pt-14 pb-10 px-6" style={{ background: "#fffde1" }}>
      {/* Decorative blob */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #F5C518 0%, #fff7a1 60%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 w-[280px] h-[280px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #1e40af 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          {/* Text column */}
          <div className="flex-1 max-w-2xl">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-1.5 bg-blue-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                sports_esports
              </span>
              Premium Outdoor Game Rentals
            </span>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-blue-900 leading-[0.95] tracking-tight">
              The Field Is{" "}
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #1e40af 0%, #F5C518 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Yours.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-lg text-gray-600 max-w-md leading-relaxed">
              Bring the fun to your next event. Lawn games, party sets &amp; more — delivered, set up, and picked up for you.
            </p>

            {/* Service area notice */}
            <div
              data-testid="service-area-notice"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-gray-600"
            >
              <span className="material-symbols-outlined text-blue-700" style={{ fontSize: "16px" }} aria-hidden="true">
                location_on
              </span>
              {SERVICE_AREA}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/#catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-blue-900 transition-all hover:brightness-95 active:scale-95"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  sports_handball
                </span>
                Browse Games
              </a>
              <a
                href="/#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-blue-900 bg-white border-2 border-blue-900/10 hover:border-blue-900/30 transition-all active:scale-95"
              >
                How It Works
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  arrow_downward
                </span>
              </a>
            </div>

            {/* Social proof */}
            <p className="mt-6 text-xs text-gray-400 font-medium tracking-wide">
              ★★★★★ Trusted by 200+ events in the Bay Area
            </p>
          </div>

          {/* Game preview grid */}
          <div className="lg:flex-1 grid grid-cols-2 gap-3">
            {previews.map((game, i) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className={`relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group ${i === 0 ? "row-span-2 h-64 lg:h-auto" : "h-32"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-2 left-2 text-white text-xs font-bold drop-shadow">
                  {game.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
