"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "All Games", href: "#catalog" },
  { label: "Family Sets", href: "#catalog" },
  { label: "Party Packs", href: "#catalog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalCount } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full z-50 bg-yellow-400 shadow-[0_20px_40px_rgba(119,99,0,0.08)]">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <a
          href="/"
          className="text-2xl font-black italic text-blue-800 tracking-tight"
          style={{ fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif" }}
        >
          Kinetic Games
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center font-bold">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-blue-800 underline font-semibold transition-all duration-300"
                  : i === 0
                  ? "text-blue-800 border-b-4 border-orange-500 pb-1 transition-all duration-300"
                  : "text-blue-800/80 hover:text-blue-900 transition-all duration-300 hover:scale-105"
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className={`p-2 rounded-full hover:bg-white/20 transition-all duration-300 relative active:scale-95 cursor-pointer inline-flex${pathname === "/cart" ? " underline" : ""}`}
            aria-label={`Cart — ${totalCount} items`}
          >
            <span className="material-symbols-outlined text-blue-700">shopping_cart</span>
            {totalCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            className="p-2 rounded-full hover:bg-white/20 transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Account"
          >
            <span className="material-symbols-outlined text-blue-700">account_circle</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-blue-800 ml-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-yellow-500/40 bg-yellow-400 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-blue-800 font-bold hover:text-blue-900 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
