import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameModal from "./GameModal";
import type { Game } from "@/data/games";

const mockGame: Game = {
  id: "bocce",
  name: "Bocce Ball Set",
  category: "Team Games",
  description: "Classic bocce ball fun.",
  pricePerDay: 30,
  image: "https://images.unsplash.com/photo-bocce",
  players: "2–8 players",
  dimensions: "107 mm balls",
};

describe("GameModal", () => {
  it("renders nothing when game is null", () => {
    const { container } = render(
      <GameModal game={null} onClose={() => {}} onRentNow={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders game name when game is provided", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    expect(screen.getByText("Bocce Ball Set")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    expect(screen.getByText("Classic bocce ball fun.")).toBeInTheDocument();
  });

  it("renders players and dimensions", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    expect(screen.getByText("2–8 players")).toBeInTheDocument();
    expect(screen.getByText("107 mm balls")).toBeInTheDocument();
  });

  it("renders price", () => {
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={() => {}} />);
    expect(screen.getByText("$30")).toBeInTheDocument();
  });

  it("clicking X button calls onClose", async () => {
    const onClose = vi.fn();
    render(<GameModal game={mockGame} onClose={onClose} onRentNow={() => {}} />);
    await userEvent.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("clicking backdrop calls onClose", async () => {
    const onClose = vi.fn();
    render(<GameModal game={mockGame} onClose={onClose} onRentNow={() => {}} />);
    // The backdrop is the first child of the dialog div (absolute inset-0)
    const backdrop = document.querySelector(".absolute.inset-0.bg-black\\/60");
    if (backdrop) await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("clicking Rent This Game calls onRentNow with the game", async () => {
    const onRentNow = vi.fn();
    render(<GameModal game={mockGame} onClose={() => {}} onRentNow={onRentNow} />);
    await userEvent.click(screen.getByText("Rent This Game"));
    expect(onRentNow).toHaveBeenCalledWith(mockGame);
  });
});
