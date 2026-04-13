import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GameCard from "./GameCard";
import { CartProvider } from "@/context/CartContext";
import type { Game } from "@/data/games";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockGame = {
  id: "test-img-game",
  name: "Image Test Game",
  category: "Lawn Games",
  description: "A game for testing next/image.",
  pricePerDay: 30,
  image: "https://images.unsplash.com/photo-test-img",
  players: "2–4 players",
  dimensions: "3 ft wide",
  howToPlay: ["Step one."],
  images: ["https://images.unsplash.com/photo-test-img"],
} as unknown as Game;

describe("GameCard next/image migration", () => {
  it("renders an img element with an Unsplash src for the game image", () => {
    render(
      <CartProvider>
        <GameCard game={mockGame} />
      </CartProvider>
    );
    const img = screen.getByAltText("Image Test Game");
    expect(img.tagName).toBe("IMG");
    expect(img.getAttribute("src")).toContain("unsplash.com");
  });

  it("renders with priority prop (for above-the-fold images)", () => {
    // priority prop must exist on GameCard Props — TypeScript will error if missing
    render(
      <CartProvider>
        {/* @ts-expect-error priority not yet in Props — this test is the RED indicator */}
        <GameCard game={mockGame} priority={true} />
      </CartProvider>
    );
    const img = screen.getByAltText("Image Test Game");
    expect(img).toBeInTheDocument();
  });

  it("renders image with correct alt text from game.imageAlt when available", () => {
    const gameWithAlt = {
      ...mockGame,
      imageAlt: "Bocce balls rolling on green grass",
    } as unknown as Game;
    render(
      <CartProvider>
        <GameCard game={gameWithAlt} />
      </CartProvider>
    );
    // After migration, GameCard uses imageAlt for alt when present
    const img = screen.getByAltText("Bocce balls rolling on green grass");
    expect(img).toBeInTheDocument();
  });
});
