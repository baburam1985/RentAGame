export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
          The Field Is{" "}
          <span style={{ color: "var(--color-accent)" }}>Yours.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Premium outdoor game rentals delivered to your event. Giant Jenga,
          Cornhole, Bocce Ball, and more — perfect for weddings, parties, and
          backyard BBQs.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#catalog"
            className="inline-block rounded-full px-8 py-3.5 text-base font-semibold text-gray-900 shadow-lg hover:brightness-95 transition-all"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Browse Games
          </a>
          <a
            href="#how-it-works"
            className="inline-block rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all"
          >
            How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
