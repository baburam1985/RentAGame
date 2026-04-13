/**
 * US-032 — Setup space callout in game modal
 *
 * Tests that:
 * - GameModal renders a 'Setup space needed' callout with the game's dimensions
 * - Callout includes an icon
 * - No new fields added to games.ts (uses existing dimensions field)
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameModal from "./GameModal";
import type { Game } from "@/data/games";
import { games } from "@/data/games";

const mockGame: Game = {
  id: "test-game",
  name: "Test Game",
  category: "Lawn Games",
  description: "A fun test game.",
  pricePerDay: 40,
  image: "https://images.unsplash.com/photo-test",
  images: ["https://images.unsplash.com/photo-test"],
  players: "2–6 players",
  dimensions: "5 ft × 5 ft playing area",
  howToPlay: ["Step one.", "Step two."],
};

describe("US-032 — Setup space callout in GameModal", () => {
  it("AC-1: GameModal renders a setup space callout element", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    const callout = screen.getByTestId("setup-space-callout");
    expect(callout).toBeInTheDocument();
  });

  it("AC-2: setup space callout displays the game's dimensions value", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    const callout = screen.getByTestId("setup-space-callout");
    expect(callout.textContent).toContain(mockGame.dimensions);
  });

  it("AC-3: setup space callout contains a heading or label mentioning 'Setup space'", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    expect(screen.getByText(/setup space/i)).toBeInTheDocument();
  });

  it("AC-4: setup space callout includes an icon element", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    const callout = screen.getByTestId("setup-space-callout");
    const icon = callout.querySelector("span.material-symbols-outlined");
    expect(icon).not.toBeNull();
  });

  it("AC-5: GameModal still renders correctly when game is null", () => {
    const { container } = render(
      <GameModal game={null} onClose={() => {}} onRentNow={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("AC-6: games.ts Game type does NOT gain any new field (dimensions already exists)", () => {
    // Ensure we are using the existing 'dimensions' field, not a new one
    games.forEach((g) => {
      expect(typeof g.dimensions).toBe("string");
      expect(g.dimensions.length).toBeGreaterThan(0);
    });
    // No new field 'setupSpace' or 'space' should exist
    const anyGame = games[0] as Record<string, unknown>;
    expect(anyGame["setupSpace"]).toBeUndefined();
    expect(anyGame["space"]).toBeUndefined();
  });
});
