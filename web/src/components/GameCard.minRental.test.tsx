import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GameCard from "./GameCard";
import { CartProvider } from "@/context/CartContext";
import type { Game } from "@/data/games";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Game with minRentalDays field — AC-3 requires this field on the Game type
const gameWithMinRental = {
  id: "test-min-rental",
  name: "Bocce Ball Set",
  category: "Team Games",
  description: "Fun bocce game.",
  pricePerDay: 30,
  image: "https://example.com/bocce.jpg",
  players: "2–8 players",
  dimensions: "107mm balls",
  howToPlay: ["Toss the pallino"],
  images: ["https://example.com/bocce.jpg"],
  minRentalDays: 1,
} as unknown as Game;

describe("GameCard minimum rental period label", () => {
  it("AC-6: GameCard with minRentalDays:1 displays Min. 1 day label", () => {
    render(
      <CartProvider>
        <GameCard game={gameWithMinRental} />
      </CartProvider>
    );
    expect(screen.getByText("Min. 1 day")).toBeInTheDocument();
  });
});
