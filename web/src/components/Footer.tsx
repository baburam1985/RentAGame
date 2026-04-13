export default function Footer() {
  return (
    <footer className="bg-blue-900 w-full rounded-t-[3rem] mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-7xl mx-auto">
        {/* Brand */}
        <div className="space-y-4 text-center md:text-left">
          <div
            className="text-2xl font-black italic text-yellow-400 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif" }}
          >
            Kinetic Games
          </div>
          <p
            className="max-w-xs text-white/70 leading-relaxed text-sm"
            style={{ fontFamily: "var(--font-be-vietnam, 'Be Vietnam Pro'), sans-serif" }}
          >
            Elevating outdoor play through premium game rentals and effortless experiences.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-12 mt-8 md:mt-0">
          <div className="flex flex-col gap-3">
            <span
              className="font-black text-sm tracking-wide uppercase text-yellow-400"
              style={{ fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif" }}
            >
              Services
            </span>
            <a
              href="#"
              className="text-white/70 hover:text-yellow-400 transition-colors text-sm"
              style={{ fontFamily: "var(--font-be-vietnam, 'Be Vietnam Pro'), sans-serif" }}
            >
              Delivery Info
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-yellow-400 transition-colors text-sm"
              style={{ fontFamily: "var(--font-be-vietnam, 'Be Vietnam Pro'), sans-serif" }}
            >
              Safety Guide
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <span
              className="font-black text-sm tracking-wide uppercase text-yellow-400"
              style={{ fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif" }}
            >
              Connect
            </span>
            <a
              href="#"
              className="text-white/70 hover:text-yellow-400 transition-colors text-sm"
              style={{ fontFamily: "var(--font-be-vietnam, 'Be Vietnam Pro'), sans-serif" }}
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-yellow-400 transition-colors text-sm"
              style={{ fontFamily: "var(--font-be-vietnam, 'Be Vietnam Pro'), sans-serif" }}
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-12 pb-12 text-center border-t border-white/10 pt-8">
        <p
          className="text-white/50 text-xs tracking-tight"
          style={{ fontFamily: "var(--font-be-vietnam, 'Be Vietnam Pro'), sans-serif" }}
        >
          © 2024 Kinetic Games. The High-Velocity Playground.
        </p>
        <div
          className="flex justify-center gap-4 mt-4 text-xs tracking-wide uppercase"
          style={{ fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif" }}
        >
          <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">Terms</a>
          <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">Privacy</a>
          <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">Support</a>
          <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
