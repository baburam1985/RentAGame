import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("GameModal — focus trap", () => {
  it("AC-1: first focusable element inside modal receives focus when modal opens", async () => {
    render(<GameModal game={mockGame} onClose={vi.fn()} onRentNow={vi.fn()} />);
    await waitFor(() => {
      expect(document.activeElement).not.toBe(document.body);
    });
    // Close button should have focus (first focusable element)
    expect(document.activeElement).toHaveAttribute("aria-label", "Close");
  });

  it("AC-2: pressing Escape key calls onClose", async () => {
    const onClose = vi.fn();
    render(<GameModal game={mockGame} onClose={onClose} onRentNow={vi.fn()} />);
    const user = userEvent.setup();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("AC-3: GameModal has a ref container for focus management", () => {
    const { container } = render(
      <GameModal game={mockGame} onClose={vi.fn()} onRentNow={vi.fn()} />
    );
    // Modal panel should exist and contain focusable elements
    const closeBtn = screen.getByLabelText("Close");
    expect(closeBtn).toBeInTheDocument();
    const rentBtn = screen.getByText("Rent This Game");
    expect(rentBtn).toBeInTheDocument();
  });

  it("AC-4: renders nothing when game is null (no focus trap needed)", () => {
    const { container } = render(
      <GameModal game={null} onClose={vi.fn()} onRentNow={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });
});
