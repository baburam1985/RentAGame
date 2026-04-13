"use client";
import { useState, useEffect } from "react";

type Props = {
  gameId: string;
  gameName: string;
};

export default function WishlistButton({ gameId, gameName }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("rg_wishlist");
    if (stored) {
      try {
        const ids = JSON.parse(stored) as string[];
        setWishlisted(ids.includes(gameId));
      } catch {
        // ignore
      }
    }
  }, [gameId]);

  function handleClick() {
    const isLoggedIn = Boolean(localStorage.getItem("rg_user"));
    if (!isLoggedIn) {
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 2500);
      return;
    }

    const stored = localStorage.getItem("rg_wishlist");
    let ids: string[] = [];
    try {
      ids = stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      ids = [];
    }

    let updated: string[];
    if (wishlisted) {
      updated = ids.filter((id) => id !== gameId);
    } else {
      updated = [...ids, gameId];
    }
    localStorage.setItem("rg_wishlist", JSON.stringify(updated));
    setWishlisted(!wishlisted);
  }

  const label = wishlisted
    ? `Remove ${gameName} from wishlist`
    : `Add ${gameName} to wishlist`;

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        aria-label={label}
        className="p-1.5 rounded-full hover:bg-red-50 transition-colors"
      >
        <span
          className={`material-symbols-outlined text-xl ${wishlisted ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
          style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
      </button>
      {showPrompt && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-10"
        >
          Log in to save games
        </div>
      )}
    </div>
  );
}
