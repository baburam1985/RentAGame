import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GameModal from "./GameModal";
import type { Game } from "@/data/games";

const mockGame: Game = {
  id: "jenga",
  name: "Giant Jenga",
  category: "Lawn Games",
  description: "Classic tower game.",
  pricePerDay: 45,
  image: "https://images.unsplash.com/photo-test",
  images: ["https://images.unsplash.com/photo-test"],
  players: "2–10 players",
  dimensions: "4 ft tall",
  howToPlay: ["Stack blocks.", "Remove one block at a time."],
};

describe("GameModal — ARIA dialog attributes", () => {
  it("AC-1: modal container has role='dialog' and aria-modal='true'", () => {
    render(<GameModal game={mockGame} onClose={vi.fn()} onRentNow={vi.fn()} />);
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("AC-2: modal container has aria-labelledby pointing to the heading id", () => {
    render(<GameModal game={mockGame} onClose={vi.fn()} onRentNow={vi.fn()} />);
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute("aria-labelledby", "game-modal-title");
  });

  it("AC-3: game name heading has id='game-modal-title'", () => {
    render(<GameModal game={mockGame} onClose={vi.fn()} onRentNow={vi.fn()} />);
    const heading = document.getElementById("game-modal-title");
    expect(heading).not.toBeNull();
    expect(heading).toHaveTextContent("Giant Jenga");
  });

  it("AC-4: close button has a descriptive aria-label", () => {
    render(<GameModal game={mockGame} onClose={vi.fn()} onRentNow={vi.fn()} />);
    const closeBtn = screen.getByLabelText("Close");
    expect(closeBtn).toBeInTheDocument();
  });

  it("AC-5+6: renders correctly with all ARIA attributes, no layout change", () => {
    render(<GameModal game={mockGame} onClose={vi.fn()} onRentNow={vi.fn()} />);
    // Game name still visible
    expect(screen.getByText("Giant Jenga")).toBeInTheDocument();
    // Rent button still present
    expect(screen.getByText("Rent This Game")).toBeInTheDocument();
    // dialog has aria-labelledby
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute("aria-labelledby");
    // heading id matches aria-labelledby value
    const labelledById = dialog!.getAttribute("aria-labelledby");
    const heading = document.getElementById(labelledById!);
    expect(heading).not.toBeNull();
  });
});
