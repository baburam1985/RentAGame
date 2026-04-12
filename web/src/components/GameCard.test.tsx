import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameCard from "./GameCard";
import type { Game } from "@/data/games";

const mockGame: Game = {
  id: "test-game",
  name: "Test Game",
  category: "Lawn Games",
  description: "A fun test game.",
  pricePerDay: 42,
  image: "https://images.unsplash.com/photo-test",
  players: "2–6 players",
  dimensions: "5 ft wide",
};

describe("GameCard", () => {
  it("renders game name", () => {
    render(<GameCard game={mockGame} onSelect={() => {}} />);
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  it("renders category badge", () => {
    render(<GameCard game={mockGame} onSelect={() => {}} />);
    expect(screen.getByText("Lawn Games")).toBeInTheDocument();
  });

  it("renders price per day", () => {
    render(<GameCard game={mockGame} onSelect={() => {}} />);
    expect(screen.getByText("$42")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<GameCard game={mockGame} onSelect={() => {}} />);
    const img = screen.getByAltText("Test Game");
    expect(img).toBeInTheDocument();
  });

  it("clicking Rent Now calls onSelect with correct game", async () => {
    const onSelect = vi.fn();
    render(<GameCard game={mockGame} onSelect={onSelect} />);
    await userEvent.click(screen.getByText("Rent Now"));
    expect(onSelect).toHaveBeenCalledWith(mockGame);
  });
});
