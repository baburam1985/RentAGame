/**
 * US-022 — Descriptive alt text for all game images
 *
 * Tests that:
 * - Game type has a required imageAlt string field
 * - All games in the catalog have descriptive imageAlt values (20–80 chars)
 * - GameCard renders the image with game.imageAlt as the alt attribute
 * - GameModal renders its image with game.imageAlt as the alt attribute
 * - Alt text describes the scene (not just the product name)
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GameCard from "./GameCard";
import GameModal from "./GameModal";
import { CartProvider } from "@/context/CartContext";
import { games } from "@/data/games";
import type { Game } from "@/data/games";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockGameWithAlt: Game = {
  id: "test-alt-game",
  name: "Test Alt Game",
  category: "Lawn Games",
  description: "A test game for alt text checking.",
  pricePerDay: 30,
  image: "https://images.unsplash.com/photo-test-alt",
  imageAlt: "Players tossing beanbags at a wooden cornhole board on a sunny lawn",
  images: [
    "https://images.unsplash.com/photo-test-alt",
    "https://images.unsplash.com/photo-test-alt2",
  ],
  players: "2–4 players",
  dimensions: "4 ft × 2 ft boards",
  howToPlay: ["Step one.", "Step two."],
};

describe("US-022 — Descriptive alt text for all game images", () => {
  describe("Game type — imageAlt field", () => {
    it("Game type has a required imageAlt string field", () => {
      // imageAlt must exist on the typed mock (TypeScript enforces this at compile time)
      expect(mockGameWithAlt.imageAlt).toBeDefined();
      expect(typeof mockGameWithAlt.imageAlt).toBe("string");
    });
  });

  describe("games.ts — all games have descriptive imageAlt", () => {
    it("every game has a non-empty imageAlt value", () => {
      games.forEach((game) => {
        expect(
          game.imageAlt,
          `${game.id} is missing imageAlt`
        ).toBeDefined();
        expect(
          game.imageAlt,
          `${game.id}.imageAlt must not be empty`
        ).not.toBe("");
      });
    });

    it("every imageAlt is between 20 and 80 characters", () => {
      games.forEach((game) => {
        const len = (game.imageAlt ?? "").length;
        expect(
          len,
          `${game.id}.imageAlt is too short (${len} chars) — must be ≥ 20`
        ).toBeGreaterThanOrEqual(20);
        expect(
          len,
          `${game.id}.imageAlt is too long (${len} chars) — must be ≤ 80`
        ).toBeLessThanOrEqual(80);
      });
    });

    it("imageAlt is not just the game name (must describe the scene)", () => {
      games.forEach((game) => {
        const alt = (game.imageAlt ?? "").toLowerCase();
        const name = game.name.toLowerCase();
        expect(
          alt,
          `${game.id}.imageAlt must not be identical to the game name`
        ).not.toBe(name);
      });
    });
  });

  describe("GameCard — uses game.imageAlt for img alt", () => {
    it("renders the image with imageAlt as the alt attribute", () => {
      render(
        <CartProvider>
          <GameCard game={mockGameWithAlt} />
        </CartProvider>
      );
      // The alt attribute should match imageAlt, NOT the game name
      const img = screen.getByAltText(mockGameWithAlt.imageAlt);
      expect(img).toBeInTheDocument();
    });

    it("does NOT use the game name as the image alt text", () => {
      render(
        <CartProvider>
          <GameCard game={mockGameWithAlt} />
        </CartProvider>
      );
      // There should be no img element with just the game name as alt
      const imgByName = screen.queryByRole("img", { name: mockGameWithAlt.name });
      expect(imgByName).toBeNull();
    });
  });

  describe("GameModal — uses game.imageAlt for image alt", () => {
    it("renders the modal image with imageAlt as the alt attribute", () => {
      render(
        <GameModal
          game={mockGameWithAlt}
          onClose={() => {}}
          onRentNow={() => {}}
        />
      );
      const img = screen.getByAltText(mockGameWithAlt.imageAlt);
      expect(img).toBeInTheDocument();
    });

    it("does NOT use the game name as the modal image alt text", () => {
      render(
        <GameModal
          game={mockGameWithAlt}
          onClose={() => {}}
          onRentNow={() => {}}
        />
      );
      // The game name appears as the heading — img alt should be imageAlt, not name
      const imgByName = screen.queryByRole("img", { name: mockGameWithAlt.name });
      expect(imgByName).toBeNull();
    });
  });
});
