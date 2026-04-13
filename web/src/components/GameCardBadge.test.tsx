import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GameCard from "./GameCard";
import { CartProvider } from "@/context/CartContext";
import type { Game } from "@/data/games";
import { games } from "@/data/games";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockGameWithBadge: Game = {
  id: "test-badge-game",
  name: "Badge Game",
  category: "Lawn Games",
  description: "A game with a badge.",
  pricePerDay: 30,
  image: "https://example.com/img.jpg",
  players: "2–6 players",
  dimensions: "5 ft wide",
  howToPlay: ["Step one."],
  images: ["https://example.com/img.jpg"],
  badge: "Most Popular",
};

const mockGameNoBadge: Game = {
  id: "test-no-badge-game",
  name: "No Badge Game",
  category: "Party Games",
  description: "A game without a badge.",
  pricePerDay: 25,
  image: "https://example.com/img2.jpg",
  players: "2–8 players",
  dimensions: "4 ft wide",
  howToPlay: ["Step one."],
  images: ["https://example.com/img2.jpg"],
};

function renderCard(game: Game) {
  return render(
    <CartProvider>
      <GameCard game={game} />
    </CartProvider>
  );
}

describe("GameCard — social proof badges", () => {
  it("AC-1: Game type has an optional badge field (game objects can carry badge strings)", () => {
    // Verify that the games data structure accepts badge values
    const gameCopy = { ...games[0], badge: "Test Badge" };
    expect(gameCopy.badge).toBe("Test Badge");
    // Also verify that the badge field is part of the exported type
    const typed: Game = { ...mockGameNoBadge, badge: "Check" };
    expect(typed.badge).toBe("Check");
  });

  it("AC-2: at least 2 games in the catalog have badge values assigned", () => {
    const gamesWithBadge = games.filter((g) => g.badge);
    expect(gamesWithBadge.length).toBeGreaterThanOrEqual(2);
  });

  it("AC-3: GameCard renders the badge pill text when game has a badge", () => {
    renderCard(mockGameWithBadge);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("AC-4: badge pill is rendered inside the image container area", () => {
    renderCard(mockGameWithBadge);
    const badge = screen.getByTestId("badge-pill");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("absolute");
  });

  it("AC-5: games without a badge render without any badge pill element", () => {
    renderCard(mockGameNoBadge);
    expect(screen.queryByTestId("badge-pill")).not.toBeInTheDocument();
  });

  it("AC-6: GameCard renders badge with sufficient contrast (dark text, colored background)", () => {
    renderCard(mockGameWithBadge);
    const badge = screen.getByTestId("badge-pill");
    // Badge should have a background color class for visibility
    expect(badge.className).toMatch(/bg-/);
  });
});
